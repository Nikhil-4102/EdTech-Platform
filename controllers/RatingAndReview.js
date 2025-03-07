const ratingAndReviews = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");


//create a rating
exports.createRating = async (req,res) =>{
    try {
        
        //get user id
         const userId = req.body;
        //fetch data from req body
        const {courseId, rating, review} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                       { _id: courseId,
                        studentsEnrolled:{$elemMatch:{$eq:userId}}
                    });
                    
        if(!courseDetails) {
            return res.json({
                success:false,
                message:'You are not enrolled in this course',
            });
        }
        //check if user has already rated
        const alreadyReviewed = await ratingAndReviews.findOne({
            course: courseId,
            user: userId,
        });
        if(alreadyReviewed) {
            return res.json({
                success:false,
                message:'You have already rated this course',
            });
        }

        //create rating
        const ratingReview = await ratingAndReviews.create({
            course: courseId,
            user: userId,
            rating,
            review,
        });
        //update course rating
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
            $push: {ratingAndReviews: ratingReview._id},
            },{new:true});

            console.log(updatedCourseDetails);


        //return response
        return res.status(200).json({
            success:true,
            message:'Rating added successfully',
            ratingReview,
        });
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get avg rating

exports.getAverageRating = async (req,res) =>{
    try {
       
        //get course id 
        const courseId = req.body.courseId;
        //calculate avg
        const result = await ratingAndReviews.aggregate([
            {
                $match: {course:new mongoose.Types.ObjectId(courseId)},
            },
            {
                $group: {
                    _id: null,
                    avgRating: {$avg: "$rating"},
                }
            }
        ]);
        //return rating
        if(result.length>0) {
            return res.status(200).json({
                success:true,
                avgRating:result[0].avgRating,
            });
        }
        // if no rating exist
        if(result.length === 0) {
            return res.status(200).json({
                success:true,
                message:'No rating found',
                avgRating:0,
            });
        }

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get all ratingsAND reviews

exports.getAllRating = async (req,res) =>{
    try {
        
        const allReviews = await ratingAndReviews.find({})
                                          .sort({rating:"desc"})
                                          .populate({
                                            path:"user",
                                            select:"Name LastName email image",
                                          })
                                          .populate({path:"course", select:"courseName"})
                                          .exec();

         
            return res.status(200).json({
                success:true,
                data:allReviews,
            });                               

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}