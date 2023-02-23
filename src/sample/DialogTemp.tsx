import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";

const DialogTemp = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleModelOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div>
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
        sx={{ width: 1, height: 1 }}
        // fullWidth={"lg"}
        // maxWidth={"lg"}
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
          <div>내용</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(DialogTemp);
