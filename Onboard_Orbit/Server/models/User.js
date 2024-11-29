const {Schema, default: mongoose} = require("mongoose")


const userSchema = Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    phoneno: Number,
    username: { type: String, unique: true },
    password: String,
    profilePic: String,
    role: String

})
module.exports = mongoose.model('userdetails', userSchema)
