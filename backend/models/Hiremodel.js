import mongoose from "mongoose";

const HireSchema = new mongoose.Schema({
    empID:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'NewAdmission'
    }],
    jobtype:{
        type:String,
        required:true,
        default:"securityguard"
    },
    post:{
        type:String, 
        required:true,
        unique:true

    },
    shift:{
        type:String,
        required:true
    },
    hrs:{
        type:Number,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    starttime:{
        type:Date,
        required:true
    },
    startAMPM:{
        type:String,
        required:true
    },
    endtime:{
        type:Date,
        required:true
    },
    endAMPM:{
        type:String,
        required:true
    },
    Dress:{
        type:Number,
        required:true
    },
    JoinedDate:{
        type:Date,
        required:true
    }
});
const HireModel = mongoose.model("Hire", HireSchema);
export default HireModel;