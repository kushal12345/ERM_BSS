import express from 'express';
import { Login } from '../controllers/LoginController.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
import { ProtectRoute } from '../controllers/ProtectRoute.js';
import { NewAdmission } from '../controllers/NewAdmission.js';
import { createVisitor } from '../controllers/VisitorsController.js';
import upload from '../Utils/multer.js';
import { Fetchallstaff } from '../controllers/FetchCcontroller.js';
import { NewClient } from '../controllers/NewClient.js';
import { FetchallClient } from '../controllers/FetchCcontroller.js';
import { Hire } from '../controllers/Hire.js';
import { FetchallHired } from '../controllers/FetchCcontroller.js';
import { TerminateEmp } from '../controllers/TerminateEmp.js';
import { FetchTerminated } from '../controllers/FetchTerminated.js';
import { FetchSearchedstaff } from '../controllers/FetchCcontroller.js';
import { Fetchallvisitors,updateVisitor } from '../controllers/FetchCcontroller.js';

const router = express.Router();

router.route("/login").post(Login).get((req,res,next) => {res.send("Hello World")});
router.route("/register").post();
router.route("/newadmission").post( upload.fields([
    { name: "image", maxCount: 1 },
    { name: "docfile", maxCount: 1 },
    { name: "famdocfile", maxCount: 1 },
    { name: "mothdocfile", maxCount: 1 },
    { name: "fathdocfile", maxCount: 1 },
    { name: "grandfathdocfile", maxCount: 1 },
  ]), NewAdmission).get((req, res, next) => { res.send("New Admission") });

router.route("/visitor").post(upload.fields([
    { name: 'Fname' },
    { name: 'Refname' },
    { name: 'TempAddress' },
    { name: 'PermAddress' },
    { name: 'Category' },
    { name: 'PastExperience' },
    { name: 'EducationQualification' },
    { name: 'Height' },
    { name: 'Weight' },
    { name: 'TrainingFee' },
    { name: 'Voucher' },
    { name: 'PhysicalTest' },
    { name: 'Age' },
    { name: 'Phone' }  
]), createVisitor).get((req, res, next) => { res.send("Visitor") });

router.route("/visitor/:id").put(upload.fields([{name:'Voucher'}]), updateVisitor);
 

router.route("/hire").post(upload.fields([
    { name: "employeeId" },
    { name: "post" },
    { name: "shift" },
    { name: "hrs" },
    { name: "salary" },
    { name: "starttime" },
    { name: "startAMPM" },
    { name: "endtime" },
    { name: "endAMPM" },
    { name: "Dress" },
    { name: "JoinedDate" }
]),Hire).get((req, res, next) => { res.send("Hire Employee") });

router.route("/client/add").post(upload.fields([
    {name: "Oname"},
    {name: "Pno"},
    {name: "OAdd"},
    {name: "Cname"},
    {name: "Phno"},
    {name: "Ann"},
    {name: "Dashbon"},
    {name: "vat"},
    {name: "constdate"},
    {name: "conendate"},
    {name: "NSG"},
    {name: "NCleaner"},
    {name:"NBouncer"},
    {name: "NEP"},
    {name: "NES"},
    {name: "file_contract"}
]),NewClient).get((req,res,next) => {res.send("New Client")});

router.route(`/fetchallstaff/:data`).get(Fetchallstaff);
router.route(`/fetchallvisitors`).get(Fetchallvisitors);
router.route(`/FetchSearchedstaff/:data`).get(FetchSearchedstaff);
router.route(`/employees/:data`).post(TerminateEmp);

router.route(`/fetchallclient`).get(FetchallClient);
router.route("/fetchallterminated").get(FetchTerminated);
//router.route("/verifytoken").post(VerifyToken).get((req,res,next) => {res.send("Verify Token")});

router.route("/fetchallhired").get(FetchallHired);
router.route("/protected").post(VerifyToken,ProtectRoute).get((req,res)=>{
    res.send("Protected Route");
});

export default router;