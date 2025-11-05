import Terminate from "../models/TerminateModel.js";

export const FetchTerminated = async (req, res) => {
    try {
        const data = await Terminate.find().sort({ createdAt: -1 });
        
        /*if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: "No terminated employees found" });
        }*/
        // Always return 200, even if no results
        return res.status(200).json({
            success: true,
            result: data || []
        });
    } catch (error) {
        console.error("Error fetching terminated employees:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}   