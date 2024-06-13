export const getPatientFromServer = async (patientId) => {
    try {
        const url = `http://localhost:8086/patients/${patientId}`;
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

export const getPatientsWithReceptionToday = async () => {
    try {
        const url = `http://localhost:8086/patients/todayReception`;
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
        return []
    }
};