const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/register")
.then(()=>{
console.log("Connection succesful");
}).catch((err)=>{
console.log(`No connection ${err}`)
})

const signupsch = new mongoose.Schema({
name:{
type:String,
required:true,
trim:true
},
confirmPassword:{
type:String,
required:true,
trim:true
},

password: {
type: String,
required: true,
trim: true
}
})
const Student = mongoose.model("Register", signupsch);
module.exports = Student;
