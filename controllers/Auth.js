const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");


// send OTP..................................................................................
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

//signup................................................................................


