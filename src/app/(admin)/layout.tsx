import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <AppBar position="fixed" sx={{ zIndex: 2000 }} elevation={0}>
        <Toolbar sx={{ backgroundColor: "background.paper" }}>
          <Grid container justifyContent={"space-evenly"}>
            <Image src={"/logo.png"} width={30} height={80} alt="vascoom" />
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>{children}</Box>
    </Fragment>
  );
}
