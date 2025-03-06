const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

exports.createSubSection = async (req,res) => {
    try {
        
        //fetch data from req body
        const {sectionId , title , timeDuration , description} = req.body ;
        //extract file/video
        const video = req.files.videoFile ;

        //validation
        if(!sectionId || !timeDuration || !title || !description ){
            return res.status(400).json({
                success:false,
                message:"ALL filed are required",
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section ObjectID
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                             {$push:{
                                                subSection:SubSectionDetails._id,
                                             }},
                                             {new:true});
        // return responce
        return res.status(200).json({
            success:true,
            message:"Sub Section created Succesfully",
            updatedSection,
        });


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Inrteranl Server Error",
            error:error.message,
        })
    }
}