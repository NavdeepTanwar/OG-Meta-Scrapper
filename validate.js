const axios = require('axios');

//To check if image is real
const accessibleImage = async (url) => {
    try {
        let response = await axios.get(url);
        return response.status === 200 && /image\/+/.test(response.headers['content-type']);

    } catch (error) {
        console.error(error.message);
        return false;
    }
}

module.exports = {
    accessibleImage
}
