import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please Enter Your First Name"],
        maxLength:[30,"Name cannot exceed 30 Characters"],
        minLength:[4,"Name should be more then 4 characters"]
    },
    
    lastname:{
        type:String,
        required:[true,"Please Enter Your First Name"],
        maxLength:[30,"Name cannot exceed 30 Characters"],
        minLength:[4,"Name should be more then 4 characters"]
    },

    dateofbirth:{
        type:Date,
    },

    gender:{
        type:String,
    },
    
    permanentaddress: {
        type:String,
    },

    tempaddress:{
        type:String,
    },

    phno:{
        type:Number,
    },

    fathersname:{
        type:String,
    },

    mothersname:{
        type:String,
    },

    grandfathersname:{
        type:String,
    },

    bloodgroup:{
        type:String,
    },

    wifename:{
        type:String,
    },

    ctznissueaddress:{
        type:String,
    },

    ctznissuedate:{
        type:Date,
    },
    ctznno:{
        type:String,
    },
    landlordname:{
        type:String,
    },
    landlordno:{
        type:Number,
    },
    studylevel:{
        type:String,
    },
    workexperience:{
        type:String,
    },

    disease:{
        type:String,
    },

    admissiondate:{
        type:Date,
    },

    image:{
        type:String
    },

    createdAt:{
        type:Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    }, 
    { 

    timestamps: true 
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}



const Userdet = mongoose.model('User',userSchema);
export default Userdet;