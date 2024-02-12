export const getPatientFromServer = async (patientId) => {
    try {
        const url = `http://localhost:8080/patients/${patientId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        return await response.json();
    }
    catch (error)
    {
        return {}
    }
};