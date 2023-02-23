import CommonConstants from "../constants/CommonConstants";
import { isEmpty } from "./common";

/**
 * IBSheet(IBGrid)의 Option을 공통화하기 위하여 사용한다.
 */
export default class IBGridConfig {
  static getInitDef<T>(
    canEdit: boolean = false,
    col: T[] = [],
    leftCols: T[] = [],
    rightCols: T[] = []
  ) {
    const initDef: any = {
      options: {
        Def: {
          Col: { RelWidth: "0", CanEdit: canEdit },
          Row: {
            OnChange: (handler: any) => {
              //해당 함수 보안 필요

              const { sheet, row, col, event } = handler;
              // console.log("sheet : ", sheet);
              // console.log("row : ", row);
              // console.log("col : ", col);
              // console.log("event : ", event);

              const sheetStatus = CommonConstants.SHEET_COL_STATUS;
              const sheetDelBtn = CommonConstants.SHEET_COL_DEL_BTN;

              if (col === sheetDelBtn) {
                //삭제이면
                // console.log("delCheck : ", row.sheetDelBtn);
                if (row.sheetDelBtn === 1) {
                  //삭제 체크
                  // console.log("delCheck : true");
                  sheet.setValue(row, sheetStatus, "삭제");
                  sheet.deleteRow(row, 1);
                } else {
                  //삭제 해제
                  // console.log("delCheck : false");
                  if (row.Added === 1) {
                    sheet.setValue(row, sheetStatus, "추가");
                  } else {
                    sheet.setValue(row, sheetStatus, "");
                  }
                  sheet.deleteRow(row, 0);
                }
              } else if (row.sheetDelBtn !== 1) {
                //추가 및 수정
                // console.log("Added : ", row.Added);
                if (row.Added !== 1) {
                  //추가가 아닐때만 진입
                  // console.log("row.Deleted ", row.Deleted);
                  if (row.Deleted === false || isEmpty(row.Deleted)) {
                    // console.log("Deleted : Deleted");
                    sheet.setValue(row, sheetStatus, "수정");
                  }
                }
              }
            },
          },
        },
        Cfg: {
          Export: { Url: "/ibsheet/plugins/ibsheet-excel.js" },
          SearchMode: 0,
          DataMerge: 0,
          HeaderMerge: 3,
          SectionCanResize: 1,
        },
        //틀고정 좌측 컬럼 설정
        LeftCols: leftCols,
        //중앙(메인) 컬럼 설정
        Cols: col,
        //틀고정 우측 컬럼 설정
        RightCols: rightCols,
        Events: {},
      },
    };

    return initDef;
  }

  static getInitDefTest<T>() {
    const initDef: any = {
      options: {
        Def: {
          Header: {},
          Col: {
            Spanned: 1,
            SuggestType: "Search,Empty,Start,IgnoreSpace",
          },
          Spacer: {
            CanFocus: 0,
            Width: 5,
          },
          Row: {
            CanFormula: true,
            CalcOrder:
              "sTeamSuggest,sPosEnum,sPosEnumKeys,sTeamColor,sPosColor",
          },
        },
        Cfg: {
          SearchMode: 0,
          MaxPages: 3,
          SuppressMessage: 3,
        },
        LeftCols: [{ Type: "Int", Width: 50, Align: "Center", Name: "SEQ" }],
        Cols: [
          {
            Header: {
              Value: "임원",
              Align: "Center",
              Icon: "Check",
              HeaderCheck: 1,
            },
            Type: "Bool",
            Name: "Chk",
          },
          {
            Header: "부서명",
            Type: "Text",
            Name: "sDept",
            Width: "130",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
            Suggest:
              "|CEO|SI사업부|인사부|솔루션사업부|영업팀|기술연구소|경영지원팀",
          },
          {
            Header: "팀명",
            Type: "Text",
            Name: "sTeam",
            Width: "110",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
            // ColorFormula: changeColorFormula,
            // SuggestFormula: suggestFormula,
          },
          {
            Header: "직급",
            Type: "Enum",
            Name: "sPos",
            Width: "95",
            Align: "Center",
            // ColorFormula: changeColorFormula,
            CanEdit: 1,
            RawSort: 1,
            Enum: "|대표이사|이사|상무|소장|차장|부장|과장|대리|사원",
            EnumKeys: "|01A|02A|03A|04A|04B|05B|06B|07B|08B|09B",
            // EnumFormula: enumFormula,
            // EnumKeysFormula: enumKeysFormula,
          },
          {
            Header: "성명",
            Type: "Text",
            Name: "sName",
            MinWidth: "100",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
          },
          {
            Header: "성별",
            Type: "Enum",
            Name: "sSex",
            Width: "70",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
            Enum: "|남자|여자",
            EnumKeys: "|男|女",
          },
          {
            Header: "연령대",
            Type: "Text",
            Name: "sAge2",
            Width: "70",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
            Suggest: "|10대|20대|30대|40대|50대|60대 이상",
          },
          {
            Header: "거주지",
            Type: "Text",
            Name: "sAddr1",
            Width: "80",
            Align: "Center",
            CanEdit: 1,
            RawSort: 1,
            Suggest: "|서울|경기|강원",
          },
          {
            Header: "나이",
            Type: "Int",
            Name: "sAge",
            Width: "65",
            Align: "Right",
            CanEdit: 1,
            RawSort: 1,
            Format: "#0세",
            Visible: 0,
          },
          {
            Header: "근속기간",
            Type: "Int",
            Name: "sYearOfService",
            Width: "85",
            Align: "Right",
            CanEdit: 1,
            RawSort: 1,
            Format: "#0년",
            Visible: 0,
          },
          {
            Header: "급여",
            Type: "Int",
            Name: "sSalary",
            Width: "100",
            Align: "Right",
            CanEdit: 1,
            RawSort: 1,
            Format: "#,##0원",
            Visible: 0,
          },
          {
            Header: "상여",
            Type: "Int",
            Name: "sBonus",
            Width: "100",
            Align: "Right",
            CanEdit: 1,
            RawSort: 1,
            Format: "#,##0원",
            Visible: 0,
          },
          {
            Header: "도로명 주소",
            Type: "Text",
            Name: "sAddr",
            MinWidth: 250,
            CanEdit: 1,
            RelWidth: 1,
            SuggestDelay: 500,
            Enum: "",
            EnumKeys: "",
            EditEnum: "",
            EmptyValue:
              "<span style='color:#AAA'>도로명 주소를 입력해주세요 (ex : 서울시 OO구 OO로)</span>",
          },
        ],
      },
      data: [
        {
          Chk: "1",
          sDept: "CEO",
          sTeam: "임원",
          sPos: "대표이사",
          sName: "황정열",
          sSex: "男",
          sAge2: "50대",
          sAddr1: "서울",
          sAge: 50,
          sYearOfService: 15,
          sSalary: 10122200,
          sBonus: 1012220,
        },
        {
          Chk: "1",
          sDept: "SI사업부",
          sTeam: "임원",
          sPos: "상무",
          sName: "강대호",
          sSex: "男",
          sAge2: "40대",
          sAddr1: "경기",
          sAge: 47,
          sYearOfService: 15,
          sSalary: 6756170,
          sBonus: 675617,
        },
        {
          Chk: "0",
          sDept: "SI사업부",
          sTeam: "개발2팀",
          sPos: "부장",
          sName: "김미경",
          sSex: "女",
          sAge2: "30대",
          sAddr1: "강원",
          sAge: 39,
          sYearOfService: 12,
          sSalary: 4180950,
          sBonus: 418095,
        },
      ],
    };

    return initDef;
  }
}
