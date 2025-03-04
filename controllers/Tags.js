const Tag = require("../models/Tag");


//create tag ka handler function
exports.createTag = async (req,res) =>{
    try {
        
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        //return responce
        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//getAlltags handler function

exports.showAlltags = async (req,res) =>{
    try {
        const allTags = await Tag.find({},{name:true , description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned Successfully",
            allTags
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}