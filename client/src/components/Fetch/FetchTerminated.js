import api from "../../utils/api";

export const fetchTerminated = (setdata) => {
    try {
        api.get(`/api/fetchallterminated`)
            .then(response => {
                const data = response.data;
                if (data.success === true) {
                    setdata(data.result);
                } else {
                    console.log(data.message);
                }
            });
    } catch (error) {
        console.log(error);
    }
}