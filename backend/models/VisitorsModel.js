import mongoose from "mongoose";

const visitorsSchema = new mongoose.Schema({
    Fname: { type: String, required: true },
    Refname: { type: String},
    TempAddress: { type: String, required: true },
    PermAddress: { type: String, required: true },
    Category: { type: String, required: true },
    Gender: { type: String, required: true },
    PastExperience: { type: String},
    EducationQualification: { type: String },
    Height: { type: Number, required: false },
    Weight: { type: Number, required: false },
    Age: { type: Number, required: true },
    Phone: { type: Number, required: true },
    TrainingFee: { type: Number, required: false },
    PhysicalTest: { type: String, required: false },
    Voucher: { type: String, default: "" },
    VerificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const visitorsModel = mongoose.model("Visitors", visitorsSchema);
    
export default visitorsModel;