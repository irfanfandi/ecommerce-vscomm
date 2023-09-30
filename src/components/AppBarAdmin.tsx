"use client";
import theme from "@/components/ThemeRegistry/theme";
import { AppBar, Avatar, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";

export const metadata = {
  title: "Admin",
};

export default function AppBarAdmin() {
  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 2000,
        }}
        elevation={0}
      >
        <Toolbar sx={{ backgroundColor: "background.paper" }}>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{
              padding: "6px, 16px, 6px, 16px",
            }}
          >
            <Grid item>
              <Image src={"/logo.png"} width={150} height={20} alt="vascoom" />
            </Grid>
            <Grid item>
              <Grid container alignItems={"center"}>
                <Grid item sx={{ mr: theme.spacing(2) }}>
                  <Grid
                    container
                    direction={"column"}
                    justifyContent="flex-end"
                  >
                    <Typography
                      align="left"
                      fontSize={10}
                      color={theme.palette.primary.main}
                    >
                      Halo Admin
                    </Typography>
                  </Grid>
                  <Typography align="left">Aden</Typography>
                </Grid>
                <Grid item>
                  <Avatar sx={{ width: 35, height: 35 }} src="" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
