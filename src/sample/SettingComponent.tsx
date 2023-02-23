import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { ToastContainer } from "react-toastify";
import SearchOrg from "../component/SearchOrg";
import CommonCodePopup from "./CommonCodePopup";
import SelectComboField from "../component/SelectComboField";
import CircularProgress from "@mui/material/CircularProgress";
import { margin } from "@mui/system";

let pageSheet = null;

function SettingComponent() {
  const { t } = useTranslation();

  const setData = (data: any) => {
    console.log("setData", data);
    console.log("org_cd", data.row.org_cd);
    console.log("org_name", data.row.org_nm);
  };

  const setPageSheet = (evt: any) => {
    console.log("setPageSheet");
    pageSheet = evt.sheet;
  };
  const orgData = (code: string, name: string) => {
    console.log("orgData code", code);
    console.log("orgData name", name);
  };

  return (
    <div>
      <div>
        1. 콤보 컴포넌트
        <SelectComboField
          fieldId={"workKindCode"}
          defaultCode={{ cd_id: 100, cd: "100", cd_nm: "전체" }}
          defaultValue={100}
        />{" "}
      </div>

      <div style={{ margin: "1em" }}>
        2. 로딩
        <CircularProgress />
      </div>

      <div style={{ margin: "1em" }}>
        <CommonCodePopup></CommonCodePopup>
      </div>

      <ToastContainer />
    </div>
  );
}

export default React.memo(SettingComponent);
