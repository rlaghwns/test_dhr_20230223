import React from "react";

function Main2() {
  const setData = (data: any) => {
    console.log("setData", data);
    console.log("org_cd", data.row.org_cd);
    console.log("org_name", data.row.org_nm);
  };

  const setPageSheet = (evt: any) => {
    // pageSheet = evt.sheet;
  };
  const orgData = (code: string, name: string) => {
    console.log("main code", code);
    console.log("main name", name);
  };

  /*
  request({
    url: "/data/orgList.json",
    method: CommonConstants.REQUEST_METHOD_GET,
  })
    .then((res) => {
      console.log("getOrgList : ", res.data.data);
      pageSheet.loadSearchData(res.data.data);
    })
    .catch((e) => {})
    .finally(() => {});
    */

  return (
    <div>테스트
      {/* <SelectComboFieldNew
        labelText="근태종류"
        fieldId={"workKindCode"}
        url="/data/workKindCode.json"
        method={CommonConstants.REQUEST_METHOD_GET}
        defaultValue={100}
      />

      <DateField fieldId={"baseDate"} label="기준일" initDate={getToday()} />

      <SearchOrg callBackOrgData={orgData} />

      <SearchUser callBackOrgData={orgData} /> */}
      {/* <DtmListSheet sheetCallBack={setPageSheet} setData={setData} /> */}
    </div>
  );
}

export default React.memo(Main2);
