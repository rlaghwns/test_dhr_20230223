import { toast } from "react-toastify";
import CommonConstants from "../constants/CommonConstants";

/**
 * 컬럼 값 추가 함수
 * @param {string} Header
 * @param {string} Name
 * @param {string} Type
 * @param {boolean} isRelWidth
 */
export type addCol = {
  Header: string;
  Name: string;
  Type: string;
  isRelWidth?: boolean;
};

export type addMergeCol = {
  Header: string[];
  Name: string;
  Type: string;
  isRelWidth?: boolean;
};

export const addCols = (col: addCol) => {
  return {
    Header: col.Header,
    Name: col.Name,
    Type: col.Type,
    RelWidth: col.isRelWidth,
    Width: 100,
  };
};
export const addMergeCols = (col: addMergeCol) => {
  return {
    Header: col.Header,
    Name: col.Name,
    Type: col.Type,
    RelWidth: col.isRelWidth,
    Width: 100,
  };
};

export const addSeq = () => {
  return {
    Header: "No",
    Name: "SEQ",
    Type: "Int",
    Width: 50,
  };
};

/**
 * 상태 컬럼 생성
 */
export const addStatusCol = (colHeaderText: string = "상태") => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: CommonConstants.SHEET_COL_STATUS,
    Width: 100,
    Align: "center",
  }; // type은 text로 강제 설정

  return colDef;
};

/**
 * 삭제 체크 컬럼 생성
 */
export const addDelCol = (colHeaderText: string = "삭제") => {
  let colDef = {
    Type: "Bool",
    Header: {
      Value: colHeaderText,
      Align: "Center",
      Icon: "Check",
      HeaderCheck: 1,
    },
    Name: CommonConstants.SHEET_COL_DEL_BTN,
    Width: 100,
    Align: "center",
  };

  return colDef;
};

export const addSeqs = (count: number) => {
  let header: string[] = [];

  for (let i = 0; i < count; i++) {
    header.push("No");
  }
  return {
    Header: header,
    Name: "SEQ",
    Type: "Int",
    Width: 50,
  };
};

export const addTextCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    Align: colAlign,
    RelWidth: colRelWidth,
    Required: required,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addTextMergeCol = (
  colHeaderText: string[],
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    RelWidth: colRelWidth,
    Align: colAlign,
    Required: required,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addTextOneMergeCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Text",
    Header: [colHeaderText, colHeaderText],
    Name: colName,
    Width: colWidth,
    RelWidth: colRelWidth,
    Align: colAlign,
    Required: required,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addTextBtnCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    RelWidth: colRelWidth,
    Align: colAlign,
    Required: required,
    Button: "Button",
    ButtonText: "검색",
    WidthPad: 50,
  }; // type은 text로 강제 설정

  return colDef;
};
export const addTextOneMergeBtnCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Text",
    Header: [colHeaderText, colHeaderText],
    Name: colName,
    Width: colWidth,
    RelWidth: colRelWidth,
    Align: colAlign,
    Required: required,
    Button: "Button",
    ButtonText: "검색",
    WidthPad: 50,
  }; // type은 text로 강제 설정

  return colDef;
};

/**
 *
 * @param colHeaderText : 컬럼에 표현되는 이름
 * @param colName : 컬럼 매칭 id값
 * @param colWidth
 * @param colAlign
 * @returns
 */
export const addTextRelWidthCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left"
) => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    RelWidth: true,
    Align: colAlign,
    Required: required,
  }; // type은 text로 강제 설정

  return colDef;
};

/**
 *
 * @param colHeaderText : 컬럼에 표현되는 이름
 * @param colName : 컬럼 매칭 id값
 * @param colWidth
 * @param colAlign
 * @returns
 */
