const  services = require("../models/service-schema");

const service = async (req,res) => {
    try{
        const data = await services.find();
        res.status(201).json({data});
    } catch(error){
        console.log(error);
    }
};



module.exports = service;