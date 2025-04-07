import newAdmissionModel from "../models/NewAdmissionmodel.js";

export const NewAdmission = async (req, res) => {
    try {
        const admissionData = {
            Fname: req.body.Fname,
            Mname: req.body.Mname,
            Lname: req.body.Lname,
            email: req.body.email,
            phno: req.body.phno,
            bg: req.body.bg,
            dob: req.body.dob,
            gender: req.body.gender,
            TempState: req.body.TempState,
            TempDist: req.body.TempDist,
            TempMun: req.body.TempMun,
            TempAddress: req.body.TempAddress,
            TempTol: req.body.TempTol,
            PerState: req.body.PerState,
            PerDist: req.body.PerDist,
            PerMun: req.body.PerMun,
            PerAddress: req.body.PerAddress,
            PerTol: req.body.PerTol,
            doctype: req.body.doctype,
            docno: req.body.docno,
            IssueDistrict: req.body.IssueDistrict,
            IssueDate: req.body.IssueDate,
            marrital: req.body.marrital,
            Huswifname: req.body.Huswifname,
            famphno: req.body.famphno,
            mothname: req.body.mothname,
            fathname: req.body.fathname,
            grandfathname: req.body.grandfathname,
            edu: req.body.edu,
            termsaggree: req.body.termsaggree,
            // Handle file uploads
            image: req.files.image ? req.files.image[0].path : null,
            docfile: req.files.docfile ? req.files.docfile[0].path : null,
            famdocfile: req.files.famdocfile ? req.files.famdocfile[0].path : null,
            mothdocfile: req.files.mothdocfile ? req.files.mothdocfile[0].path : null,
            fathdocfile: req.files.fathdocfile ? req.files.fathdocfile[0].path : null,
            grandfathdocfile: req.files.grandfathdocfile ? req.files.grandfathdocfile[0].path : null,
        };

        const newAdmission = new newAdmissionModel(admissionData);
        await newAdmission.save();

        res.status(201).json({ message: 'New admission created successfully', data: newAdmission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating new admission', error: error.message });
    }
};