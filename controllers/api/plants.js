const Plant = require('../../models/plant')
const token = process.env.PERENUAL_TOKEN
const BASE_URL = `https://perenual.com/api`

module.exports = {
    search,
    detail,
    addPlant,
    yourPlants, 
    deletePlant,
    recordWatering
}

async function search(req, res) {
    const endpoint = `${BASE_URL}/species-list?key=${token}&page=${req.body.pg}&q=${req.params.term}`
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

async function detail(req, res) {
    try {
        const endpoint = `${BASE_URL}/species/details/${req.params.id}?key=${token}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch species details');
        }
        const responseData = await response.json();
    
        const careGuideEnpoint = responseData['care-guides'];
        const careGuideResponse = await fetch(careGuideEnpoint);
        if (!careGuideResponse.ok) {
            throw new Error('Failed to fetch care guides');
        }
        const careGuideData = await careGuideResponse.json();
    
        const watering =
            careGuideData.data.length > 0
            ? careGuideData.data[0].section.find((el) => el.type === 'watering') || ''
            : '';
        const sunlight =
            careGuideData.data.length > 0
            ? careGuideData.data[0].section.find((el) => el.type === 'sunlight') || ''
            : '';
    
        const data = {
            apiID: responseData.id,
            common_name: responseData.common_name,
            scientific_name: responseData.scientific_name,
            origin: responseData.origin,
            type: responseData.type,
            watering: responseData.watering,
            wateringDescription: watering ? watering.description : '',
            sunlight: responseData.sunlight,
            sunlightDescription: sunlight ? sunlight.description : '',
            care_level: responseData.care_level,
            description: responseData.description,
            img: {
            regular_url: responseData.default_image.regular_url,
            thumbnail: responseData.default_image.thumbnail,
            },
        };
    
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}  

async function addPlant(req, res) {
    const plant = await Plant.create(req.body.plant)
    res.json(plant)
}

async function yourPlants(req, res) {
    let plants = []
    if (req.user) {
        plants = await Plant.find({user: req.user._id})
    }
    res.json(plants)
}

async function deletePlant(req, res) {
    try {
        await Plant.deleteOne({_id: req.params.id})
        res.json('plant removed')
    } catch(err) {
        res.json(`error: ${err}`)
    }
}

async function recordWatering(req, res) {
    const plant = await Plant.findById(req.params.id)
    plant.wateredOn.push(req.body.date)
    plant.save()
    res.json(plant)
}