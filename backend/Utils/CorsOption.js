import allowedOrigins from "./AllowedOrigin.js";

const corsOption = {
    origin:(origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else{
            callback(new Error('Not Allowed by CORS'))
        }
    },
    Credentials:true,
    optionSuccessStatus:200
}


export default corsOption;