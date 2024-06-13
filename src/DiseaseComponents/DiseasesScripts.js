export const getDiseases = async () => {
    try {
        const response = await fetch("http://localhost:8085/diseases", {
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