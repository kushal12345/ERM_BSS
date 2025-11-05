import api from "../../utils/api";

export const fetchClient = (setdata) => {
    try {
        api.get(`/api/fetchallclient`)
        .then(response => {
            const data = response.data;
            if(data.success === true){
                setdata(data.result);
            }else{
                console.log(data.message);
            }
        })
    } catch (error) {
        console.log(error);
    }
}