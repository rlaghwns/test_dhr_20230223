import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type props = {
  isLoading: boolean;
};

/**
 * 화면 비동기 동기 통신시 사용할 로딩 컴포넌트
 * @argument isLoading - 로딩 표현 여부 (true / false)
 */
function Loading({ isLoading }: props) {
  const { t } = useTranslation();

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "40%",
          }}
        >
          <img
            style={{
              width: "400px",
              height: "300px",
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
          <div>로딩중....</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(Loading);
