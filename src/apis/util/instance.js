import axios from "axios";

const liveServerAddress = "https://scram.site:8080";
const localServerAddress = "http://localhost:8080";
export const IMAGE_ADDRESS = localServerAddress + "/images/";

export const instance = axios.create({
    baseURL: localServerAddress,
    headers: {
        Authorization: localStorage.getItem("accessToken")
    }
});