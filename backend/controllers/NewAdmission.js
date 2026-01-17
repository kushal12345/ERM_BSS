import newAdmissionModel from "../models/NewAdmissionmodel.js";

export const NewAdmission = async (req, res) => {
  try {
    const files = req.files;

    const admissionData = {
      ...req.body,
      image: files?.image?.[0]?.filename || null,
      docfile: files?.docfile?.[0]?.filename || null,
      famdocfile: files?.famdocfile?.[0]?.filename || null,
      mothdocfile: files?.mothdocfile?.[0]?.filename || null,
      fathdocfile: files?.fathdocfile?.[0]?.filename || null,
      grandfathdocfile: files?.grandfathdocfile?.[0]?.filename || null,
    };

    const newAdmission = new newAdmissionModel(admissionData);
    await newAdmission.save();

    return res.status(201).json({ message: "Admission created", newAdmission });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
