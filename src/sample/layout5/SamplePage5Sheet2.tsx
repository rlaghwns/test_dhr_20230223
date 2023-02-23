import React from "react";
import { useTranslation } from "react-i18next";
import CommSheet from "../../component/CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addCheckCol,
  addDelCol,
  addEnumCol,
  addSeq,
  addStatusCol,
  addTextCol,
  addTextRelWidthCol,
  getCodeString,
  setCallBackEvent,
} from "../../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  code: any;
};

function SamplePage5Sheet2({ sheetCallBack, code }: props) {
  console.log("code : ", code);

  const { t } = useTranslation();

  const code1 = getCodeString(code);

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addStatusCol());
    initDef.options.Cols.push(addDelCol());

    initDef.options.Cols.push(addTextRelWidthCol("사번", "emp_no5"));
    initDef.options.Cols.push(addTextRelWidthCol("성명", "emp_no6"));

    initDef.options.Events = setCallBackEvent((evt) => sheetCallBack(evt));

    console.log("DtmListSheet : ", initDef);
    return initDef;
  };

  const initDef = initOption();

  return (
    <div>
      <CommSheet sheetDef={initDef} />
    </div>
  );
}

export default React.memo(SamplePage5Sheet2);
