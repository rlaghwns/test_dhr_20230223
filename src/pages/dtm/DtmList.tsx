import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDmtList, workKindCode } from "../../api/apis";
import DatePickerRange from "../../component/DatePickerRange";
import Loading from "../../component/Loading";
import SelectComboField from "../../component/SelectComboField";
import { getToday } from "../../utils/dateUtils";
import SearchEmp from "../../component/SearchEmp";
import DtmListSheet from "./DtmListSheet";
import SearchOrg from "../../component/SearchOrg";

/**
 * 근태 조회
 */
let pageSheet: any = null;

function DtmList() {
  const [isLoading, setLoading] = useState(false);

  const [commonCode, setCommonCode] = useState();
  const [commonCode1, setCommonCode1] = useState();
  const [commonCode2, setCommonCode2] = useState();
  const [commonData, setCommonData] = useState();

  const [startDate, setStartDate] = useState(getToday(0));
  const [endDate, setEndDate] = useState(new Date());
  const startCalendar = useRef();

  const orgData = (code: string, name: string) => {
    console.log("orgData code", code);
    console.log("orgData name", name);
  };

  const userData = (code: string, name: string) => {
    console.log("userData code", code);
    console.log("userData name", name);
  };

  const setData = (data: any) => {
    console.log("setData", data);
    console.log("org_cd", data.row.org_cd);
    console.log("org_name", data.row.org_nm);
  };

  const setPageSheet = (evt: any) => {
    console.log("setPageSheet");
    pageSheet = evt.sheet;
  };

  const requestCode = (data: any) => {
    console.log("requestCode");
    const { work_kind_cd, work_cd, work_cd2 } = data;
    setCommonData(data);
    setCommonCode(work_kind_cd);
    setCommonCode1(work_cd);
  };

  useEffect(() => {
    workKindCode(requestCode);
  }, []);

  const getList = () => {
    setLoading(true);
    const res = getDmtList(pageSheet);
    res
      .then((res) => {
        console.log("then : ", res);
        setLoading(false);
      })
      .catch((e) => {
        console.log("catch", e);
        setLoading(false);
      });
  };

  const download = () => {
    console.log("download : ");
    pageSheet.down2Excel();
  };

  const addRow = () => {
    console.log("addRow : ");
    pageSheet.addRow();
  };

  const save = () => {
    console.log("save : ", pageSheet.getSaveJson());
    const { data, Code, row } = pageSheet.getSaveJson();
    console.log("data : ", data.length);
    console.log("Code : ", Code);
    console.log("row : ", row);
    if (Code === "IBS000") {
      //에러
      pageSheet.focus(row);
      toast.error("입력을 추가 해주세요.", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (data.length == 0 || Code === "IBS010") {
      //에러
      pageSheet.focus(row);
      toast.error("Sheet 필수값을 입력해주세요", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success("저장되었습니다.", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <Box margin={1} marginTop={2}>
        <Grid container spacing={2}>
          <Grid>
            <DatePickerRange></DatePickerRange>
          </Grid>
          <Grid>
            <SelectComboField
              labelText="근태종류"
              fieldId={"workKindCode"}
              data={commonCode}
              defaultCode={{ cd_id: 100, cd: "100", cd_nm: "전체" }}
              defaultValue={100}
            />{" "}
          </Grid>
          <Grid>
            <SelectComboField
              labelText="신청서상태코드"
              fieldId={"applyStateCode"}
              data={commonCode1}
              defaultCode={{ cd_id: 100, cd: "100", cd_nm: "전체" }}
              defaultValue={100}
            />{" "}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid>
            <SearchOrg callBackData={orgData} />
          </Grid>
          <Grid>
            <SearchEmp callBackData={userData} />
          </Grid>
          <Grid>
            <Button variant="contained" size="medium" onClick={getList}>
              자료조회
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" size="medium" onClick={addRow}>
              입력
            </Button>
            <Button variant="contained" size="medium" onClick={save}>
              저장
            </Button>
            <Button variant="contained" size="medium" onClick={download}>
              다운로드
            </Button>
          </Grid>
        </Grid>
        {commonData ? (
          <DtmListSheet
            sheetCallBack={setPageSheet}
            setData={setData}
            code={commonData}
          />
        ) : (
          <></>
        )}
      </Box>
      <ToastContainer />
      <Loading isLoading={isLoading}></Loading>
    </div>
  );
}

export default React.memo(DtmList);
