"use client";
import {
  DeleteOutline,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import axios from "axios";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import ReChipStatus from "../ReChipStatus";
import ReConfirmDialog, { ConfirmDialogHandle } from "../ReConfirmDialog";
import ReDataTableGrid from "../ReDataTableGrid";
import ReModalInput from "../ReModalInput";
import AddEditProductPage from "./AddEditProductPage";

type Props = {};

const columns = [
  {
    field: "no",
    headerName: "No",
    width: 100,
    headerClassName: "header-col",
  },
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
    field: "price",
    headerName: "Harga(Rp)",
    flex: 1,
    headerClassName: "header-col",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerClassName: "header-col",
    renderCell: (params: any) => {
      return (
        <ReChipStatus
          bgColor={params.value.bgColor}
          title={params.value.title}
        />
      );
    },
  },
  {
    field: "aksi",
    headerName: "Aksi",
    width: 100,
    headerClassName: "header-col",
    renderCell: (params: any) => {
      return (
        <>
          <IconButton size="small" onClick={params.value.onClick}>
            <DriveFileRenameOutlineOutlined
              fontSize="inherit"
              color={"primary"}
            />
          </IconButton>
          <IconButton size="small" onClick={params.value.onDelete}>
            <DeleteOutline fontSize="inherit" color={"error"} />
          </IconButton>
        </>
      );
    },
  },
];

const Product = (props: Props) => {
  const theme: any = useTheme();
  const [dataProduct, setProduct] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const _refConfirmDialog = useRef<ConfirmDialogHandle>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const ress = await fetch("/api/product");
      if (ress.ok) {
        const data = await ress.json();
        const tableData = data.data.map((e: any, idx: any) => {
          return {
            id: e.id,
            no: idx + 1,
            name: { name: e.name, image: e.image },
            price: `Rp. ${new Intl.NumberFormat("IDR-id").format(e.price)}`,
            status: {
              title: !e.isActive ? "Tidak Aktif" : "Aktif",
              bgColor: !e.isActive
                ? theme.palette.error.main
                : theme.palette.success.main,
            },
            aksi: {
              rowData: e,
              onClick: () => {
                setOpenAddEdit(true);
                setSelectedData(e);
              },
              onDelete: () => {
                setSelectedData(e);
                _refConfirmDialog.current?.setOpenDialog(true);
              },
            },
          };
        });
        setProduct(tableData);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setLoadingButton(true);
    try {
      const ress = await axios.delete(`api/product?id=${selectedData.id}`);
      if (ress.status === 200) {
        setLoadingButton(false);
        _refConfirmDialog.current?.setOpenDialog(false);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
    _refConfirmDialog.current?.setOpenDialog(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item>
          <Typography variant="h6">Manajemen Produk</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => {
              setSelectedData(null);
              setOpenAddEdit(true);
            }}
          >
            Tambah Produk
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <ReDataTableGrid
          columns={columns}
          rows={dataProduct}
          isLoading={isLoading}
        />
      </Grid>
      <ReModalInput
        open={openAddEdit}
        setOpen={() => {
          setOpenAddEdit(!openAddEdit);
        }}
        title={selectedData !== null ? "Edit Produk" : "Tambah Produk"}
      >
        <AddEditProductPage
          selectedData={selectedData}
          onCloseModal={() => {
            setOpenAddEdit(false);
            fetchData();
          }}
        />
      </ReModalInput>
      <ReConfirmDialog
        ref={_refConfirmDialog}
        title={`Apakah Kamu Yakin Menghapus ${selectedData?.name} ?`}
        handleSubmit={() => {
          setLoadingButton(true);
          handleDelete();
        }}
        loadingButton={loadingButton}
      />
    </Fragment>
  );
};

export default Product;
