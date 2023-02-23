import React from "react";
import CommSheet from "../CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addTextRelWidthEditCol,
  addCheckCol,
  setCallBackEvent,
  addEnumCol,
} from "../../utils/sheetUtil";
import { Button } from "@mui/material";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
};

function ApprovalSheet3({ sheetCallBack, setData }: props) {
  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(
      addCheckCol(
        { Value: "삭제", Align: "Center", Icon: "Check", HeaderCheck: 1 },
        "org_cd2"
      )
    );

    initDef.options.Cols.push(
      addEnumCol("승인상태", "cd", "|결재|합의", "|100|200")
    );

    initDef.options.Cols.push(
      addTextRelWidthEditCol("사원정보", "cd_nm", false)
    );

    initDef.options.Events = setCallBackEvent((evt) => sheetCallBack(evt));
    console.log("ApprovalSheet3 : ", initDef);
    return initDef;
  };

  const initDef = initOption();

  return (
    <div style={{ flex: "1", margin: "1em" }}>
      <div style={{ display: "flex", margin: "1em" }}>
        <div>합의라인</div>
        <Button
          variant="contained"
          size="medium"
          // onClick={handleModelOpen}
        >
          항목에 추가
        </Button>
      </div>
      <CommSheet sheetDef={initDef} />
    </div>
  );
}

export default React.memo(ApprovalSheet3);
