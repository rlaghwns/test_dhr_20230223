import TextField from "@mui/material/TextField";
import { CalendarPickerView } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import React from "react";
import { getToday } from "../utils/dateUtils";

type props = {
  label?: string;
  initDate?: string;
  viewType?: CalendarPickerView[];
  inputFormat?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const DateField = ({
  label,
  initDate,
  viewType,
  inputFormat,
  inputRef,
}: props) => {
  const [dateText, setDateText] = React.useState<Dayjs | null>(dayjs(initDate));

  if (inputFormat === "YYYY.MM.DD") {
    viewType = ["year", "month", "day"];
  } else if (inputFormat === "YYYY.MM") {
    viewType = ["year", "month"];
  } else if (inputFormat === "YYYY") {
    viewType = ["year"];
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"KO"}>
        <DatePicker
          views={viewType}
          inputRef={inputRef}
          inputFormat={inputFormat}
          label={label}
          value={dateText}
          onChange={(newValue) => {
            setDateText(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

DateField.defaultProps = {
  initDate: getToday(0),
  inputFormat: "YYYY.MM.DD",
  viewType: ["year", "month", "day"],
};

export default DateField;
