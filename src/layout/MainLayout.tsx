import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import HeaderBar from "./HeaderBar";

import MenuTree from "./MenuTree";
import PageRoutes from "./PageRoutes";
import { Routes, Route } from "react-router-dom";
import TypoText from "./TypoText";
import { Link } from "react-router-dom";

// const gridHeight = "90%";
// const gridHeight = "calc(100vh - 50px)"; // appBar 높이가 48px라 설정하였다.
const gridHeight = "calc(100vh - 50px)"; // appBar 높이가 48px라 설정하였다.

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // 박스치기 : border={"1px solid red"}

  return (
    <Box>
      <HeaderBar handleMenuToggle={handleMenuToggle} />
      <BrowserRouter>
        <Box overflow={"hidden"} margin={"1px"}>
          <Grid container>
            <Grid
              item
              hidden={menuOpen ? false : true}
              xs={menuOpen ? 1.5 : 0} // 선택되면 2 Size, 감출때는  0 Size
              maxHeight={gridHeight}
              overflow={"auto"}
            >
              {/* 메뉴 제목 달기  */}
              <Typography marginTop="10px" variant="h5" textAlign="center">
                메뉴
              </Typography>
              <MenuTree />
            </Grid>
            <Grid
              item
              xs={menuOpen ? 10.5 : 12}
              overflow={"hidden"}
              maxHeight={gridHeight}
              padding={"1px"}
              border={"1px solid black"}
            >
              <div style={{ position: "relative" }}>
                <PageRoutes />
              </div>
            </Grid>
          </Grid>
        </Box>
      </BrowserRouter>

      {/* <BrowserRouter></BrowserRouter> */}
    </Box>
  );
};

export default MainLayout;
