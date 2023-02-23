import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useState, useEffect } from "react";
import FileUpload from "../../component/FileUpload";
import SearchUser from "../../component/SearchEmp";
import DateLayout from "./DateLayout";
import { Button } from "@mui/material";
import ApprovalLine from "../../component/approll/ApprovalLine";
import request from "../../api/request";
import CommonConstants from "../../constants/CommonConstants";

type props = {
  handleClose: () => void;
};

const DtmApplyPopup = ({ handleClose }: props) => {
  const [approvalLineData, setApprovalLineData] = useState<any>();

  const orgData = (code: string, name: string) => {
    console.log("main code", code);
    console.log("main name", name);
  };

  const [addFileList, setAddFileList] = useState<Array<File>>([]);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const photoToAdd = e.target.files;

      for (let i = 0; i < photoToAdd.length; i++) {
        addFileList.push(photoToAdd[i]);
      }

      setAddFileList(addFileList);
      console.log("addFileList : ", addFileList);
    },
    [addFileList]
  );

  console.log("DtmApplyPopup@@@@@@@@@@@@@@@@@@@@@@@@");

  useEffect(() => {
    request({
      url: "/data/approvalLine.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        let codeData = res.data.data;
        setApprovalLineData(codeData);
      })
      .catch((e) => {})
      .finally(() => {});
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <DialogTitle id="scroll-dialog-title" style={{ cursor: "move" }}>
        근태신청
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
      </DialogTitle>

      <DialogContent dividers={true}>
        <div>
          * 결재라인
          <div>
            <ApprovalLine approvalLineData={approvalLineData} />
          </div>
          <div style={{ margin: "1em", display: "flex" }}>
            {approvalLineData ? (
              <div style={{ margin: "1em", display: "flex" }}>
                {" "}
                {approvalLineData.approval.map((it: any) => (
                  <Box
                    component="span"
                    sx={{ margin: "1em", p: 2, border: "1px dashed grey" }}
                  >
                    <div> {it.cd}</div>
                    <div> {it.cd_nm}</div>
                  </Box>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>* 신청자</div>
          <div style={{ padding: "1em", display: "flex", width: "100%" }}>
            <div>
              {" "}
              <SearchUser callBackData={orgData} />
            </div>
          </div>
          <div>* 연차신청</div>
          <div>
            <DateLayout />
          </div>
          <div>
            <FileUpload
            // addFileList={addFileList}
            // onUploadImage={onUploadImage}
            />
          </div>
        </div>
      </DialogContent>
    </div>
  );
};
export default React.memo(DtmApplyPopup);
