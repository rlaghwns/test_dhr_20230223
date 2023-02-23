import axios, { AxiosError, AxiosResponse } from "axios";
import CommonConstants from "./../constants/CommonConstants";

const client = (() => {
  return axios.create({
    baseURL: CommonConstants.BASE_URL,
    timeout: CommonConstants.DEFAULT_TIMEOUT,
    headers: {
      "Content-type": "application/json",
    },
  });
})();

const request = async function (options: {}) {
  const onSuccess = function (response: AxiosResponse) {
    //에러 코드 관련 고민 필요
    // console.log("onSuccess");
    return response;
  };

  const onError = function (error: AxiosError) {
    // console.log("request onError : " + error);
    return Promise.reject(error.response);
  };

  try {
    return client(options).then(onSuccess).catch(onError);
  } catch (e) {
    console.log("request catch : ", e);
  }

  return client(options).then(onSuccess).catch(onError);
};

export default request;
