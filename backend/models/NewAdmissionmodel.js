import mongoose from "mongoose";
import validator from "validator";

const newAdmissionSchema = new mongoose.Schema({
    VisitorId: { type: mongoose.Schema.Types.ObjectId, ref: "Visitors", default: null },
    Fname: { type: String, required: true },
    Mname: { type: String, required: false },
    Lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phno: { type: String, required: true },
    bg: { type: String, required: false }, // Blood Group
    dob: { type: Date, required: true }, // Date of Birth
    gender: { type: String, required: true },
    TempState: { type: String, required: true },
    TempDist: { type: String, required: true },
    TempMun: { type: String, required: true },
    TempAddress: { type: String, required: true },
    TempTol: { type: String, required: true },
    PerState: { type: String, required: true },
    PerDist: { type: String, required: true },
    PerMun: { type: String, required: true },
    PerAddress: { type: String, required: true },
    PerTol: { type: String, required: true },
    doctype: { type: String, required: true },
    docno: { type: String, required: true },
    IssueDistrict: { type: String, required: true },
    IssueDate: { type: Date, required: true },
    docfile: { type: String, required: true }, // Assuming this is a file path or URL
    marrital: { type: String, required: true },
    Huswifname: { type: String, required: true },
    famphno: { type: String, required: true },
    famdocfile: { type: String, required: true },
    mothname: { type: String, required: true },
    mothphno: { type: String, required: false },
    mothdocfile: { type: String, required: false },
    fathname: { type: String, required: true },
    fathphno: { type: String, required: false },
    fathdocfile: { type: String, required: false },
    grandfathname: { type: String, required: true },
    grandfathno: { type: String, required: false },
    grandfathdocfile: { type: String, required: false },
    edu: { type: String, required: true },
    termsaggree: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});

const newAdmissionModel = mongoose.model("NewAdmission", newAdmissionSchema);

export default newAdmissionModel;
