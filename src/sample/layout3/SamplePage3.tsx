import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import request from "../../api/request";
import DateField from "../../component/DateField";
import CommonConstants from "../../constants/CommonConstants";
import { addStatusRow, sheetSave } from "../../utils/sheetUtil";
import SamplePageSheet1 from "./SamplePage3Sheet1";
import SamplePageSheet2 from "./SamplePage3Sheet2";

function SamplePage2() {
  const { t } = useTranslation();

  const dateRef = useRef<HTMLInputElement>(null);

  let pageSheet1: any = null;
  let pageSheet2: any = null;

  const beCall = () => {
    return request({
      url: "/data/sample2.json",
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
      url: "/data/sample2_1.json",
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

  const beCall3 = () => {
    request({
      url: "/data/sample2_2.json",
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

  const addRow1 = () => {
    console.log("addRow : ");
    addStatusRow(pageSheet1);
  };

  const save1 = () => {
    console.log("save1");
    sheetSave(pageSheet1);
  };

  const setOnClick1 = (data: any) => {
    console.log("setData", data);
    console.log("emp_no3", data.row.emp_no3);
    console.log("Added", data.row.Added);

    if (data.row.Added === undefined) {
      if (data.row.emp_no2 === 1) {
        beCall2();
      } else if (data.row.emp_no2 === 2) {
        beCall3();
      } else {
        pageSheet2.loadSearchData(null);
      }
    }
  };

  const getlist = () => {
    console.log("dateRef", dateRef.current?.value);
    beCall().then((e: any) => {
      beCall2();
    });
  };

  const setPageSheet1 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet1 = evt.sheet;

    beCall().then((e: any) => {
      beCall2();
    });
  };

  const addRow2 = () => {
    console.log("addRow : ");
    addStatusRow(pageSheet2);
  };

  const save2 = () => {
    console.log("save2");
    sheetSave(pageSheet2);
  };

  const setOnClick2 = (data: any) => {
    console.log("setData2", data.row.emp_no2);
  };

  const setPageSheet2 = (evt: any) => {
    console.log("setPageSheet2");
    pageSheet2 = evt.sheet;
  };

  return (
    <div>
      <Grid>
        <div style={{ margin: "1em", display: "flex" }}>
          <DateField inputRef={dateRef} label="년도" inputFormat="YYYY.MM.DD" />
          <Button variant="contained" size="medium" onClick={getlist}>
            조회
          </Button>
        </div>
      </Grid>
      <Box overflow={"hidden"} margin={"1px"}>
        <Grid container>
          <Grid sx={{ width: 0.5 }}>
            <Grid>
              <div style={{ display: "flex", overflow: "auto" }}>
                <Button variant="contained" size="medium" onClick={addRow1}>
                  입력
                </Button>
                <Button variant="contained" size="medium" onClick={save1}>
                  저장
                </Button>
              </div>
            </Grid>
            <Grid sx={{ height: 300 }}>
              <SamplePageSheet1
                sheetCallBack={setPageSheet1}
                setOnClick={setOnClick1}
              />
            </Grid>
          </Grid>
          <Grid sx={{ width: 0.5 }}>
            <Grid>
              <div style={{ display: "flex" }}>
                <Button variant="contained" size="medium" onClick={addRow2}>
                  입력
                </Button>
                <Button variant="contained" size="medium" onClick={save2}>
                  저장
                </Button>
              </div>
            </Grid>
            <Grid sx={{ height: 0.5 }}>
              <SamplePageSheet2
                sheetCallBack={setPageSheet2}
                setOnClick={setOnClick2}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default React.memo(SamplePage2);
