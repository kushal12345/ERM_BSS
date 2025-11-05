import api from "../../utils/api";

export const terminateEmp = async (id, setdata) => {
    await api.post(`api/employees/${id}`)
        .then(response => {
            console.log("Employee terminated successfully:", response);
            setdata(prevData => prevData.filter(emp => emp.empID[0]._id !== id));
        })
        .catch(error => {
            console.error("Error terminating employee:", error);
        });
}