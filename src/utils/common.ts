/**
 * 공백 및 null 체크하는 함수
 * @param {any} value
 * @returns {boolean} 공백시 true / 아니면 false
 */
export const isEmpty = (value: any) => {
  // 넘어온 값이 빈값인지 체크합니다.
  // !value 하면 생기는 논리적 오류를 제거하기 위해
  // 명시적으로 value == 사용
  // [], {} 도 빈값으로 처리
  if (
    value === "" ||
    value === undefined ||
    value == null ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
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
