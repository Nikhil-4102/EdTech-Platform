 
 const Section  = require("../models/Section");
 const Course = require("../models/Course");

 exports.createSection = async (req,res) => {
       try {
        //data fetch
         const {sectionName , courseID} = req.body;
        //create validation
        if(!sectionName || !courseID) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectID
        const updateCourseDetails = await Course.findByIdAndUpdate(
                                          courseID,
                                          {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                          },
                                          {new:true},
                                          )
        // return responce
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            updateCourseDetails,
        })
       } catch (error) {
          return res.status(500).json({
            success:false,
            message:"Unable to create section , plz try again",
            error:error.message,
          });
       }
 }

 exports.updateSection = async (req,res) =>{
    try {

        // data input
        const {sectionName,sectionId} = req.body;

        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        //data update
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //return responce
        return res.status(200).json({
            success:true,
            message:"Section Updated successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update section , plz try again",
            error:error.message,
          });

    }
 }

 exports.deleteSection = async (req, res) => {
    try {
        //get id
        const {sectionId} = req.body;
        //find by id and delete
        await Section.findByIdAndUpdate(sectionId);
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete section , plz try again",
            error:error.message,
          });
    }
 }
  