import newAdmissionModel from "../models/NewAdmissionmodel.js";
import clientlistModel from "../models/Clientlistmodel.js";
import HireModel from "../models/Hiremodel.js";
import visitorsModel from "../models/VisitorsModel.js";

export const Fetchallstaff = async (req,res,next) => {
    const body = req.params.data;
    let data;
    try {
        if( body === "all" || body === "All" || body === "ALL"){
            // Fetch all staff
            data = await newAdmissionModel.find();

        }else{
            // Fetch specific staff
            data = await newAdmissionModel.find({ _id: body });
        }

        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Staffs");
    }
}

export const FetchSearchedstaff = async (req,res,next) => {
    const body = req.params.data;
    let data;
    try {
            // Fetch specific staff
            data = await newAdmissionModel.find({ Fname: body });

        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Staffs");
    }
}

export const FetchallClient = async (req,res,next) => {
    try {
        const data = await clientlistModel.find();

        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Clients");
    }
}

export const FetchallHired = async (req,res,next) => {
    try {
        const data = await HireModel.find().populate("empID", "Fname Mname Lname phno");
        console.log(data);
        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Hired Staffs");
    }
}

export const Fetchallvisitors = async (req,res,next) => {
    try {
        const data = await visitorsModel.find();
        if(!data){
            return res.status(400).json({ success: false, message: "No Data Found" });
        }

        return res.status(200).json({ success: true, result: data });

    } catch (error) {
        console.log("error Fetching Visitors");
    }
}

export const updateVisitor = async (req, res) => {
  try {

    const updateData = {
        ...req.body,
        ...(req.files?.Voucher && { Voucher: req.files.Voucher[0].path })
    };

    const updated = await visitorsModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json({
      message: "Visitor updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating visitor",
      error: error.message
    });
  }
};
