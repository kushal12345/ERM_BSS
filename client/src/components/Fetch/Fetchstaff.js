import api from "../../utils/api";

export const fetchstaff = (setdata , staff) => {
    try {
        if( staff === "all" || staff === "all" || staff === "All" || staff === "ALL"){
            // Fetch all staff
            api.get(`/api/fetchallstaff/all`)
                    .then(response => {
                        const data = response.data;

                        if(data.success === true){
                            setdata(data.result);
                        }else{
                            console.log(data.message);
                        }
                    })
        }else if(staff && staff.length > 0 && staff !== "all" && staff !== "All" && staff !== "ALL" && staff !== undefined && staff !== null){
            // Fetch specific staff
            api.get(`/api/fetchallstaff/${staff}`)
            .then(response => {
                const data = response.data;

                if(data.success === true){
                    setdata(data.result);
                }else{
                    console.log(data.message);
                }
            })
            return;
        }else{
            console.log("Invalid staff parameter");
            return;
        }
        
    } catch (error) {
        console.log(error);
    }
}