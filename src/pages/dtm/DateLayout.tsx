import React from "react";
import SelectComboField from "../../component/SelectComboField";
import DateField from "../../component/DateField";
import TextField from "@mui/material/TextField";
import CommonConstants from "./../../constants/CommonConstants";
import { getToday } from "./../../utils/dateUtils";

function DateLayout() {
  return (
    <div style={{ padding: "1em", display: "flex", width: "100%" }}>
      <div>
        <SelectComboField
          labelText="연차유형"
          fieldId={"applyStateCode"}
          url="/data/workKindCode2.json"
          method={CommonConstants.REQUEST_METHOD_GET}
        />{" "}
      </div>
      <div>
        {" "}
        <DateField label="시작일" initDate={getToday()} />
      </div>
      <div>
        {" "}
        <DateField label="종료일" initDate={getToday()} />
      </div>

      <div>
        <TextField label="사유" size="small" sx={{ width: 1 }}></TextField>
      </div>
    </div>
  );
}

export default React.memo(DateLayout);
