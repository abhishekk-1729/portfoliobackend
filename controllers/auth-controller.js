const User = require("../models/user-models");
const bcrypt = require("bcryptjs")

const home = async (req,res) => {
    try{
        res.status(200).send("Welcome to Abhishek's website using router");
    } catch(error){
        console.log(error);
    }
};

const registration = async (req,res) => {
    try{
        const {username,email,phone,password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"email already exists"});
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({username,email,phone,password});
        console.log(req.body);
        res.status(201).json({
            "message":"Registration Successful",
            token:await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });
    } catch(error){
        console.log(error);
    }
};

const login = async(req,res)=>{
    try {

        const {email,password} = req.body;

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({"msg":"Invalid credentials"});
        }

        const user = await bcrypt.compare(password,userExist.password);

        if(user){
            res.status(200).json({
                "message":"Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        }

        else{
            return res.status(401).json({"msg":"invalid email or password"});
        }
        
        
    } catch (error) {
        res.status(500).json("Internal server error");
    }

};


const user = (req,res) => {
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`The error is ${error}`);
        // template literal
    }
}

module.exports = {home, registration, login,user};