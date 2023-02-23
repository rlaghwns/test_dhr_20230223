import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Link } from "react-router-dom";

const MenuTree = () => {
  return (
    <Box overflow={"hidden"} marginRight={"10px"} marginTop={"10px"}>
      {/* // 메뉴 선택 시 우측 띄기  */}
      {/* <Input> 이름넣기</Input>
      <Typography>menu.menu.</Typography> */}
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Applications">
          <Link to={"/DtmList"}>
            <TreeItem nodeId="6" label="근태내역관리(예제)" />
          </Link>
          <Link to={"/DtmApply"}>
            <TreeItem nodeId="7" label="근태신청(예제)" />
          </Link>
          <Link to={"/GetListTemp"}>
            <TreeItem nodeId="8" label="리스트형태 탬플릿" />
          </Link>
          <Link to={"/TabTemp"}>
            <TreeItem nodeId="9" label="탭 탬플릿" />
          </Link>
          <Link to={"/SamplePage2"}>
            <TreeItem nodeId="10" label="2. 사업장관리(조건+위아래Sheet)" />
          </Link>
          <Link to={"/SamplePage3"}>
            <TreeItem nodeId="11" label="3. 사업장관리(조건+좌우Sheet 1)" />
          </Link>
          <Link to={"/SamplePage3_1"}>
            <TreeItem
              nodeId="12"
              label="4. 서비스 / SQL 복사(조건+좌우Sheet 2)"
            />
          </Link>
          <Link to={"/SamplePage4"}>
            <TreeItem
              nodeId="13"
              label="5. 계정과목관리(조건+좌 트리 우 탭 + 시트)"
            />
          </Link>
          <Link to={"/SamplePage5"}>
            <TreeItem
              nodeId="15"
              label="6. 조직권한관리(조건+좌 트리 우 위아래 시트 + 시트)"
            />
          </Link>
          <Link to={"/"}>
            <TreeItem nodeId="16" label="-------------------------------" />
          </Link>
          <Link to={"/SettingComponent"}>
            <TreeItem nodeId="17" label="7. 컴포넌트 샘플" />
          </Link>
        </TreeItem>
        <TreeItem nodeId="110" label="Documents">
          <TreeItem nodeId="120" label="OSS" />
          <TreeItem nodeId="130" label="MUI">
            <TreeItem nodeId="140" label="index.js" />
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="210" label="테스트메뉴">
          <TreeItem nodeId="310" label="1. 하위메뉴1">
            <Link to={"/PhmBase"}>
            {/* <Link to={"/"}> */}
              <TreeItem nodeId="220" label="페이지1" />
            </Link>
          </TreeItem>
          <TreeItem nodeId="230" label="2. 하위메뉴2">
            <Link to={"/layout2"}>
            {/* <Link to={"/"}> */}
              <TreeItem nodeId="240" label="페이지2" />
            </Link>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export default MenuTree;
