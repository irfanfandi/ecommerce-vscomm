"use client";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ReInputSearch from "../ReInputSearch";

const borderRoot = "1px solid rgb(229, 234, 242)";

const useStyles = makeStyles((theme: any): object => ({
  cardProduct: {
    cursor: "pointer",
    padding: theme.spacing(4),
    border: "1px solid #fff",
    "&:hover": {
      border: "1px solid #D6D6D6",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
    },
  },
}));

export default function LandingPage() {
  const theme: any = useTheme();
  const classes: any = useStyles();
  const router = useRouter();
  const [dataProduct, setdataProduct] = useState([]);
  const [dataProductNew, setdataProductNew] = useState<any>([]);

  const fetchDataProductAvailable = async () => {
    try {
      const ress = await fetch("/api/product");
      if (ress.ok) {
        const data = await ress.json();
        setdataProduct(data.data);
        setdataProductNew(data.data.slice(0, 10));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataProductAvailable();
  }, []);

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
      <Container maxWidth="lg">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: theme.spacing(8),
            py: theme.spacing(6),
            overflow: "auto",
          }}
        >
          <Grid container alignItems={"stretch"}>
            <Grid item width={"100%"}>
              <Image
                src={"/image/banner.png"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="banner"
              />
            </Grid>
            <Grid item container>
              <Grid item sx={{ ml: theme.spacing(-1) }}>
                <IconButton disabled>
                  <ArrowBackIosNewOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <ArrowForwardIosOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* PRODUK TERBARU */}
          <Grid container direction="column" spacing={4} mt={theme.spacing(2)}>
            <Grid item>
              <Typography variant="h5" fontWeight={700} fontFamily={"playfair"}>
                Terbaru
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                spacing={theme.spacing(2)}
              >
                <Grid item>
                  <ArrowBackIosNewOutlined fontSize={"large"} />
                </Grid>
                {dataProductNew.map(({ name, image, price, id }: any) => (
                  <Grid key={id} item>
                    <Card elevation={0} className={classes.cardProduct}>
                      <Image src={image} width={130} height={132} alt="sasa" />
                      <Grid mt={theme.spacing(4)}>
                        <Typography fontWeight={700} variant="body2">
                          {name}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          variant="body2"
                          color={theme.palette.primary.main}
                        >
                          IDR {new Intl.NumberFormat("IDR-id").format(price)}
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
                <Grid item>
                  <ArrowForwardIosOutlined fontSize={"large"} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* PRODUK TERSEDIA */}
          <Grid container direction="column" spacing={4} mt={theme.spacing(2)}>
            <Grid item>
              <Typography variant="h5" fontWeight={700} fontFamily={"playfair"}>
                Produk Tersedia
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                spacing={theme.spacing(4)}
              >
                {dataProduct.map(({ name, image, price, id }) => (
                  <Grid key={id} item>
                    <Card elevation={0} className={classes.cardProduct}>
                      <Image src={image} width={130} height={132} alt="sasa" />
                      <Grid mt={theme.spacing(4)}>
                        <Typography fontWeight={700} variant="body2">
                          {name}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          variant="body2"
                          color={theme.palette.primary.main}
                        >
                          IDR {new Intl.NumberFormat("IDR-id").format(price)}
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            mt={theme.spacing(2)}
          >
            <Grid item>
              <Button variant="outlined">Lihat lebih banyak</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
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
