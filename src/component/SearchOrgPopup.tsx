import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import CommonConstants from "../constants/CommonConstants";
import request from "../api/request";
import DateField from "./DateField";
import SearchOrgSheet from "./SearchOrgSheet";

type props = {
  open: boolean;
  onClose: () => void;
  dateText?: string;
  inputTitle?: string;
  defaultValue?: string;
  callBackData: (code: string, name: string) => void;
};

let pageSheet: any = null;

const SearchOrgPopup = ({
  open,
  onClose,
  dateText,
  inputTitle,
  defaultValue,
  callBackData,
}: props) => {
  const { t } = useTranslation();

  const [orgNumberText, setOrgNumberText] = React.useState("");
  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchDateRef = useRef<HTMLInputElement>(null);

  const getOrgList = () => {
    console.log("searchTextRef ", searchTextRef.current?.value);
    console.log("searchDateRef ", searchDateRef.current?.value);

    //데이터 체크
    if (searchTextRef.current?.value && searchDateRef.current?.value) {
      request({
        url: "/data/orgList.json",
        method: CommonConstants.REQUEST_METHOD_GET,
      })
        .then((res) => {
          console.log("getOrgList : ", res);
          pageSheet.loadSearchData(res.data.data);
        })
        .catch((e) => {})
        .finally(() => {});
    }
  };

  const setPageSheet = (evt: any) => {
    pageSheet = evt.sheet;

    //검색 데이터가 있으면 바로 검색
    getOrgList();
  };

  //확인 버튼 후 데이터 전달하는 함수
  const setOrgData = () => {
    var row = pageSheet.getFocusedRow();

    console.log("row", row);
    console.log("org_cd", row.org_cd);
    console.log("org_name", row.org_nm);

    callBackData(row.org_cd, row.org_nm);
    handleClose();
  };

  //더블클릭하여 콜백으로 데이터 넘어가는 함수
  const setData = (data: any) => {
    console.log("setData222", data);
    console.log("org_cd", data.row.org_cd);
    console.log("org_name", data.row.org_nm);

    callBackData(data.row.org_cd, data.row.org_nm);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  function PaperComponent(page: any) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...page} />
      </Draggable>
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="dialog-description"
        sx={{ width: 1, height: 1 }}
      >
        <DialogTitle id="scroll-dialog-title" style={{ cursor: "move" }}>
          부서찾기
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 4,
              top: 6,
              // color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers={true}>
          <Stack spacing={1}>
            <Grid container spacing={2}>
              <Grid>
                <DateField
                  inputRef={searchDateRef}
                  label="기준일자"
                  initDate={dateText}
                />
              </Grid>
              <Grid>
                <TextField
                  inputRef={searchTextRef}
                  id="searchText"
                  label="소속코드/명"
                  size="small"
                  sx={{ width: 1 }}
                  defaultValue={defaultValue}
                ></TextField>
              </Grid>
              <Grid>
                <Button variant="contained" size="medium" onClick={getOrgList}>
                  조회
                </Button>
                <Button variant="contained" size="medium" onClick={setOrgData}>
                  확인
                </Button>
              </Grid>
            </Grid>
            <Box border={"solid 1px"} height={"480px"} overflow={"hidden"}>
              {/* 부서 조회 시트 */}
              <SearchOrgSheet sheetCallBack={setPageSheet} setData={setData} />
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(SearchOrgPopup);
