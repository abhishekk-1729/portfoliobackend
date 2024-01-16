const  UserContact = require("../models/contact-schema");

const contact = async (req,res) => {
    try{
        const response = req.body;
        await UserContact.create(response);
        console.log(req.body);
        res.status(201).json({
            "message":"Contact form Successful",
        });
    } catch(error){
        console.log(error);
    }
};



module.exports = contact;