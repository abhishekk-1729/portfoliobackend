const {z} = require("zod");

// this is just a schema
const loginSchema = z.object({

    email:z
    .string({required_error:"E-mail is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least of 3 chars."})
    .max(255,{message:"Email must not be more than 255 chars"}),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be at least of 7 chars."})
    .max(1024,{message:"Password must not be more than 1024 chars"}),

})
const signupScheme = loginSchema.extend({
    username:z
    .string({required_error:"username is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 chars."})
    .max(255,{message:"Name must not be more than 255 chars"}),

    
    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be at least of 10 chars."})
    .max(20,{message:"Phone must not be more than 20 chars"}),

    

})

module.exports = {signupScheme,loginSchema};