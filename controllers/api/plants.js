const Plant = require('../../models/plant')
const token = process.env.PERENUAL_TOKEN
const BASE_URL = `https://perenual.com/api/species-list?key=${token}`

module.exports = {
    search
}

async function search(req, res) {
    const endpoint = `${BASE_URL}&page=${req.body.pg}&q=${req.params.term}`
    const response = await fetch(endpoint).then((res) => res.json())
    const data = response.data.map( el => {
        const formattedData = {
            apiID: el.id,
            common_name : el.common_name,
            watering : el.watering,
            sunlight : el.sunlight,
            img : {
                regular_url : el.default_image.regular_url,
                thumbnail : el.default_image.thumbnail
            }
        }
        return formattedData
    })
    const pagination = {
        resultsPerPg: response.per_page, 
        curPg: response.current_page, 
        pgCount: response.last_page, 
        totalResults: response.total
    }
    res.json({data:data, pagination:pagination})
}