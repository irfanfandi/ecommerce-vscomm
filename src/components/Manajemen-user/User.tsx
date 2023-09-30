"use client";
import {
  DeleteOutline,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import ReChipStatus from "../ReChipStatus";
import ReConfirmDialog, { ConfirmDialogHandle } from "../ReConfirmDialog";
import ReDataTableGrid from "../ReDataTableGrid";
import ReModalInput from "../ReModalInput";
import AddEditUserPage from "./AddEditUserPage";

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
    headerName: "Nama Lengkap",
    flex: 1,
    headerClassName: "header-col",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerClassName: "header-col",
  },
  {
    field: "phone",
    headerName: "No Telpon",
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

const User = (props: Props) => {
  const theme: any = useTheme();
  const [dataUser, setUser] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const _refConfirmDialog = useRef<ConfirmDialogHandle>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const ress = await fetch("/api/user");
      if (ress.ok) {
        const data = await ress.json();
        const tableData = data.data.map((e: any, idx: any) => {
          return {
            id: e.id,
            no: idx + 1,
            name: e.name,
            email: e.email,
            phone: e.phone,
            status: {
              title: e?.deleted ? "Tidak Aktif" : "Aktif",
              bgColor: e?.deleted
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
        setUser(tableData);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setLoadingButton(true);
    try {
      const ress = await axios.delete(`api/user?id=${selectedData.id}`);
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
          <Typography variant="h6">Manajemen User</Typography>
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
            Tambah User
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <ReDataTableGrid
          columns={columns}
          rows={dataUser}
          isLoading={isLoading}
        />
      </Grid>
      <ReModalInput
        open={openAddEdit}
        setOpen={() => {
          setOpenAddEdit(!openAddEdit);
        }}
        title={selectedData !== null ? "Edit User" : "Tambah User"}
      >
        <AddEditUserPage
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

export default User;
