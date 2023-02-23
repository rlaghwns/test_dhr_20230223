import { TextField } from "@mui/joy";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import request from "../../api/request";
import CommonConstants from "../../constants/CommonConstants";
import SamplePageSheet1 from "./SamplePage3_1Sheet1";
import SamplePageSheet2 from "./SamplePage3_1Sheet2";

let pageSheet1: any = null;
let pageSheet2: any = null;

function SamplePage2() {
  const { t } = useTranslation();

  const dateRef = useRef<HTMLInputElement>(null);

  const beCall = () => {
    return request({
      url: "/data/sample3_1.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet1.loadSearchData(list);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const beCall2 = () => {
    request({
      url: "/data/sample3_2.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet2.loadSearchData(list);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const setPageSheet1 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet1 = evt.sheet;

    beCall().then((e: any) => {});
  };

  const setPageSheet2 = (evt: any) => {
    console.log("setPageSheet2");
    pageSheet2 = evt.sheet;
    beCall2();
  };

  return (
    <div>
      <Box overflow={"hidden"} margin={"1px"}>
        <Grid container>
          <Grid sx={{ width: 0.5 }}>
            <Grid container>
              <Grid sx={{ width: 0.3 }}> {t("서비스명")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField> </TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium" onClick={beCall}>
                  {t("조회")}
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ width: 0.3 }}>{t("서비스 xml 생성 경로")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField defaultValue={"D:/dept/service_write"}> </TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium">
                  {t("xml 생성")}
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ width: 0.3 }}> {t("서비스 xml 로드 경로")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField defaultValue={"D:/dept/service_read"}> </TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium">
                  {t("xml 로드")}
                </Button>
              </Grid>
            </Grid>
            <Grid sx={{ height: 300 }}>
              <SamplePageSheet1 sheetCallBack={setPageSheet1} />
            </Grid>
          </Grid>
          {/* SQL 생성----------------------------------------------- */}
          <Grid sx={{ width: 0.5 }}>
            <Grid container>
              <Grid sx={{ width: 0.3 }}> {t("SQL명")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField> </TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium" onClick={beCall2}>
                  {t("조회")}
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ width: 0.3 }}>{t("SQL xml 생성 경로")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField defaultValue={"D:/dept/sql_write"}></TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium">
                  {t("xml 생성")}
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ width: 0.3 }}> {t("SQL xml 로드 경로")}</Grid>
              <Grid sx={{ width: 0.5 }}>
                <TextField defaultValue={"D:/dept/sql_read"}> </TextField>
              </Grid>
              <Grid sx={{ width: 0.2 }}>
                <Button variant="contained" size="medium">
                  {t("xml 로드")}
                </Button>
              </Grid>
            </Grid>
            <Grid sx={{ height: 300 }}>
              <SamplePageSheet2 sheetCallBack={setPageSheet2} />
            </Grid>
          </Grid>
          {/* SQL 생성 끝----------------------------------------------- */}
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default React.memo(SamplePage2);
