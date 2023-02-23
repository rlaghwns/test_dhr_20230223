import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { workKindCode } from "../../api/apis";
import request from "../../api/request";
import DateField from "../../component/DateField";
import CommonConstants from "../../constants/CommonConstants";
import { addStatusRow, sheetSave } from "../../utils/sheetUtil";
import SamplePage5Sheet1 from "./SamplePage5Sheet1";
import SamplePage5Sheet2 from "./SamplePage5Sheet2";

let pageSheet1: any = null;
let pageSheet2: any = null;

function SamplePage5() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const [commonData, setCommonData] = useState();
  const [treeName, setTreeName] = useState();
  const [treeData, setTreeData] = useState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const setPageSheet1 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet1 = evt.sheet;
    // requestCall();
  };
  const setPageSheet2 = (evt: any) => {
    console.log("setPageSheet");
    pageSheet2 = evt.sheet;
    // requestCall();
  };

  const addRow1 = () => {
    console.log("addRow : ");
    addStatusRow(pageSheet1);
  };

  const addRow2 = () => {
    console.log("addRow : ");
    addStatusRow(pageSheet2);
  };

  const requestCode = (data: any) => {
    console.log("requestCode");
    setCommonData(data.work_cd4);
  };

  const requestCall = () => {
    request({
      url: "/data/sample5.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet1.loadSearchData(list);
        requestCall2();
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const requestCall2 = () => {
    request({
      url: "/data/sample5_1.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet2.loadSearchData(list);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const treeCall = () => {
    request({
      url: "/data/sample5tree.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const treeName = res.data.data.list.treeName;
        const list3 = res.data.data.list;

        console.log("list", list3);

        setTreeName(treeName);
        setTreeData(list3);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const renderTree = (nodes: any) => (
    <TreeItem
      key={nodes.index}
      nodeId={nodes.index}
      label={nodes.treeName}
      onClick={() => {
        if (nodes.loadSheet) {
          treeClick(nodes.index);
        }
      }}
    >
      {Array.isArray(nodes.treeItem)
        ? nodes.treeItem.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );

  const save1 = () => {
    console.log("save");
    const isError = sheetSave([pageSheet1, pageSheet2]);
    console.log("save isError : ", isError);
    requestCall();
    requestCall2();
    // pageSheet1.acceptChangedData();
  };

  useEffect(() => {
    workKindCode(requestCode);
    treeCall();
  }, []);

  const treeClick = (index: number) => {
    console.log("index : ", index);
    requestCall();
    requestCall2();
  };

  return (
    <div>
      <Box overflow={"hidden"} margin={"1px"}>
        <Grid container>
          <Grid sx={{ width: 0.2 }}>
            <Grid container>
              <Grid>
                <div style={{ margin: "1em", display: "flex" }}>
                  <DateField label="기준일자" inputFormat="YYYY.MM.DD" />
                  <Button variant="contained" size="medium">
                    {t("조회")}
                  </Button>
                </div>
                <TreeView
                  sx={{
                    height: 1,
                    overflowY: "auto",
                  }}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {treeData ? renderTree(treeData) : <></>}
                </TreeView>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ width: 0.8 }}>
            <Grid>
              <Grid>
                <Grid sx={{ height: 300 }}>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffffff",
                    }}
                  >
                    조직권한 관리
                    <Button
                      style={{ marginLeft: "1em" }}
                      variant="contained"
                      size="medium"
                      onClick={addRow1}
                    >
                      {t("입력")}
                    </Button>
                    <Button
                      style={{ marginLeft: "1em" }}
                      variant="contained"
                      size="medium"
                      onClick={save1}
                    >
                      {t("저장")}
                    </Button>
                  </div>
                  {commonData ? (
                    <SamplePage5Sheet1
                      sheetCallBack={setPageSheet1}
                      code={commonData}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid sx={{ height: 300 }}>
                  <div
                    style={{
                      display: "flex",
                      background: "#ffffff",
                    }}
                  >
                    조직권한 사용자
                    <Button
                      style={{ marginLeft: "1em" }}
                      variant="contained"
                      size="medium"
                      onClick={addRow2}
                    >
                      {t("입력")}
                    </Button>
                  </div>
                  {commonData ? (
                    <SamplePage5Sheet2
                      sheetCallBack={setPageSheet2}
                      code={commonData}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default React.memo(SamplePage5);
