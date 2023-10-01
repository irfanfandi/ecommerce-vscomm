"use client";
import { Card, Grid, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import ReDataTable from "../ReDataTable";

const useStyles = makeStyles((theme: any): object => ({
  cardDashboard: {
    paddingTop: 12,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

type Props = {};

const columns = [
  {
    field: "name",
    headerName: "Produk",
    flex: 1,
    headerClassName: "header-col",
    renderCell: (params: any) => {
      return (
        <>
          <Image
            src={params.value.image}
            width={20}
            height={20}
            alt={params.value.name}
          />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {" "}
            {params.value.name}
          </Typography>
        </>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Tanggal Dibuat",
    flex: 1,
    headerClassName: "header-col",
  },
  {
    field: "price",
    headerName: "Harga(Rp)",
    flex: 1,
    headerClassName: "header-col",
  },
];

const DashboardPage = (props: Props) => {
  const classes: any = useStyles();
  const theme: any = useTheme();
  const [dataProduct, setDataProduct] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardMenu, setCardMenu] = useState<any>([
    { title: "Jumlah User", value: "0 User" },
    { title: "Jumlah User Aktif", value: "0 User" },
    { title: "Jumlah Produk", value: "0 User" },
    { title: "Jumlah Produk Aktif", value: "0 User" },
  ]);

  const fetchDataDashboard = async () => {
    setIsLoading(true);
    try {
      const ress = await fetch("/api/dashboard");
      if (ress.ok) {
        const data = await ress.json();
        setCardMenu([
          { title: "Jumlah User", value: `${data.data.all_users} User` },
          {
            title: "Jumlah User Aktif",
            value: `${data.data.users_active} User`,
          },
          { title: "Jumlah Produk", value: `${data.data.all_products} Produk` },
          {
            title: "Jumlah Produk Aktif",
            value: `${data.data.products_active} Produk`,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchDataProduct = async () => {
    setIsLoading(true);
    try {
      const ress = await fetch("/api/product");
      if (ress.ok) {
        const data = await ress.json();
        const newData = data.data.slice(0, 10);
        const tableData = newData.map((e: any) => {
          return {
            id: e.id,
            name: { name: e.name, image: e.image },
            createdAt: e.createdAt,
            price: `Rp. ${new Intl.NumberFormat("IDR-id").format(e.price)}`,
          };
        });
        setDataProduct(tableData);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataProduct();
    fetchDataDashboard();
  }, []);

  return (
    <Fragment>
      <Typography variant="h6">Dashboard</Typography>
      <Grid container mt={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardMenu.map(({ title, value }: any, idx: any) => (
          <Grid key={idx} item xl={3} xs={3}>
            <Card
              sx={{
                p: 2,
                borderRadius: "10px",
                backgroundColor: "#C2D6FF",
                height: 117,
              }}
              elevation={0}
            >
              <Grid container alignItems={"center"} px={theme.spacing(2)}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: theme.palette.text.secondary }}
                    fontSize={14}
                  >
                    {title}
                  </Typography>
                  <Typography variant="h6" fontWeight={500} mt={1}>
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card
        elevation={0}
        sx={{ mt: theme.spacing(4), borderRadius: "10px", p: theme.spacing(3) }}
      >
        <Typography fontWeight={500} sx={{ mb: theme.spacing(2) }}>
          Produk Terbaru
        </Typography>
        <ReDataTable
          columns={columns}
          rows={dataProduct}
          isLoading={isLoading}
        />
      </Card>
    </Fragment>
  );
};

export default DashboardPage;
