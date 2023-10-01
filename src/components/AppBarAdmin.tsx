"use client";
import theme from "@/components/ThemeRegistry/theme";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const StyledPopover = styled(Popover)(({ theme }: { theme: any }) => ({
  "& .MuiPaper-root, .MuiPopover-paper": {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
    borderRadius: theme.spacing(1),
    border: "1px solid rgb(229, 234, 242)",
  },
}));

export default function AppBarAdmin() {
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPoper = Boolean(anchorEl);
  const idPopper = openPoper ? "popper-profile" : undefined;

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
                  <Button
                    aria-describedby={idPopper}
                    onClick={(event: any) => {
                      setAnchorEl(anchorEl ? null : event.currentTarget);
                    }}
                  >
                    <Avatar
                      sx={{ width: 35, height: 35, cursor: "pointer" }}
                      src=""
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      route.push("/login");
                    }}
                  >
                    Logout
                  </Button>
                  <StyledPopover
                    id={idPopper}
                    anchorEl={anchorEl}
                    open={openPoper}
                    disableScrollLock={false}
                    onClose={() => {
                      setAnchorEl(null);
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    elevation={0}
                  >
                    <Grid p={theme.spacing(3)} mt={-3}>
                      <Grid container spacing={theme.spacing(2)}>
                        <Typography>sasas</Typography>
                      </Grid>
                    </Grid>
                  </StyledPopover>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
