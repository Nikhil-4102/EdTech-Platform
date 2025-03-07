const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../utils/templates/courseEnrollmentEmail");


exports.createOrder = async (req,res) =>{
    const {course_id} = req.body;
    const userId = req.user.id;

    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"Please provide course id",
        });
    };

    let course;
    try {
        course = await Course.findById(course_id);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found",
            });
        }

        const uid = new mongoose.Types.ObjectId(userid);
        if(course.students.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"You are already enrolled in this course",
            });
        }
    } catch (error) {
        
    }

}
