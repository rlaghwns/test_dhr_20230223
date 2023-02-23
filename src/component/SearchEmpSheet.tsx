import React from "react";
import IBGridConfig from "../utils/IBSheetConfig";
import CommSheet from "./CommSheet";
import {
  addSeq,
  addTextRelWidthCol,
  setCallNDbClickEvent,
} from "../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (row: any) => void;
};

const SearchEmpSheet = ({ sheetCallBack, setData }: props) => {
  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addTextRelWidthCol("사번", "emp_no"));
    initDef.options.Cols.push(addTextRelWidthCol("성명", "emp_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("부서", "org_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("직급", "pos_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("직책코드", "org_id"));
    initDef.options.Cols.push(
      addTextRelWidthCol("재직상태", "emp_kind_pos_nm")
    );

    initDef.options.Events = setCallNDbClickEvent(
      (evt) => sheetCallBack(evt),
      (row) => setData(row)
    );

    console.log("initDef : ", initDef);
    return initDef;
  };

  return (
    <div>
      <div>
        <CommSheet sheetDef={initOption()} />
      </div>
    </div>
  );
};

export default React.memo(SearchEmpSheet);
