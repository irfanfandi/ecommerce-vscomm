"use client";
import ReInputSearch from "@/components/ReInputSearch";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import Image from "next/image";
import { Fragment } from "react";

export default function HomePage() {
  const theme: any = useTheme();

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 2000,
          borderBottom: "1px solid rgb(229, 234, 242)",
        }}
        elevation={0}
      >
        <Toolbar sx={{ backgroundColor: "background.paper", height: 70 }}>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <Image src={"/logo.png"} width={136} height={25} alt="vascoom" />
            </Grid>
            <Grid item width={662}>
              <ReInputSearch label={"Cari parfum kesukaanmu"} />
            </Grid>
            <Grid item>
              <Button variant="outlined" sx={{ mr: 2 }}>
                MASUK
              </Button>
              <Button variant="contained" sx={{ color: "white" }}>
                DAFTAR
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: theme.spacing(12),
          padding: theme.spacing(3),
          overflow: "auto",
        }}
      >
        <Typography>HOME</Typography>
      </Box>
    </Fragment>
  );
}
