import axios from 'axios';

const productionUrl = 'https://auth-qa.qencode.com';

export const customFetch = axios.create({
    baseURL: productionUrl,
});

