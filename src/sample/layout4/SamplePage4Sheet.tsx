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

function SamplePage4Sheet({ sheetCallBack, code }: props) {
  console.log("code : ", code);

  const { t } = useTranslation();

  const code1 = getCodeString(code);

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addStatusCol());
    initDef.options.Cols.push(addDelCol());

    initDef.options.Cols.push(
      addEnumCol("지급항목", "emp_no5", code1.enumStr, code1.keyStr, true)
    );
    initDef.options.Cols.push(
      addEnumCol(
        "고정변동구분",
        "emp_no6",
        "|고정|변동|공통",
        "|100|200|300",
        true
      )
    );
    initDef.options.Cols.push(addTextRelWidthCol("제조계정", "emp_no7"));
    initDef.options.Cols.push(addTextRelWidthCol("제조계정명", "emp_no8"));
    initDef.options.Cols.push(addTextRelWidthCol("판관계정", "emp_no9"));

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

export default React.memo(SamplePage4Sheet);
