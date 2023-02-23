import React from "react";
import CommSheet from "../CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addSeq,
  addTextCol,
  addTextRelWidthCol,
  setCallBackEvent,
} from "../../utils/sheetUtil";
import { useTranslation } from "react-i18next";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
};

function ApprovalSheet1({ sheetCallBack, setData }: props) {
  const { t } = useTranslation();

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addTextRelWidthCol(t("사번"), "emp_no"));
    initDef.options.Cols.push(addTextRelWidthCol(t("사원정보"), "emp_nm"));

    initDef.options.Events = setCallBackEvent((evt) => sheetCallBack(evt));

    console.log("ApprovalSheet1 : ", initDef);
    return initDef;
  };

  const initDef = initOption();
  console.log("ApprovalSheet1 :  return");
  return (
    <div style={{ flex: "1", margin: "1em" }}>
      <div>{t("사원조회")}</div>
      <CommSheet sheetDef={initDef} />
    </div>
  );
}

export default React.memo(ApprovalSheet1);
