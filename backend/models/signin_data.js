import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signinSchema = mongoose.Schema({
    uname:{
        type:String,
        required:true,
    },
    authority:{
        type:String,
        required:true,
        default:"user"
    },
    password:{
        type:String,
        required:true,
        maxLength:[8,"Password cannot exceed 30 Characters"],
        minLength:[4,"Password should be more then 4 characters"]
    }
});

signinSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

signinSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

signinSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}



const signinSchema_data = mongoose.model("signin_data",signinSchema);
export default signinSchema_data;