import React from "react";
import { useTranslation } from "react-i18next";
import CommSheet from "../../component/CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addCheckCol,
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

function SamplePageSheet2({ sheetCallBack, setOnClick }: props) {
  const { t } = useTranslation();

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(addStatusCol());
    initDef.options.Cols.push(addDelCol());
    initDef.options.Cols.push(addIntCol("조직코드", "emp_no2", true));
    initDef.options.Cols.push(addTextRelWidthCol("조직명", "emp_no3", true));

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

export default React.memo(SamplePageSheet2);
