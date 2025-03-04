const Course =require("../models/Course");
const Tag =require("../models/Tag");
const User =require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course handler fun.
exports.createCourse = async (req,res) =>{
    try {
        
        //fetch data
        const {courceName , courseDescription , whitYouWillLearn , price , tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnaikImage;
        //validation
        if(!courceName || !courseDescription || !whitYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
       
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findOne(userId);
        console.log("Instructor Details",instructorDetails);

        // todo ; verify that userid and instructor details id are same or not 

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        //check given tag is valid or not
        const tagDetails = await await Tag.findOne(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            });
        }

        // Upload image to cloudinary
        const thumbnaikImage = await uploadImageToCloudinary(thumbnail , process.env.Folder_NAME);

        //create an entry for new Cousce
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnaikImage.secure_url,
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse_id,
                }
            },
            {new:true},
        )

        //update the tag ka schema


        //return responce
        return res.status(200).json({
            success:true,
            message:"Course Created Succesfully",
            data:newCourse,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"Failed to create course",
            error:error.message,
        })

    }
}

//get all course  handler fun.


exports.showAllCourses = async (req,res) =>{
    try {
        
         const allCourses = await Course.find({},{courseName:true,
                                                  price:true,
                                                  thumbnail:true,
                                                  instructor:true,
                                                  ratingAndReviews:true,
                                                  studentsEnrolled:true, })
                                                  .populate("instructor")
                                                  .exec();
       
       return res.status(200).json({
        success:true,
        message:"Data for all courses fetched successfully",
        data:allCourses,
       })                                              



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message,
        })
    }
}
