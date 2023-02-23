import React from "react";
import CommSheet from "../CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addTextRelWidthCol,
  addCheckCol,
  setCallBackEvent,
  addEnumCol,
  addTextRelWidthEditCol,
} from "../../utils/sheetUtil";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: () => void;
  approvalLineData: any; //데이터 정의하기
};

function ApprovalSheet2({ sheetCallBack, setData, approvalLineData }: props) {
  const { t } = useTranslation();
  const addUser = () => {
    setData();
  };

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    //인덱스 고민
    initDef.options.Cfg = { ...initDef.options.Cfg, ZIndex: 2000 };

    initDef.options.Cols.push(
      addCheckCol(
        { Value: t("삭제"), Align: "Center", Icon: "Check", HeaderCheck: 1 },
        "org_cd2"
      )
    );

    initDef.options.Cols.push(
      //결재 합의경우 공통코드 적용시 체크
      addEnumCol(t("승인상태"), "cd", "|결재|합의", "|100|200")
    );

    initDef.options.Cols.push(
      addTextRelWidthEditCol(t("사원정보"), "cd_nm", false)
    );

    initDef.options.Events = setCallBackEvent((evt) => sheetCallBack(evt));

    initDef.data = approvalLineData.approval;
    console.log("ApprovalSheet2 : ", initDef);
    return initDef;
  };

  const initDef = initOption();

  return (
    <div style={{ flex: "1", margin: "1em" }}>
      <div style={{ display: "flex", margin: "1em" }}>
        <div>{t("결재자")}</div>
        <Button variant="contained" size="medium" onClick={addUser}>
          {t("항목에 추가")}
        </Button>
      </div>

      <CommSheet sheetDef={initDef} />
    </div>
  );
}

export default React.memo(ApprovalSheet2);
