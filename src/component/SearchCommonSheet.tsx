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
    initDef.options.Cols.push(addTextRelWidthCol("코드", "cd_id"));
    initDef.options.Cols.push(addTextRelWidthCol("코드명", "cd_nm"));

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
