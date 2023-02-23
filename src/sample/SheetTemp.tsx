import React from "react";
import CommSheet from "../component/CommSheet";
import IBGridConfig from "../utils/IBSheetConfig";
import {
  addSeq,
  addTextRelWidthCol,
  setCallNDbClickEvent,
} from "../utils/sheetUtil";
import CommonCodePopup from "./CommonCodePopup";
import { useTranslation } from "react-i18next";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
};

function SheetTemp({ sheetCallBack, setData }: props) {
  const { t } = useTranslation();

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addTextRelWidthCol("사번", "emp_no"));

    initDef.options.Events = setCallNDbClickEvent(
      (evt) => sheetCallBack(evt),
      (data) => setData(data)
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

export default React.memo(SheetTemp);
