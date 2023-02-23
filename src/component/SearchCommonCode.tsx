import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import SearchCommonCodePopup from "./SearchCommonCodePopup";

type props = {
  inputTitle?: string;
  url?: string;
  callBackCommonCodeData: (code: string, name: string) => void;
};

const SearchCommonCode = ({
  inputTitle,
  url,
  callBackCommonCodeData,
}: props) => {
  const { t } = useTranslation();

  const numberTextRef = useRef<HTMLInputElement>(null);
  const nameTextRef = useRef<HTMLInputElement>(null);

  const [numberText, setNumberText] = React.useState("");
  const [nameText, setNameText] = React.useState("");

  const [open, setOpen] = React.useState(false);

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
    setNumberText(evt.target.value);
  };

  const setData = (code: string, name: string) => {
    setNumberText(code);
    setNameText(name);
    callBackCommonCodeData(code, name);
  };

  return (
    <div>
      <TextField
        inputRef={numberTextRef}
        label={t(inputTitle as string)}
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
        value={numberText}
      />
      <TextField
        inputRef={nameTextRef}
        disabled
        label={t(inputTitle as string)}
        size="small"
        sx={{ width: 1 / 2 }}
        value={nameText}
      />

      <SearchCommonCodePopup
        open={open}
        url={url}
        onClose={handleClose}
        callBackCommonCodeData={setData}
        defaultValue={numberText}
      />
    </div>
  );
};

SearchCommonCode.defaultProps = {
  inputTitle: "공통코드",
};

export default React.memo(SearchCommonCode);
