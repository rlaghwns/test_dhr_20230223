import React, { useEffect } from "react";
import CommSheet from "../../component/CommSheet";
import { getCodeString } from "../../utils/common";
import IBGridConfig from "../../utils/IBSheetConfig";
import {
  addSeqs,
  addTextMergeCol,
  addMergeCols,
  addEnumMergeCol,
  addTextOneMergeCol,
  setCallNDbClickEvent,
  addDateCol,
  addCheckCol,
  addTextOneMergeBtnCol,
} from "./../../utils/sheetUtil";

type props = {
  sheetCallBack: (evt: any) => void;
  setData: (data: any) => void;
  code: any;
};

function DtmListSheet({ sheetCallBack, setData, code }: props) {
  console.log("code : ", code);

  const { work_kind_cd, work_cd, work_cd2 } = code;

  const code1 = getCodeString(work_kind_cd);
  const code2 = getCodeString(work_cd);
  const code3 = getCodeString(work_cd2);

  // console.log("work_kind_cd : ", getCodeString(work_kind_cd));
  // console.log("work_cd : ", work_cd);
  // console.log("work_cd2 : ", work_cd2);

  const initOption = () => {
    let initDef = IBGridConfig.getInitDef(true);

    initDef.options.LeftCols.push(addSeqs(2));

    initDef.options.LeftCols.push(addTextOneMergeCol("상태", "org_cd"));
    initDef.options.LeftCols.push(
      addMergeCols({ Header: ["삭제", "삭제"], Name: "org_nm", Type: "bool" })
    );
    initDef.options.LeftCols.push(addTextOneMergeCol("사번", "emp_no", true));
    // initDef.options.LeftCols.push(
    // addTextOneMergeBtnCol("성명", "emp_nm", true)
    // );
    initDef.options.LeftCols.push(addTextOneMergeCol("성명", "emp_nm", true));
    initDef.options.LeftCols.push(addTextOneMergeCol("부서", "org_nm"));
    initDef.options.LeftCols.push(addTextOneMergeCol("직급", "pos_nm"));
    initDef.options.LeftCols.push(addTextOneMergeCol("직책", "duty_nm"));
    // Button": "Button","ButtonText": "눌러"
    // onButtonClick:function (evtParam) {
    //   // Button 속성으로 만든 버튼이 눌려질때 발생합니다.
    //   document.getElementById('logs').value = (samplePageObj.externalFunction.count()) + '\t 이벤트 명 : ' + evtParam.eventName
    //   + '\t\t\t발생 위치 : ' + (evtParam.row.HasIndex ? evtParam.row.HasIndex + ' 행,' : evtParam.row.id + ' 행,') + (evtParam.col ? evtParam.col + ' 열\n' : '\n') + document.getElementById('logs').value;
    // },

    initDef.options.Cols.push(
      addEnumMergeCol(
        ["근태종류", "근태종류"],
        "work_nm",
        code1.enumStr,
        code1.keyStr
      )
    );

    initDef.options.Cols.push(addDateCol(["신청일자", "신청일자"], "appl_ymd"));
    initDef.options.Cols.push(addDateCol(["시작일", "시작일"], "sta_ymd"));
    initDef.options.Cols.push(addDateCol(["종료일", "종료일"], "end_ymd"));
    initDef.options.Cols.push(addCheckCol(["시작일", "시작일"], "org_cd5"));

    initDef.options.Cols.push(
      addEnumMergeCol(
        ["시작일반차", "시작일반차"],
        "org_cd6",
        code3.enumStr,
        code3.keyStr
      )
    );

    initDef.options.Cols.push(addCheckCol(["종료일", "종료일"], "org_cd7"));

    initDef.options.Cols.push(
      addEnumMergeCol(
        ["종료일반차", "종료일반차"],
        "org_cd8",
        code3.enumStr,
        code3.keyStr
      )
    );

    initDef.options.Cols.push(addTextOneMergeCol("사용일수", "org_cd9"));
    initDef.options.Cols.push(addTextOneMergeCol("연차일수", "org_cd10"));
    initDef.options.Cols.push(addTextOneMergeCol("변경사유", "org_cd11"));
    initDef.options.Cols.push(addTextOneMergeCol("신청서상태코드", "org_cd12"));
    initDef.options.Cols.push(addTextOneMergeCol("최종승인일자", "stat_nm"));
    initDef.options.Cols.push(
      addTextMergeCol(["최종결재자", "성명"], "org_cd14")
    );
    initDef.options.Cols.push(
      addTextMergeCol(["최종결재자", "직급"], "org_cd15")
    );
    initDef.options.Cols.push(addTextOneMergeCol("비고", "org_cd16"));

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
      <div>{code ? <CommSheet sheetDef={initDef} /> : <div>loading</div>}</div>
    </div>
  );
}

export default React.memo(DtmListSheet);
