const User = require("../models/user-models");
const UserContact = require("../models/contact-schema");
const  services = require("../models/service-schema");

const getAllUsers = async(req,res) => {
    
    try {

        const users = await User.find({},{password:0});
        if(!users){
            res.status(404).json({"message":"no user found"});
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async(req,res) => {
    try {

        const contacts = await UserContact.find();
        if(!contacts){
            res.status(404).json({"message":"no user found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({"message":"User deleted successfully"})

    } catch (error) {
        console.log(error);
    }
}

const getUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id},{password:0});
        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
    }
}

const deleteContact = async(req,res) => {
    try {
        const id = req.params.id;
        await UserContact.deleteOne({_id:id});
        return res.status(200).json({"message":"User deleted successfully"})

    } catch (error) {
        console.log(error);
    }
}

const getContactById = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await UserContact.findOne({_id:id});
        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
    }
}

const addService = async(req,res) => {
    try {
        const {service,description,price,provider} = req.body;

        await services.create({service,description,price,provider});
        console.log(req.body);
        res.status(201).json({
            "message":"Registration Successful",
        });
        
    } catch (error) {
        console.log(error);
    }
}

const updateContact = async(req,res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedContact = await UserContact.updateOne({_id:id},{$set:data});
        console.log(updatedContact);
        return res.status(200).json(updatedContact)

    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(req,res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedUser = await User.updateOne({_id:id},{$set:data});
        console.log(updatedUser);
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllUsers, getAllContacts,deleteUser, getUserById, deleteContact,getContactById,addService,updateContact,updateUser};