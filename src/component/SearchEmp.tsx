import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import SearchEmpPopup from "./SearchEmpPopup";

type props = {
  callBackData: (code: string, name: string) => void;
  isUser?: boolean;
};

const SearchEmp = ({ callBackData, isUser = false }: props) => {
  const empNumberTextRef = useRef<HTMLInputElement>(null);
  const empNameTextRef = useRef<HTMLInputElement>(null);

  const searchTextRef = useRef<HTMLInputElement>(null);

  const [empNumberText, setEmpNumberText] = React.useState("");
  const [empNameText, setEmpNameText] = React.useState("");

  const [open, setOpen] = React.useState(false);

  //시트
  const setData = (code: string, name: string) => {
    setEmpNumberText(code);
    setEmpNameText(name);
    callBackData(code, name);
  };

  const handleModelOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setOpen(true);
    }
  };
  const handleChange = (evt: any) => {
    console.log("handleChange : ", evt.target.value);
    setEmpNumberText(evt.target.value);
  };

  return (
    <div>
      <TextField
        inputRef={empNumberTextRef}
        label="사번"
        required
        size="small"
        sx={{ width: 1 / 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                aria-label="search"
                onClick={handleModelOpen()}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <TextField
        inputRef={empNameTextRef}
        disabled
        label="성명"
        size="small"
        sx={{ width: 1 / 2 }}
        value={empNameText}
      />

      <SearchEmpPopup
        open={open}
        onClose={handleClose}
        callBackData={setData}
        inputTitle={empNumberText}
        isUser={isUser}
      />
    </div>
  );
};
export default React.memo(SearchEmp);
