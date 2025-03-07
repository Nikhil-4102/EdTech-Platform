
const Profile = require("../models/Profile");
const User  = require("../models/User");

exports.updateProfile = async (req , res) =>{
    try {
        //get data
        const {dateOfBirth="",about="",contactNumber , gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update
        profileDetails.dateOfBirth =dateOfBirth,
        profileDetails.about = about,
        profileDetails.gender = gender,
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        //return responce
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        });


    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }


};


//delete account

exports.deleteAccount = async (req,res) =>{
    try {
        
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        await User.findByIdAndDelete({_id:id});

        return  res.status(200).json({
            success:true,
            message:"User deleted Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.getAllUserDetails = async (req,res) =>{
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"User Data fetched successfully",

        })

    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message,
         })
    }
}


