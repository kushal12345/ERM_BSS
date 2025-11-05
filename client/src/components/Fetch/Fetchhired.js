import api from "../../utils/api";

export const fetchHired = (setdata) => {
    try {
        api.get(`/api/fetchallhired`)
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