import React from "react";
import { useTranslation } from "react-i18next";
import CommSheet from "../../component/CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addDelCol,
  addIntCol,
  addSeq,
  addStatusCol,
  addTextCol,
  addTextRelWidthCol,
  setCallNClickEvent,
} from "../../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  setOnClick: (data: any) => void;
};

function SamplePageSheet1({ sheetCallBack, setOnClick }: props) {
  const { t } = useTranslation();

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addStatusCol());
    initDef.options.Cols.push(addDelCol());
    initDef.options.Cols.push(addIntCol("사업자코드", "emp_no2", true));
    initDef.options.Cols.push(addTextCol("사업장명", "emp_no3", true));
    initDef.options.Cols.push(addIntCol("사업장번호", "emp_no4", true));
    initDef.options.Cols.push(addIntCol("법인번호", "emp_no5", true));
    initDef.options.Cols.push(addTextRelWidthCol("법인명", "emp_no6", true));
    initDef.options.Cols.push(addTextRelWidthCol("세무코드", "emp_no7", true));
    initDef.options.Cols.push(addTextRelWidthCol("대표명", "emp_no8", true));
    initDef.options.Cols.push(
      addTextRelWidthCol("대표주민번호", "emp_no9", true)
    );

    initDef.options.Events = setCallNClickEvent(
      (evt) => sheetCallBack(evt),
      (data) => setOnClick(data)
    );

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

export default React.memo(SamplePageSheet1);
