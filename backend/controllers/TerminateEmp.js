import Terminate from '../models/TerminateModel.js';
import newAdmissionModel from '../models/NewAdmissionmodel.js';
import HireModel from '../models/Hiremodel.js';

export const TerminateEmp = async (req, res) => {
    const { data } = req.params;
    console.log(`Received request to terminate employee with ID: ${data}`);1
    try {
        // Find the employee
        const response = await newAdmissionModel.findById(data);
        if (!response) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        console.log(`Terminating employee with ID: ${data}`);

        // Create terminate record
        const terminateData = new Terminate({
            empID: response._id,
            Fname: response.Fname,
            Mname: response.Mname,
            Lname: response.Lname,
            email: response.email,
            phno: response.phno,
            bg: response.bg,
            dob: response.dob,
            gender: response.gender,
            TempState: response.TempState,
            TempDist: response.TempDist,
            TempMun: response.TempMun,
            TempAddress: response.TempAddress,
            TempTol: response.TempTol,
            PerState: response.PerState,
            PerDist: response.PerDist,
            PerMun: response.PerMun,
            PerAddress: response.PerAddress,
            PerTol: response.PerTol,
            doctype: response.doctype,
            docno: response.docno,
            IssueDistrict: response.IssueDistrict,
            IssueDate: response.IssueDate,
            docfile: response.docfile,
            marrital: response.marrital,
            Huswifname: response.Huswifname,
            famphno: response.famphno,
            famdocfile: response.famdocfile,
            mothname: response.mothname,
            mothphno: response.mothphno,
            mothdocfile: response.mothdocfile,
            fathname: response.fathname,
            fathphno: response.fathphno,
            fathdocfile: response.fathdocfile,
            grandfathname: response.grandfathname,
            grandfathno: response.grandfathno,
            grandfathdocfile: response.grandfathdocfile,
            edu: response.edu,
            termsaggree: response.termsaggree,
            createdAt: new Date()
        });

        await terminateData.save();
        await newAdmissionModel.findByIdAndDelete(data);
        await HireModel.findOneAndDelete({ empID: data });
        console.log(`Employee with ID: ${data} terminated and deleted.`);
        return res.status(200).json({ success: true, message: 'Employee terminated and removed from NewAdmission' });
    } catch (error) {
        console.error('Error terminating employee:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
