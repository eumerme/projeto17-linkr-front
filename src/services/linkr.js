import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

function registerUser(body){
    return axios.post(`${BASE_URL}/signup`, body);
}

export { registerUser };