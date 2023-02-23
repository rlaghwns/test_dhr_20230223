import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { selectComboBean } from "../api/data/bean";
import request from "../api/request";
import { isEmpty } from "../utils/common";

type props = {
  fieldId?: string;
  labelText?: string;
  url?: string;
  method?: string;
  param?: string;
  defaultCode?: selectComboBean;
  data?: selectComboBean[];
  defaultFirstItem?: selectComboBean;
  defaultValue?: number;
};

const SelectComboField = ({
  fieldId,
  labelText,
  url,
  method,
  param,
  defaultCode,
  data,
  defaultValue,
}: props) => {
  const [persons, setPersons] = useState<Array<selectComboBean>>([]);
  useEffect(() => {
    if (data) {
      //통신하지않고 기본 컴포넌트에 데이터 사용시
      let codeData = data as Array<selectComboBean>;
      if (defaultCode) {
        codeData.unshift(defaultCode);
      }
      setPersons(data as Array<selectComboBean>);
    } else {
      //통신 로직
      if (url) {
        request({
          url: url,
          method: method,
        })
          .then((res) => {
            let codeData = res.data.data.work_kind_cd;
            if (defaultCode) {
              codeData.unshift(defaultCode);
            }
            setPersons(res.data.data.work_kind_cd);
          })
          .catch((e) => {})
          .finally(() => {});
      } else {
        //디폴트 통신
        request({
          url: "/data/workKindCode2.json",
          method: method,
        })
          .then((res) => {
            let codeData = res.data.data.work_kind_cd;
            if (defaultCode) {
              codeData.unshift(defaultCode);
            }
            setPersons(res.data.data.work_kind_cd);
          })
          .catch((e) => {})
          .finally(() => {});
      }
    }
  }, [data]);

  // console.log("data", data);
  // console.log("persons", persons);

  return (
    <div>
      <TextField
        id={fieldId}
        label={labelText}
        select
        size="small"
        defaultValue={defaultValue}
        sx={{ width: 180 }}
      >
        {persons.map((it) => (
          <MenuItem key={it.cd_id} value={it.cd_id}>
            {it.cd_nm}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

/**
 * 통신을 통한 Select Conpoent
 * @param {string} fieldId            : id
 * @param {string} labelText          : label 타이틀
 * @param {string} url                : 통신 url
 * @param {string} method             : 통신 메서드(post,get,put)
 * @param {string} param              : 통신시 전달해야되는 값 ex) {id:"test", pwd:"123"}
 * @param {string} data               : url 통신이 아닐 경우 사용할 데이터 ex) [{cd_id:"test", cd_nm:"name"}]
 * @param {number} defaultValue       : 최상단에 설정값 예제로는 0값을 전달 ex) {cd_id:"0", cd_nm:"전체"}
 */
export default React.memo(SelectComboField);
