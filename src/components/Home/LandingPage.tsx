"use client";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

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
      const ress = await fetch("/api/product", { cache: "force-cache" });
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
    </Fragment>
  );
}
