import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { ToastContainer } from "react-toastify";
import SheetTemp from "./SheetTemp";
import { useTranslation } from "react-i18next";
import SearchOrg from "../component/SearchOrg";
import CommonCodePopup from "./CommonCodePopup";
import SelectComboField from "../component/SelectComboField";
import CircularProgress from "@mui/material/CircularProgress";

let pageSheet = null;

function GetListTemp() {
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
      <Box margin={1} marginTop={2}>
        <Grid container spacing={2}>
          <Grid>
            <SelectComboField
              labelText="근태종류"
              fieldId={"workKindCode"}
              defaultCode={{ cd_id: 100, cd: "100", cd_nm: "전체" }}
              defaultValue={100}
            />{" "}
            <CommonCodePopup></CommonCodePopup>
            <SearchOrg callBackData={orgData} />
          </Grid>
        </Grid>
        <Grid>
          <CircularProgress />
        </Grid>
        <SheetTemp sheetCallBack={setPageSheet} setData={setData} />
      </Box>
      <ToastContainer />
    </div>
  );
}

export default React.memo(GetListTemp);
