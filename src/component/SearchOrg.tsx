import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import SearchOrgPopup from "./SearchOrgPopup";

type props = {
  dateText?: string;
  callBackData: (code: string, name: string) => void;
};

const SearchOrg = ({ dateText, callBackData }: props) => {
  const orgNumberTextRef = useRef<HTMLInputElement>(null);
  const orgNameTextRef = useRef<HTMLInputElement>(null);

  const [orgNumberText, setOrgNumberText] = React.useState("");
  const [orgNameText, setOrgNameText] = React.useState("");

  const [open, setOpen] = React.useState(false);

  //시트
  const setData = (code: string, name: string) => {
    setOrgNumberText(code);
    setOrgNameText(name);
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
    setOrgNumberText(evt.target.value);
  };

  return (
    <div>
      <TextField
        inputRef={orgNumberTextRef}
        id="orgSearchTextField"
        label="부서"
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
        value={orgNumberText}
      />
      <TextField
        inputRef={orgNameTextRef}
        disabled
        label="부서명"
        size="small"
        sx={{ width: 1 / 2 }}
        value={orgNameText}
      />

      <SearchOrgPopup
        open={open}
        onClose={handleClose}
        callBackData={setData}
        defaultValue={orgNumberText}
      />
    </div>
  );
};
export default React.memo(SearchOrg);
