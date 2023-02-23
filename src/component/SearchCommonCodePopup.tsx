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
import request from "./../api/request";
import DateField from "./DateField";
import SearchCommonSheet from "./SearchCommonSheet";

type props = {
  open: boolean;
  onClose: () => void;
  url?: string;
  dateText?: string;
  inputTitle?: string;
  defaultValue?: string;
  callBackCommonCodeData: (code: string, name: string) => void;
};

let pageSheet: any = null;

const SearchCommonCodePopup = ({
  open,
  onClose,
  url,
  dateText,
  inputTitle,
  defaultValue,
  callBackCommonCodeData,
}: props) => {
  const { t } = useTranslation();
  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchDateRef = useRef<HTMLInputElement>(null);

  const getCodeList = () => {
    console.log("searchTextRef ", searchTextRef.current?.value);
    console.log("searchDateRef ", searchDateRef.current?.value);

    //데이터 체크
    if (searchTextRef.current?.value && searchDateRef.current?.value) {
      if (url) {
        request({
          url: url,
          method: CommonConstants.REQUEST_METHOD_GET,
        })
          .then((res) => {
            console.log("getOrgList : ", res.data.data);
            pageSheet.loadSearchData(res.data.data);
          })
          .catch((e) => {})
          .finally(() => {});
      } else {
        request({
          url: "/data/commonCode.json",
          method: CommonConstants.REQUEST_METHOD_GET,
        })
          .then((res) => {
            console.log("getOrgList : ", res.data.data);
            pageSheet.loadSearchData(res.data.data);
          })
          .catch((e) => {})
          .finally(() => {});
      }
    }
  };

  const setPageSheet = (evt: any) => {
    pageSheet = evt.sheet;

    //검색 데이터가 있으면 바로 검색
    getCodeList();
  };

  const setOrgData = () => {
    var row = pageSheet.getFocusedRow();

    console.log("row", row);
    console.log("org_cd", row.cd_id);
    console.log("org_name", row.cd_nm);

    callBackCommonCodeData(row.cd_id, row.cd_nm);
    handleClose();
  };

  const setData = (data: any) => {
    console.log("setData", data);
    console.log("org_cd", data.row.cd_id);
    console.log("org_name", data.row.cd_nm);

    callBackCommonCodeData(data.row.cd_id, data.row.cd_nm);
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
          {t(inputTitle as string)}
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
                  label={t(inputTitle as string)}
                  size="small"
                  sx={{ width: 1 }}
                  defaultValue={defaultValue}
                ></TextField>
              </Grid>
              <Grid>
                <Button variant="contained" size="medium" onClick={getCodeList}>
                  조회
                </Button>
                <Button variant="contained" size="medium" onClick={setOrgData}>
                  확인
                </Button>
              </Grid>
            </Grid>
            <Box border={"solid 1px"} height={"480px"} overflow={"hidden"}>
              <SearchCommonSheet
                sheetCallBack={setPageSheet}
                setData={setData}
              />
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

SearchCommonCodePopup.defaultProps = {
  inputTitle: "공통코드",
};

export default React.memo(SearchCommonCodePopup);
