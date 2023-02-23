import React from "react";
import { useTranslation } from "react-i18next";

function PageTemp() {
  const { t } = useTranslation();
  return <div>test</div>;
}

export default React.memo(PageTemp);
