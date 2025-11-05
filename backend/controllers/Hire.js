import HireModel from "../models/Hiremodel.js";
import newAdmissionModel from "../models/NewAdmissionmodel.js";
import Terminate from "../models/TerminateModel.js";
import Userdet from "../models/Usermodel.js";
export const Hire = async (req, res) => {
    try {
        const hireData = {
            empID: req.body.employeeId,
            jobtype: req.body.jobtype,
            post: req.body.post,
            shift: req.body.shift,
            hrs: req.body.hrs,
            salary: req.body.salary,
            starttime: req.body.starttime,
            startAMPM: req.body.startAMPM,
            endtime: req.body.endtime,
            endAMPM: req.body.endAMPM,
            Dress: req.body.Dress,
            JoinedDate: req.body.JoinedDate
        };

        console.log("Hire Data:", hireData);
        // Check if the employee is already hired
        const existingHire = await HireModel.findOne({ empID: req.body.employeeId });
        if (existingHire) {
            return res.status(400).json({ message: 'Employee is already hired' });
        }
        
        const newHire = new HireModel(hireData);
        await newHire.save();
   
        const employee = await newAdmissionModel.findById(req.body.employeeId);

        if (employee) {
            console.log("Employee found:", employee);
            
            // Save to Userdet collection
            const { _id, ...userData } = employee.toObject(); // Remove _id if needed
            await Userdet.create(userData); // Mongoose method to insert

            // Delete from newAdmissionModel
            await newAdmissionModel.deleteOne({ _id: req.body.employeeId });
        } else {
            console.log("Employee not found");
        }


        res.status(201).json({ message: 'success', data: newHire });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error hiring employee', error: error.message });
    }
}