import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";

function PhmTest(){
    
  useEffect(() => {
    console.log('12');
  }, []);

    return(
        <div>
            <Typography variant="h5" align="left" marginLeft="10px" marginTop="10px"> 인사기본</Typography>
            <Box>
                <Grid>
                    
                </Grid>
            </Box>
        </div>
    );
}


export default React.memo(PhmTest);