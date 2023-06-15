import sendRequest from "./send-request";

const BASE_URL = '/api/plants'

export async function search(term, pg) {
    return sendRequest(`${BASE_URL}/search/${term}`, "POST", {pg})
}

export async function getDetails(id) {
    return sendRequest(`${BASE_URL}/details/${id}`)
}

export async function addPlant(plant) {
    return sendRequest(`${BASE_URL}`, 'POST', {plant})
}

export async function yourPlants() {
    return sendRequest(`${BASE_URL}`)
}