export const addTextRelWidthEditCol = (
  colHeaderText: string,
  colName: string,
  colEdit: boolean = true,
  colWidth: number = 100,
  colAlign: string = "left"
) => {
  let colDef = {
    Type: "Text",
    Header: colHeaderText,
    Name: colName,
    CanEdit: colEdit,
    Width: colWidth,
    RelWidth: true,
    Align: colAlign,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addDummyCol = () => {
  // Sheet의 마지막 칼럼 설정
  let colDef = {
    Type: "Text",
    Header: " ", // 스페이스 1칸 강제
    Name: "dummyColumn",
    RelWidth: "1", // 넓이를 시트에 맞춰 채운다.
  };
  return colDef;
};

export const addIntCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  format: string = "# \\",
  colWidth: number = 100,
  colAlign: string = "left",
  colRelWidth: boolean = false
) => {
  let colDef = {
    Type: "Int",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    Align: colAlign,
    RelWidth: colRelWidth,
    Required: required,
    Format: format,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addIntRelWidthCol = (
  colHeaderText: string,
  colName: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "left"
) => {
  let colDef = {
    Type: "Int",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    RelWidth: true,
    Align: colAlign,
    Required: required,
  }; // type은 text로 강제 설정

  return colDef;
};

export const addDateCol = (
  colHeaderText: any,
  colName: string,
  colWidth: number = 100,
  colFormat: string = "yyyy-MM-dd",
  colDataFormat: string = "yyyyMMdd",
  colEditFormat: string = "yyyyMMdd",
  colAlign: string = "center"
) => {
  let colDef = {
    Type: "Date",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    Format: colFormat,
    DataFormat: colDataFormat,
    EditFormat: colEditFormat,
    Align: colAlign,
  };

  return colDef;
};

export const addCheckCol = (
  colHeaderText: any,
  colName: string,
  colEdit: boolean = true,
  colWidth: number = 100,
  colAlign: string = "center"
) => {
  let colDef = {
    Type: "Bool",
    Header: colHeaderText,
    Name: colName,
    Width: colWidth,
    Align: colAlign,
    CanEdit: colEdit,
  };

  return colDef;
};

export const addEnumCol = (
  colHeaderText: string,
  colName: string,
  colEnum: string,
  colEnumKeys: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "center"
) => {
  let colDef = {
    Type: "Enum",
    Header: colHeaderText,
    Name: colName,
    Enum: colEnum,
    EnumKeys: colEnumKeys,
    Width: colWidth,
    Align: colAlign,
    Required: required,
  };

  return colDef;
};

export const addEnumRelWidthCol = (
  colHeaderText: string,
  colName: string,
  colEnum: string,
  colEnumKeys: string,
  required: boolean = false,
  colWidth: number = 100,
  colAlign: string = "center"
) => {
  let colDef = {
    Type: "Enum",
    Header: colHeaderText,
    Name: colName,
    Enum: colEnum,
    EnumKeys: colEnumKeys,
    Width: colWidth,
    Align: colAlign,
    Required: required,
    RelWidth: true,
  };

  return colDef;
};

export const addEnumMergeCol = (
  colHeaderText: string[],
  colName: string,
  colEnum: string,
  colEnumKeys: string,
  colWidth: number = 100,
  colAlign: string = "center"
) => {
  let colDef = {
    Type: "Enum",
    Header: colHeaderText,
    Name: colName,
    Enum: colEnum,
    EnumKeys: colEnumKeys,
    Width: colWidth,
    Align: colAlign,
  };

  return colDef;
};
export const addStatusRow = (sheet: any) => {
  sheet.addRow({ init: { sheetStatus: "추가" } });
};

export const setCallBackEvent = (callbackEvent: (evt: any) => void) => {
  return {
    onRenderFirstFinish: (evt: any) => callbackEvent(evt),
  };
};

export const setCallNClickEvent = (
  callbackEvent: (evt: any) => void,
  setOnClick: (evt: any) => void
) => {
  return {
    onRenderFirstFinish: (evt: any) => callbackEvent(evt),
    onClick: (evt: any) => setOnClick(evt),
  };
};
export const setCallNDbClickEvent = (
  callbackEvent: (evt: any) => void,
  setOnDblClick: (evt: any) => void
) => {
  return {
    onRenderFirstFinish: (evt: any) => callbackEvent(evt),
    onDblClick: (evt: any) => setOnDblClick(evt),
  };
};

type code = {
  keyStr: string;
  enumStr: string;
};

export const getCodeString = (value: any) => {
  console.log("getCodeString");
  let keyStr = "";
  let enumStr = "";

  if (value) {
    value.forEach((t: any) => {
      keyStr += "|" + t.cd;
      enumStr += "|" + t.cd_nm;
    });
  }

  const returnString: code = {
    keyStr: keyStr,
    enumStr: enumStr,
  };

  return returnString;
};

export const sheetSave = (pageSheet: any) => {
  // <ToastContainer /> 추가 선언
  if (Array.isArray(pageSheet)) {
    return pageSheet.some((sheet: any) => {
      const isError = checkSheet(sheet);
      console.log("isError : ", isError);
      return isError;
    });
  } else {
    return checkSheet(pageSheet);
  }
};

export const checkSheet = (pageSheet: any) => {
  console.log("save : ", pageSheet.getSaveJson());
  const { data, Code, row } = pageSheet.getSaveJson();
  // console.log("data : ", data.length);
  // console.log("Code : ", Code);
  // console.log("row : ", row);

  let isError = false;

  /** 필요성 고민
  if (Code === "IBS000") {
    //에러
    //처리대상이없음
    pageSheet.focus(row);
    toast.error("입력을 추가 해주세요.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
    isError = true;
  } else*/

  if (data.length == 0 || Code === "IBS010") {
    //에러
    //필수값에러
    pageSheet.focus(row);
    toast.error("Sheet 수정된 부분이 없습니다.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
    isError = true;
  } else {
    toast.success("저장되었습니다.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return isError;
};
