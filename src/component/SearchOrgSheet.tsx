import React from "react";
import IBGridConfig from "../utils/IBSheetConfig";
import CommSheet from "./CommSheet";
import {
  addSeq,
  addTextRelWidthCol,
  setCallNDbClickEvent,
} from "./../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
};

const SearchOrgSheet = ({ sheetCallBack, setData }: props) => {
  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();
    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addTextRelWidthCol("소속코드", "org_cd"));
    initDef.options.Cols.push(addTextRelWidthCol("부서", "org_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("본부", "parent_org_nm"));
    initDef.options.Cols.push(addTextRelWidthCol("그룹", "test5"));

    initDef.options.Events = setCallNDbClickEvent(
      (evt) => sheetCallBack(evt),
      (data) => setData(data)
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

export default React.memo(SearchOrgSheet);
