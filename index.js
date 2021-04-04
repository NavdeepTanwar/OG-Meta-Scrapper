const cheerio = require("cheerio");
const axios = require("axios");

const fallback = require('./fallback');

const main = async (url) => {
    try {
        let axios_request = await axios.get(url);
        const ogObject = {};
        if (axios_request.status === 200 && /text\/html+/.test(axios_request.headers['content-type'])) {
            let $ = cheerio.load(axios_request.data);
            let meta_list = $(`meta[property^="og:"]`);
            meta_list.each((index, element) => {
                let name = element.attribs.property.replace("og:", "");
                ogObject[name] = element.attribs.content;
            });
            let result = fallback(ogObject, $, url);
            return formatResponse(true, "success", result);
        }
        return formatResponse(false, "Site can't be reached", {});
    } catch (error) {
        console.error(error);
        return formatResponse(false, "Site can't be reached", {error: error.message});
    }
}

//Pretty Response
const formatResponse = (status, message, result) => JSON.stringify({
    status,
    message,
    result
}, null, 2);

//Lambda Handler
exports.handler = async (event) => {
    try {
        if (!event.queryStringParameters || !event.queryStringParameters.url.length > 1) {
            let data = formatResponse(false, "Required parameter is missing: url", {});
            return {
                statusCode: 200,
                body: data,
            }
        }

        let data = await main(event.queryStringParameters.url);

        return {
            statusCode: 200,
            body: data,
        }

    } catch (error) {
        return {
            statusCode: 200,
            body: formatResponse(false, "Something Went Wrong", {error: error.message})
        }
    }
};
