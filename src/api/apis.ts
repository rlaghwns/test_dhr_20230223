import request from "./request";
import CommonConstants from "./../constants/CommonConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 사원찾기
 * @param name
 * @param sheet
 */
export const getEmpList = (name: string = "", sheet: any) => {
  console.log("getUserList ", name);

  //데이터 체크
  if (name) {
    return request({
      url: "/data/userList.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("getUserList : ", res);
        sheet.loadSearchData(res.data.data);
        return res;
      })
      .catch((e) => {
        console.log("catch");
        return Promise.reject(e);
      })
      .finally(() => {});
  }
};

/**
 * 사용자 찾기
 * @param name
 * @param sheet
 */
export const getUserList = (name: string = "", sheet: any) => {
  console.log("getUserList ", name);

  //데이터 체크
  if (name) {
    return request({
      url: "/data/userList.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("getUserList : ", res);
        sheet.loadSearchData(res.data.data);
        return res;
      })
      .catch((e) => {
        console.log("catch");
        return Promise.reject(e);
      })
      .finally(() => {});
  }
};

/**
 * 부서원 조회
 * @param name
 * @param sheet
 */
export const getDepUserList = (sheet: any) => {
  console.log("getDepUserList ");

  //데이터 체크
  request({
    url: "/data/depUser.json",
    method: CommonConstants.REQUEST_METHOD_GET,
  })
    .then((res) => {
      console.log("getDepUserList : ", res);
      sheet.loadSearchData(res.data.data);
    })
    .catch((e) => {})
    .finally(() => {});
};

/**
 * 근태내역조회
 * @param sheet
 */
export const getDmtList = (sheet: any) => {
  console.log("getDmtList ");

  //데이터 체크
  return request({
    url: "/data/dmtList.json",
    method: CommonConstants.REQUEST_METHOD_GET,
  })
    .then((res) => {
      console.log("data : ", res.data.data.list);
      const list = res.data.data.list;

      sheet.loadSearchData(list);
      return res;
    })
    .catch((e) => {
      return Promise.reject(e);
    })
    .finally(() => {});
};

/**
 * 공통코드
 * @param callBack
 */
export const workKindCode = (callBack: (data: any) => void) => {
  console.log("workKindCode ");

  //데이터 체크
  request({
    url: "/data/workKindCode.json",
    method: CommonConstants.REQUEST_METHOD_GET,
  })
    .then((res) => {
      console.log("data : ", res.data.data);

      callBack(res.data.data);
    })
    .catch((e) => {})
    .finally(() => {});
};

/**
 * 공통코드
 * @param callBack
 */
export const getCode = (callBack: (data: any) => void) => {
  console.log("workKindCode ");

  //데이터 체크
  request({
    url: "/data/workKindCode.json",
    method: CommonConstants.REQUEST_METHOD_GET,
  })
    .then((res) => {
      console.log("data : ", res.data.data);

      callBack(res.data.data);
    })
    .catch((e) => {})
    .finally(() => {});
};
