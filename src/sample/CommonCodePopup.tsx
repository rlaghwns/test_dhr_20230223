import React from "react";
import SearchCommonCodePopup from "../component/SearchCommonCodePopup";
import { Button } from "@mui/material";
import SearchCommonCode from "../component/SearchCommonCode";

import { useTranslation } from "react-i18next";

function CommonCodePopup() {
  const { t } = useTranslation();

  const [openPopup, setOpenPopup] = React.useState(false);

  const commonData = (code: string, name: string) => {
    console.log("main code", code);
    console.log("main name", name);
  };

  const open = () => {
    setOpenPopup(true);
  };
  const onClose = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      {/* import { Button } from "@mui/material"; */}
      {/* 버튼을 이용한 팝업 활용*/}
      <div>
        <div>
          3. 버튼을 이용한 팝업 활용
          <Button variant="contained" size="medium" onClick={open}>
            {t("공통 팝업")}
          </Button>
        </div>
        <SearchCommonCodePopup
          open={openPopup}
          onClose={onClose}
          callBackCommonCodeData={commonData}
        />
      </div>

      <div>
        4. 기본제공되는 input 공통 팝업 컴포넌트
        <SearchCommonCode callBackCommonCodeData={commonData} />
      </div>
    </div>
  );
}
export default React.memo(CommonCodePopup);
