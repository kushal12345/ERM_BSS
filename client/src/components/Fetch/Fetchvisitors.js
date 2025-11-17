import api from "../../utils/api";

export const fetchVisitors = async(setdata) => {
    try {
        await api.get(`/api/fetchallvisitors`)
        .then(response => {
            const data = response.data;
            console.log(data);
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
