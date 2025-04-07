import Userdet from "../models/Usermodel.js";
import signinSchema_data from "../models/signin_data.js";


export const ProtectRoute = async (req, res, next) => {
        const user = await Userdet.findById(req.user.id) || await signinSchema_data.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message:"Sucessfully authenticated"
        });
    };