import logErrortoFile from "../../Logger/logger.js";

function startServer (app, PORT) {
    console.log("Processing")
    try {
        console.log("Please wait starting...")
        app.listen(PORT, ()=>{
            console.log(`Server is Running on PORT ${PORT}`);
        })
    } catch (error) {
        logErrortoFile(error);
        console.log(error);
    }
}


export default startServer;