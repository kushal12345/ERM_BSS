import express from 'express';
import { Login } from '../controllers/LoginController.js';
import { VerifyToken } from '../middleware/VerifyToken.js';
import { ProtectRoute } from '../controllers/ProtectRoute.js';
import { NewAdmission } from '../controllers/NewAdmission.js';
import upload from '../Utils/multer.js';
import { Fetchallstaff } from '../controllers/FetchCcontroller.js';
import { NewClient } from '../controllers/NewClient.js';
const router = express.Router();

router.route("/login").post(Login).get((req,res,next) => {res.send("Hello World")});
router.route("/register").post();
router.route("/newadmission").post(upload.fields([
    { name: 'Fname' },
    { name: 'Mname' },
    { name: 'Lname' },
    { name: 'email' },
    { name: 'phno' },
    { name: 'bg' },
    { name: 'dob' },
    { name: 'gender' },
    { name: 'TempState' },
    { name: 'TempDist' },
    { name: 'TempMun' },
    { name: 'TempAddress' },
    { name: 'TempTol' },
    { name: 'PerState' },
    { name: 'PerDist' },
    { name: 'PerMun' },
    { name: 'PerAddress' },
    { name: 'PerTol' },
    { name: 'doctype' },
    { name: 'docno' },
    { name: 'IssueDistrict' },
    { name: 'IssueDate' },
    { name: 'docfile' },
    { name: 'marrital' },
    { name: 'Huswifname' },
    { name: 'famphno' },
    { name: 'famdocfile' },
    { name: 'mothdocfile' },
    { name: 'fathdocfile' },
    { name: 'grandfathdocfile' },
    { name: 'mothname' },
    { name: 'fathname' },
    { name: 'grandfathname' },
    { name: 'edu' },
    { name: 'termsaggree' }
]), NewAdmission).get((req, res, next) => { res.send("New Admission") });

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

router.route(`/fetchallstaff`).get(Fetchallstaff);


router.route("/protected").post(VerifyToken,ProtectRoute).get((req,res)=>{
    res.send("Protected Route");
});

export default router;