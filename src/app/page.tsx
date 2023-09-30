import LandingPage from "@/components/Home/LandingPage";
import ReInputSearch from "@/components/ReInputSearch";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const borderRoot = "1px solid rgb(229, 234, 242)";

export default function HomePage() {
  const theme: any = useTheme();
  const router = useRouter();

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 2000,
          borderBottom: borderRoot,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
            height: 70,
          }}
        >
          <Grid
            container
            direction={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            style={{
              padding: "6px, 16px, 6px, 16px",
            }}
          >
            <Grid item>
              <Image src={"/logo.png"} width={168} height={27} alt="vascoom" />
            </Grid>
            <Grid item xs={6}>
              <ReInputSearch label={"Cari parfum kesukaanmu"} />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                MASUK
              </Button>
              <Button variant="contained" sx={{ color: "white" }}>
                DAFTAR
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <LandingPage />
      {/* FOOTER */}
      <Box component={"footer"}>
        <Grid
          container
          mt={theme.spacing(8)}
          height={408}
          gap={2}
          py={theme.spacing(8)}
          px={theme.spacing(6)}
          sx={{ borderTop: borderRoot }}
        >
          <Grid
            item
            xs={4}
            container
            direction={"column"}
            alignItems={"center"}
            spacing={theme.spacing(4)}
            px={theme.spacing(6)}
          >
            <Grid item>
              <Image src={"/logo.png"} width={168} height={27} alt="vascoom" />
            </Grid>
            <Grid item container>
              <Typography variant="caption" align="center" color="GrayText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                commodo in vestibulum, sed dapibus tristique nullam.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="button">Layanan</Typography>
            <Grid container direction={"column"} mt={2}>
              <Typography variant="overline">BANTUAN</Typography>
              <Typography variant="overline">TANYA JAWAB</Typography>
              <Typography variant="overline">HUBUNGI KAMI</Typography>
              <Typography variant="overline">CARA BELANJA</Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography>Tentang Kami</Typography>
            <Grid container direction={"column"} mt={2}>
              <Typography variant="overline">ABOUT US</Typography>
              <Typography variant="overline">KARIR</Typography>
              <Typography variant="overline">BLOG</Typography>
              <Typography variant="overline">KEBIJAKAN PRIVASI</Typography>
              <Typography variant="overline">SYARAT DAN KETENTUAN</Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography>Mitra</Typography>
            <Grid container direction={"column"} mt={2}>
              <Typography variant="overline">SUPPLIER</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
