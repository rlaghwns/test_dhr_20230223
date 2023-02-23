import React from "react";
import CommSheet from "../../component/CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addSeq,
  addTextRelWidthCol,
  setCallNDbClickEvent,
} from "./../../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
};

function DtmApplySheet({ sheetCallBack, setData }: props) {
  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addTextRelWidthCol("사번", "emp_no"));
    initDef.options.Cols.push(addTextRelWidthCol("성명", "emp_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("근태종류", "org_cd2"));
    initDef.options.Cols.push(addTextRelWidthCol("상세보기", "org_cd3"));
    initDef.options.Cols.push(addTextRelWidthCol("신청서상태코드", "org_cd4"));
    initDef.options.Cols.push(addTextRelWidthCol("신청일자", "appl_ymd"));
    initDef.options.Cols.push(addTextRelWidthCol("시작일", "sta_ymd"));
    initDef.options.Cols.push(addTextRelWidthCol("종료일", "end_ymd"));
    initDef.options.Cols.push(addTextRelWidthCol("비고", "detail"));

    initDef.options.Events = setCallNDbClickEvent(
      (evt) => sheetCallBack(evt),
      (data) => setData(data)
    );

    console.log("DtmListSheet : ", initDef);
    return initDef;
  };

  const initDef = initOption();

  return (
    <div style={{ flex: "1" }}>
      <CommSheet sheetDef={initDef} />
    </div>
  );
}

export default React.memo(DtmApplySheet);
