// Schema: defines the structure of the documents within a collection. It specifies the fields, their types and any additional constants and validations

const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});


//Model: Acts as a higher-level abstraction that interacts with the database based on the defined schema. It represents a collection and provides an interface for querying, creating, updating, and deleting documents in that collection.
// Models are  created from schemas and enable you to work with MongoDB data in a more structured manner in your application.

userSchema.pre("save",async function (next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = 10;
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

// tokesn should not be stored in the database. Store them on client site only i.e. cookies or local storage
// userScheme.methods ki help s kitne bhi methods ko create kr skte h
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d"
            }

        )
    } catch (error) {
        console.error(error);
    }
}


const User = new mongoose.model("User", userSchema);
module.exports = User

// / - JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// ?? - JWTs are often used for authentication and authorization in web applications.
// /? 1. **Authentication:** Verifying the identity of a user or client.
// //? 2. **Authorization:** Determining what actions a user or client is allowed to perform.
// // **Components of a JWT:**
// / - Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// / - Payload: Contains claims or statements about an entity (typically, the user) and additional data.
// Common claims include user ID, username, and expiration time.
// / - Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.