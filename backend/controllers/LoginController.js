import Catchasyncerror from "../middleware/Catchasyncerror.js";
import logErrortoFile from "../Logger/logger.js";
import signinSchema_data from "../models/signin_data.js";
import sendToken from "../Utils/JWTToken.js";

export const Login = Catchasyncerror(async (req,res,next) => {
    try {
        const {uname,password,remember} = req.body;

        if(!uname || !password) {
            return res.status(400).json({success:false, message:"Empty Username and Password"});
        }

        const user = await signinSchema_data.findOne({uname}).select("+password");

        if(!user) {
            return res.status(400).json({success:false, message:"Invalid Username"});
        }

        const isMatched = await user.comparePassword(password);
        
        if(!isMatched) {
            console.log(isMatched);
            return res.status(400).json({success:false, message:"Invalid Password"});
        }

        sendToken(user,200,res);
        
    } catch (error) {
        logErrortoFile(error);
    }
})