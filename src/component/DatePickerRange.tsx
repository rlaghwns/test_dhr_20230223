import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import React from "react";
import { getToday } from "../utils/dateUtils";

type props = {
  startRef?: any;
  endRef?: any;
  startLabel?: string;
  endLabel?: string;
  initDate?: string;
};

const DatePickerRange = ({
  startRef,
  endRef,
  startLabel,
  endLabel,
  initDate,
}: props) => {
  const [startDateText, setStartDateText] = React.useState<Dayjs | null>(
    dayjs(initDate)
  );
  const [endDateText, setEndDateText] = React.useState<Dayjs | null>(
    dayjs(initDate)
  );

  const [startPopup, setStartPopup] = React.useState(false);
  const [endPopup, setEndPopup] = React.useState(false);

  const startPopupOpen = () => {
    setStartPopup(true);
  };

  const endPopupOpen = () => {
    setEndPopup(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"KO"}>
        <DatePicker
          inputRef={startRef}
          open={startPopup}
          inputFormat={"YYYY.MM.DD"}
          label={startLabel}
          value={startDateText}
          onChange={(newValue) => {
            setStartDateText(newValue);
          }}
          onOpen={() => setStartPopup(true)}
          onClose={() => setStartPopup(false)}
          onError={() => {}}
          onAccept={() => {
            setEndPopup(true);
          }}
          renderInput={(params) => (
            <TextField {...params} onClick={startPopupOpen} />
          )}
        />
        <DatePicker
          inputRef={endRef}
          open={endPopup}
          inputFormat={"YYYY.MM.DD"}
          onOpen={() => setEndPopup(true)}
          onClose={() => setEndPopup(false)}
          label={endLabel}
          value={endDateText}
          onChange={(newValue) => {
            setEndDateText(newValue);
          }}
          onAccept={() => {}}
          renderInput={(params) => (
            <TextField {...params} onClick={endPopupOpen} />
          )}
          minDate={startDateText}
        />
      </LocalizationProvider>
    </div>
  );
};

DatePickerRange.defaultProps = {
  initDate: getToday(0),
  startLabel: "시작",
  endLabel: "종료",
};

export default DatePickerRange;
