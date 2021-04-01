import API from "../components/API";

const domain = "http://127.0.0.1:5000";

export const nekrasovkaApi = new API({ url: domain });

nekrasovkaApi.createEntity({ name: "users" }); 
nekrasovkaApi.createEntity({ name: "auth" });
nekrasovkaApi.createEntity({ name: "token" });
nekrasovkaApi.createEntity({ name: "eds" });

export const refreshToken = (params) =>
    nekrasovkaApi.endpoints.token.createOne("refresh", params);


export const postUser = (params) => nekrasovkaApi.endpoints.users.create(params);

export const postFileForEds = (formData) => nekrasovkaApi.endpoints.eds.uploadFile(formData);

export const postForgotPassword = (params) => nekrasovkaApi.endpoints.auth.createOne('forgot', params)
export const postResetPassword = (params) => nekrasovkaApi.endpoints.auth.createOne('reset', params)