const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    username:{type: String,require: true,},
    email:{type: String, require: true},
    message:{type: String,require: true}
});


const UserContact = new mongoose.model("UserContact", contactSchema);
module.exports = UserContact; 

