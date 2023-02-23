import { Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import DtmApplyPopup from "./DtmApplyPopup";
import DtmApplySheet from "./DtmApplySheet";

import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import DateField from "../../component/DateField";

/**
 * 근태 신청
 */
let pageSheet: any = null;

const setData = (data: any) => {
  console.log("setData", data);
  console.log("org_cd", data.row.org_cd);
  console.log("org_name", data.row.org_nm);
};

const setPageSheet = (evt: any) => {
  console.log("setPageSheet");
  pageSheet = evt.sheet;
};

function DtmApply() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2023"));
  const [open, setOpen] = React.useState(false);

  const openPopup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getApplyList = () => {};

  const shouldDisableDate2 = (day: any) => {
    // console.log("shouldDisableDate2 : ", dayjs(day).format("YYYY-MM-DD dddd"));

    if (
      "Saturday" === dayjs(day).format("dddd") ||
      "Sunday" === dayjs(day).format("dddd")
    ) {
      return true;
    }

    return false;
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
    <div style={{ height: "100%" }}>
      <div style={{ margin: "1em", display: "flex" }}>
        <DateField label="Year" inputFormat="YYYY" />
        <Button variant="contained" size="medium" onClick={getApplyList}>
          조회
        </Button>
      </div>
      <div style={{ margin: "1em", display: "flex" }}>
        <Button variant="contained" size="medium" onClick={openPopup}>
          신청
        </Button>
        <Button variant="contained" size="medium">
          다운로드
        </Button>
      </div>
      <div style={{ height: "100%", overflow: "scroll" }}>
        <DtmApplySheet sheetCallBack={setPageSheet} setData={setData} />
      </div>

      <Dialog
        maxWidth={"xl"}
        style={{ width: "100%" }}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="dialog-description"
        sx={{ width: 1, height: 1 }}
      >
        {/* 근태신청팝업 */}
        <DtmApplyPopup handleClose={handleClose} />
      </Dialog>
    </div>
  );
}

export default React.memo(DtmApply);
