import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { workKindCode } from "../../api/apis";
import request from "../../api/request";
import DateField from "../../component/DateField";
import CommonConstants from "../../constants/CommonConstants";
import { addStatusRow, sheetSave } from "../../utils/sheetUtil";
import SamplePage4Sheet from "./SamplePage4Sheet";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

let pageSheet: any = null;

function SamplePage5() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const [commonData, setCommonData] = useState();
  const [treeName, setTreeName] = useState();
  const [treeData, setTreeData] = useState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const setPageSheet = (evt: any) => {
    console.log("setPageSheet");
    pageSheet = evt.sheet;
    console.log("pageSheet : ", pageSheet);
    // requestCall();
  };
  const addRow = () => {
    console.log("addRow : ");
    addStatusRow(pageSheet);
  };

  const requestCode = (data: any) => {
    console.log("requestCode");
    setCommonData(data.work_cd3);
  };

  const requestCall = () => {
    request({
      url: "/data/sample4.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet.loadSearchData(list);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const requestCall2 = () => {
    request({
      url: "/data/sample4_1.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const list = res.data.data.list;

        pageSheet.loadSearchData(list);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };
  const treeCall = () => {
    request({
      url: "/data/sample4tree.json",
      method: CommonConstants.REQUEST_METHOD_GET,
    })
      .then((res) => {
        console.log("data : ", res.data.data.list);
        const treeName = res.data.data.list.treeName;
        const list3 = res.data.data.list.treeItem;

        const listItems = list3.map((item: any) => (
          <TreeItem
            nodeId={item.index}
            label={item.name}
            onClick={() => {
              treeClick(item.index);
            }}
          />
        ));

        console.log("list", listItems);

        setTreeName(treeName);
        setTreeData(listItems);
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {});
  };

  const save = () => {
    console.log("save");
    sheetSave(pageSheet);
  };

  useEffect(() => {
    workKindCode(requestCode);
    treeCall();
  }, []);

  const treeClick = (index: number) => {
    console.log("index : ", index);
    console.log("pageSheet : ", pageSheet);
    switch (index) {
      case 6: {
        requestCall();
        return console.log("6666666666666666");
      }
      case 7: {
        requestCall2();
        return console.log("77777777777777777");
      }
      case 8: {
        return console.log("8888888888888888");
      }
    }
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
                  {treeData ? (
                    <TreeItem nodeId="1" label={treeName}>
                      {treeData}
                    </TreeItem>
                  ) : (
                    <></>
                  )}
                </TreeView>
              </Grid>
            </Grid>
          </Grid>
          {/* tab ----------------------------------------------- */}
          <Grid sx={{ width: 0.8 }}>
            <Grid>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    sx={{ textTransform: "none" }}
                    label="옵션기본하위"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ textTransform: "none" }}
                    label="옵션기본하위2"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div style={{ margin: "1em", display: "flex" }}>
                  <DateField label="기준일자" inputFormat="YYYY.MM.DD" />
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={requestCall}
                  >
                    {t("조회")}
                  </Button>
                </div>

                <div style={{ margin: "1em", display: "flex" }}>
                  <Button variant="contained" size="medium" onClick={addRow}>
                    {t("입력")}
                  </Button>
                  <Button variant="contained" size="medium" onClick={save}>
                    {t("저장")}
                  </Button>
                  <Button variant="contained" size="medium">
                    {t("다운로드")}
                  </Button>
                </div>
                {commonData ? (
                  <SamplePage4Sheet
                    sheetCallBack={setPageSheet}
                    code={commonData}
                  />
                ) : (
                  <></>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                옵션기본하위2
              </TabPanel>
            </Grid>
          </Grid>
          {/* tab 끝----------------------------------------------- */}
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default React.memo(SamplePage5);
