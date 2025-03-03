const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();



// send OTP......................................................................................................................................
exports.sendOTP = async (req , res ) =>{
  
  try {
        
   // fetch email from body 
    const {email} = req.body ;

    //check if the user already exist 
    const checkUserPresent = await User.findOne({email});

    //if user is already exist , then return responce 
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User is already registered",
        })
    }

    // generate OTP
    var otp = otpGenerator.generate(6 ,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("OTP generated : ",otp);

    //check unique otp or not
    const result = await OTP.findOne({otp:otp});

    while(result){
        otp = otpGenerator(6,{  
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        result = await OTP.findOne({otp:otp});
    }

   //crearte and entry for OTP in DB
   const otpPayload = {email,otp};

   const otpBody = await OTP.create(otpPayload);
   console.log(otpBody);

   res.status(200).json({
    success:true,
    message:"OTP Sent Successfully",
    otp,
   })


  } catch (error) {

    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })

  }
};

//signup.............................................................................................................................................

exports.signUp = async (req,res) => {
    
   try {
     // data fetch from request ki body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
    } = req.body ;

    //validate karo
    if(!firstName || !lastName ||!email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
    }

    //pass and confirm pass ko match karo
    if(password != confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and ConfirmPassword value does not match , please try again",
        })
    }

    //check user already exist or not 
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registered",
        })
    }

    //find most recent OTP stored for the user
    const recentOtp = await OTP.find({email}.sort({createdAt:-1}).limit(1));
    console.log(recentOtp);

    //validate OTP
    if(recentOtp.length == 0 ){
        return res.status(400).json({
            success:false,
            message:"OTP Not found",
        })
    }else if(otp != recentOtp){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP",
        })
    }

    // HASH password
    const hashedPassword = await bcrypt.hash(password ,10);

    //entry create in DB
    const prfileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
     });

     const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:Profile._id,
        image:`https://api.dicebear.com/5.x/initials//svg?seed=${firstName} ${lastName}`,
     }) 
     
     //return res
     return res.status(200).json({
        success:true,
        message:"User is registered Successfully",
        user,
     });


   } catch (error) {
    
      console.log(error);

      return res.status(500).json({
        success:false,
        message:"User cannot be registered , please try again "
      })
    
   }

}


// login .........................................................................................................................................................

exports.login = async (req,res) =>{

    try {
        //get data from req body
        const {email,password} = req.body;
        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required , please try again",
    
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered , please signup first",
            });
        }
        //generate JWT , after password matching
    
        if(await bcrypt.compare(password ,user.password)){
            const payload = {
                email : user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET ,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined ;
    
            //create cookies and send responce
            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Succesfully",
            })
        }else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            });
        }
    
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure , please try again",
        });
    
    }
}

// changePassword................................................................................................................................................


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // Your email
        pass: process.env.MAIL_PASS  // App password
    }
});

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Validate input
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        // Get user from DB
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash new password and update DB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        // Send email notification using Nodemailer
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Password Changed Successfully",
            text: `Hello ${user.name},\n\nYour password has been updated successfully.\n\nIf this wasn't you, please contact support immediately.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password changed successfully. Email sent." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};