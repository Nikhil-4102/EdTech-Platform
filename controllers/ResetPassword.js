
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// resetPasswordToken
exports.resetPasswordToken = async (req , res) =>{

   try {
        //get email from req body

        const email = req.body.email;
        //check user for this email , email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Your Email is not registered with us"
            });
        }
        // generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration date
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000,
            }, {new:true}
        ) ;
    
        //create url
            const url = `http://localhost:3000/update-password/${token}`;
    
        //send mail containing the url 
        await mailSender(email,
            "Password Reset link",
            `Password Reset link :${url}`
        );
        // return responce
    
        return res.json({
            success:true,
            message:"Email sent Succesfully , Please check email and change Password",
        });
   } catch (error) {
      
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset password mail "
       })

   }

}

//resetPassword

exports.resetPassword = async (req,res) => {
   try {
            //data fetch
    const {password , confirmPassword , token} = req.body;

    //validation
    if(password != confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching",
        });
    }

    //get userdetails from db using token
    const userDetails = await User.findOne({token:token});
    //if no entery - invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"token is invalid",
        })
    }

    //token time check
    if(userDetails.resetPasswordExpires < Date.now() ){
        return res.json({
            success:false,
            message:"token is expired , please regenerate your token "
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password ,10);

    //password update 
    await User.findByIdAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    );

    //return responce
    return res.status(200).json({
        success:true,
        message:"Password reset succesfully",
    });

   } catch (error) {
        
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"someting wents wrong , please try again",
       })
    }
}  