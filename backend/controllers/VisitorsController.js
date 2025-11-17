import visitorsModel from "../models/VisitorsModel.js";

export const createVisitor = async (req, res) => {
    try {
        const visitorData = {
            Fname: req.body.Fname,
            Refname: req.body.Refname,
            TempAddress: req.body.TempAddress,
            PermAddress: req.body.PermAddress,
            Category: req.body.Category,
            PastExperience: req.body.PastExperience,
            EducationQualification: req.body.EducationQualification,
            Height: req.body.Height,
            Weight: req.body.Weight,
            TrainingFee: req.body.TrainingFee,
            PhysicalTest: req.body.PhysicalTest,
            Voucher: req.files && req.files.Voucher ? req.files.Voucher[0].path : null,
            Age: req.body.Age,
            Phone: req.body.Phone
        };
        const newVisitor = new visitorsModel(visitorData);
        await newVisitor.save();

        res.status(201).json({ message: 'Visitor created successfully', data: newVisitor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating visitor', error: error.message });
    }
};