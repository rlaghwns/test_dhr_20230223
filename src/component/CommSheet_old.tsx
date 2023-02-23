import React, { useEffect } from "react";
import loader from "@ibsheet/loader";

const CommSheet = ({ sheetDef }: any) => {
  const gridId: string = "sheet_" + Math.random().toString(36).substring(2, 7);
  // const gridId: string = generateRandomString(10);
  console.log("gridId", gridId);
  useEffect(() => {
    let sheetId: string = "";
    const { data, options } = sheetDef;
    loader
      .createSheet({
        el: gridId,
        options,
        data,
      })
      .then((sheet) => {
        // 주의: 해당 구간에서 데이터 조회를 하면 안됩니다. 데이터 조회는 onRenderFirstFinish 이벤트에서 실행해야합니다.
        sheetId = sheet.id;
        console.log("gridId##################", gridId);
        console.log("sheetId@@@@@@@@@@@@@@@@@@", sheetId);
      });

    return () => {
      loader.removeSheet(sheetId);
    };
  });
  console.log("return@@@@@@@@");
  return <div id={gridId}></div>;
};

export default React.memo(CommSheet);
