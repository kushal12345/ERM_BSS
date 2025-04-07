import newAdmissionModel from "../models/NewAdmissionmodel.js";

export const Fetchallstaff = async (req,res,next) => {
    try {
        const data = await newAdmissionModel.find();

        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Staffs");
    }
}