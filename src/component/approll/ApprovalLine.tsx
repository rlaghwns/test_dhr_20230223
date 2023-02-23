import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { getUserList, getDepUserList } from "../../api/apis";
import ApprovalSheet1 from "./ApprovalSheet1";
import ApprovalSheet2 from "./ApprovalSheet2";
import ApprovalSheet4 from "./ApprovalSheet4";

type props = {
  approvalLineData: any;
};

const ApprovalLine = ({ approvalLineData }: props) => {
  let pageSheet1: any = null;
  let pageSheet2: any = null;
  let pageSheet3: any = null;
  let pageSheet4: any = null;

  const { t } = useTranslation();

  const userNameTextRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);

  const handleModelOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setData1 = (data: any) => {
    console.log("setData", data);
  };
  const setData2 = () => {
    console.log("setData2");

    // sheet.getFocusedRow
    // sheet.addRow( {"next":nextRow, "parent":parentRow} );
    const focusedRow = pageSheet1.getFocusedRow();
    console.log("focusedRow : ", focusedRow.emp_nm);
    pageSheet2.addRow({
      init: {
        CanEdit: 1,
        cd_id: 100,
        cd: t("결재"),
        cd_nm: focusedRow.emp_nm,
      },
    });
  };

  const setData3 = (data: any) => {
    console.log("setData", data);
  };

  //수신처
  const setData4 = () => {
    console.log("수신처 넣기");

    const focusedRow = pageSheet1.getFocusedRow();
    console.log("focusedRow : ", focusedRow.emp_nm);
    pageSheet4.addRow({
      init: {
        CanEdit: 1,
        cd_id: 100,
        cd: t("결재"),
        cd_nm: focusedRow.emp_nm,
      },
    });
  };

  const setPageSheet1 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet1 = evt.sheet;
  };

  const setPageSheet2 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet2 = evt.sheet;
  };

  const setPageSheet3 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet3 = evt.sheet;
  };

  const setPageSheet4 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet4 = evt.sheet;
  };

  const userList = () => {
    getUserList(userNameTextRef.current?.value, pageSheet1);
  };

  const depUserList = () => {
    getDepUserList(pageSheet1);
  };

  function PaperComponent(page: any) {
    return (
      <Draggable
        // drag 해야 하는 컴포넌트ID를 선정해야 한다.
        // DialogContentText에 ID로 등록한다. ################################
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...page} />
      </Draggable>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Button
        style={{ margin: "1em" }}
        variant="contained"
        size="medium"
        onClick={handleModelOpen}
      >
        {t("결재선 지정")}
      </Button>
      {/* 결재선 지정 팝업 설정   */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"xl"}
        style={{ width: "100%" }}
        // maxWidth={"lg"}
      >
        <DialogTitle id="scroll-dialog-title" style={{ cursor: "move" }}>
          <div>
            <div style={{ display: "flex" }}>
              <TextField
                inputRef={userNameTextRef}
                label={t("사원찾기/성명")}
                size="small"
                sx={{ width: 1 / 5 }}
              />
              <Button
                style={{ marginLeft: "1em" }}
                variant="contained"
                size="medium"
                onClick={userList}
              >
                {t("조회")}
              </Button>
              <Button
                style={{ marginLeft: "1em" }}
                variant="contained"
                size="medium"
                onClick={depUserList}
              >
                {t("부서원 조회")}
              </Button>
              <Button
                style={{ marginLeft: "1em", float: "right" }}
                variant="contained"
                size="medium"
              >
                {t("결재선 등록")}
              </Button>
            </div>

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 4,
                top: 6,
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent dividers={true}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={6}>
              <ApprovalSheet1
                sheetCallBack={setPageSheet1}
                setData={setData1}
              />
            </Grid>
            <Grid xs={6}>
              <ApprovalSheet2
                sheetCallBack={setPageSheet2}
                setData={setData2}
                approvalLineData={approvalLineData}
              />
            </Grid>
            {/* 합의라인 필요할까?? */}
            {/* <Grid xs={6}></Grid>
            <Grid xs={6}>
              <ApprovalSheet3
                sheetCallBack={setPageSheet3}
                setData={setData3}
              />
            </Grid> */}
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <ApprovalSheet4
                sheetCallBack={setPageSheet4}
                setData={setData4}
                approvalLineData={approvalLineData}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(ApprovalLine);
