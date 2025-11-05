import api from "../../utils/api";

export const FetchSearchedstaff = (setdata , staff) => {
    try {
        if(staff && staff.length > 0){
            console.log(staff);
            api.get(`/api/FetchSearchedstaff/${staff}`)
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
            return;
        }
        
    } catch (error) {
        console.log(error);
    }
}