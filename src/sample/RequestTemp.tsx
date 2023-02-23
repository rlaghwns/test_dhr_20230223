import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import request from "../api/request";
import CommonConstants from "../constants/CommonConstants";

const RequestTemp = () => {
  const { t } = useTranslation();

  useEffect(() => {
    request({
      url: "/data/workKindCode.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        let codeData = res.data.data.work_kind_cd;
      })
      .catch((e) => {})
      .finally(() => {});
  }, []);

  return <div></div>;
};

export default React.memo(RequestTemp);
