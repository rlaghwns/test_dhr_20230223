import React from "react";
import { useTranslation } from "react-i18next";
import CommSheet from "../../component/CommSheet";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addCheckCol,
  addSeq,
  addTextRelWidthCol,
  setCallBackEvent,
  setCallNClickEvent,
} from "../../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
};

function SamplePageSheet1({ sheetCallBack }: props) {
  const { t } = useTranslation();

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef();

    initDef.options.Cols.push(addSeq());
    initDef.options.Cols.push(
      addCheckCol(
        { Value: t("선택"), Align: "Center", Icon: "Check", HeaderCheck: 1 },
        "org_cd2"
      )
    );
    initDef.options.Cols.push(addTextRelWidthCol("서비스명", "emp_no2"));
    initDef.options.Cols.push(addTextRelWidthCol("커맨드클래스명", "emp_no3"));
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

export default React.memo(SamplePageSheet1);
