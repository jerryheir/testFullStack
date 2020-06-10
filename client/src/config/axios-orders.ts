import axios from 'axios';
import * as constant from "./GlobalConstants.json";

const systems = constant.Systems;

const currentSystem = systems.STAGING;
let BASE_URL;

switch (currentSystem) {
    case systems.STAGING:
        BASE_URL = "";
        break;
    default:
        BASE_URL = "";
}

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;
