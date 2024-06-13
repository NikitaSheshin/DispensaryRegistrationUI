export const getVisitById = async (visitId) => {
    try {
        const url = `http://localhost:8087/visits/` + visitId;
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