import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
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
import { getEmpList, getUserList } from "../api/apis";
import SearchEmpSheet from "./SearchEmpSheet";

type props = {
  open: boolean;
  onClose: () => void;
  isUser?: boolean;
  dateText?: string;
  inputTitle?: string;
  defaultValue?: string;
  callBackData: (code: string, name: string) => void;
};

let pageSheet: any = null;

const SearchEmpPopup = ({
  open,
  onClose,
  isUser = false,
  dateText,
  inputTitle,
  defaultValue,
  callBackData,
}: props) => {
  const { t } = useTranslation();

  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchDateRef = useRef<HTMLInputElement>(null);

  const empList = () => {
    console.log("searchTextRef ", searchTextRef.current?.value);

    //데이터 체크
    if (isUser) {
      //사용자 찾기
      const request = getUserList(searchTextRef.current?.value, pageSheet);
      console.log(
        "then",
        request?.then((res) => {
          console.log("res : ", res);
        })
      );

      console.log(
        "catch ",
        request?.catch((e) => {
          console.log("catch2 : ", e.status);
        })
      );
    } else {
      //사원찾기
      const request = getEmpList(searchTextRef.current?.value, pageSheet);
      console.log(
        "then",
        request?.then((res) => {
          console.log("res : ", res);
        })
      );

      console.log(
        "catch ",
        request?.catch((e) => {
          console.log("catch2 : ", e.status);
        })
      );
    }
  };

  const setPageSheet = (evt: any) => {
    pageSheet = evt.sheet;

    //검색 데이터가 있으면 바로 검색
    empList();
  };

  //확인 버튼 후 데이터 전달하는 함수
  const setEmpData = () => {
    var row = pageSheet.getFocusedRow();

    callBackData(row.emp_no, row.emp_nm);
    handleClose();
  };

  //더블클릭하여 콜백으로 데이터 넘어가는 함수
  const setData = (data: any) => {
    console.log("setData222", data);
    console.log("emp_no", data.row.emp_no);
    console.log("emp_nm", data.row.emp_nm);

    callBackData(data.row.emp_no, data.row.emp_nm);
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
      {/*사원찾기 팝업 설정   */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="dialog-description"
        sx={{ width: 1, height: 1 }}
        // fullWidth={"lg"}
        // maxWidth={"lg"}
      >
        <DialogTitle id="scroll-dialog-title" style={{ cursor: "move" }}>
          {isUser ? "사용자찾기" : "사원찾기"}
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
                <TextField
                  inputRef={searchTextRef}
                  label="성명/사번"
                  size="small"
                  sx={{ width: 1 }}
                  onChange={(text) => {}}
                  defaultValue={defaultValue}
                ></TextField>
              </Grid>
              <Grid>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="퇴직자 포함"
                  />
                </FormGroup>
              </Grid>
              <Grid>
                <Button variant="contained" size="medium" onClick={empList}>
                  조회
                </Button>
                <Button variant="contained" size="medium" onClick={setEmpData}>
                  확인
                </Button>
              </Grid>
            </Grid>
            <Box border={"solid 1px"} height={"480px"} overflow={"hidden"}>
              {/* 사원 조회 시트 */}
              <SearchEmpSheet sheetCallBack={setPageSheet} setData={setData} />
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(SearchEmpPopup);
