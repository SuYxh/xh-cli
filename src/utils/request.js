const axios = require("axios");
const { GIT_TYPE } = require("./config");
const GITEE = "https://gitee.com/api/v5";
const GITHUB = "https://api.github.com";

const BASE_URL = GIT_TYPE === "gitee" ? GITEE : GITHUB;
const request = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = request;
