export const getTemplateFromServer = async (templateId, doctorId) => {
    try {
        const paramName = 'doctor_id'
        const url = `http://localhost:8084/templates/${templateId}?${paramName}=${doctorId}`;
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

export const getTemplateByPatientAndDoctor = async (patientId, doctorId) => {
    try {
        const paramName = 'doctor_id'
        const url = `http://localhost:8084/templates/byPatientAndDoctor?patient_id=${patientId}&${paramName}=${doctorId}`;
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