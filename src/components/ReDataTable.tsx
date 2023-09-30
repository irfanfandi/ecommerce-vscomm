"use client";
import { Chip, Grid, LinearProgress } from "@mui/material";
import { styled, useTheme } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { memo, useEffect, useState } from "react";
import ReInputSearch from "./ReInputSearch";
import ReNoRowsOverlay from "./ReNoRowsOverlay";

const StyledDataGrid = styled(DataGrid)(({ theme }: { theme: any }) => ({
  border: 0,
  width: "100%",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  overflow: "hidden",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    border: 0,
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row,": {
    color: theme.palette.text.secondary,
  },
  "& .MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-actions":
    {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
  "& .MuiDataGrid-withBorderColor": {
    border: 0,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },

  "& .MuiDataGrid-columnHeaderTitleContainer": {
    color: theme.palette.text.secondary,
  },
  "& .MuiPaper-root, .MuiPopover-paper, .MuiMenu-paper": {
    color: theme.palette.text.secondary,
  },
  "& .MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },
}));

interface ReDataTableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  useSearch?: boolean;
  paginationModeServer?: boolean;
  useCustomeFilter?: boolean;
  paginationModel?: any;
  rowCountState?: number;
  setPaginationModel?: (value: any) => void;
  setSearchValue?: (value: any) => void;
}

const ReDataTable: React.FC<ReDataTableProps> = ({
  rows = [],
  columns,
  isLoading = false,
  useSearch = false,
  useCustomeFilter = false,
  paginationModeServer = false,
  paginationModel = {},
  rowCountState = 0,
  setSearchValue = () => {},
  setPaginationModel = () => {},
}) => {
  const theme: any = useTheme();
  const [tableData, setTableData] = useState<any[]>(rows);
  const [dataFilterStatus, setDataFilterStatus] = useState<any[]>([]);
  const [isActive, setIsAcive] = useState<boolean>(true);
  const lengthData = useSearch ? tableData.length : rows.length;
  const status = isActive ? "Aktif" : "Tidak Aktif";

  const requestSearch = (searchValue: string) => {
    const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");

    const filteredRows = dataFilterStatus.filter((o: any) => {
      return Object.keys(o).some((k: any) => {
        return searchRegex.test(o[k]?.toString());
      });
    });
    setTableData(filteredRows);
  };

  const handleFilterStatus = () => {
    const filteredRows = rows.filter((o: any) => o?.status?.title == status);
    setTableData(filteredRows);
    setDataFilterStatus(filteredRows);
  };

  useEffect(() => {
    if (!useCustomeFilter) {
      handleFilterStatus();
    } else {
      setTableData(rows);
    }
  }, [rows]);

  useEffect(() => {
    if (!useCustomeFilter) handleFilterStatus();
  }, [isActive]);

  return (
    <Grid
      mt={theme.spacing(3)}
      pb={theme.spacing(3)}
      sx={{
        width: "100%",
        height: lengthData <= 0 ? 500 : "",
        "& .header-col": {
          backgroundColor: theme.palette.secondary.main,
        },
        "& .MuiDataGrid-row": {
          "[aria-colindex$='1']": {
            color: theme.palette.text.primary,
            fontWeight: 500,
          },
        },
      }}
    >
      {!useCustomeFilter && (
        <>
          <Grid
            container
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Grid item>
              <Grid container direction={"row"}>
                <Chip
                  label="Aktif"
                  color={isActive ? "primary" : "default"}
                  onClick={() => {
                    setIsAcive(true);
                  }}
                />
                <Chip
                  clickable
                  sx={{ ml: 1 }}
                  color={!isActive ? "primary" : "default"}
                  label="Tidak Aktif"
                  onClick={() => {
                    setIsAcive(false);
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <ReInputSearch
                label="Cari"
                onFinishTyping={(value: string) => {
                  useSearch ? requestSearch(value) : setSearchValue(value);
                }}
                style={{
                  float: "right",
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
      <StyledDataGrid
        rows={tableData}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: ReNoRowsOverlay,
        }}
        loading={isLoading}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        rowCount={paginationModeServer ? rowCountState : tableData.length}
        paginationMode={paginationModeServer ? "server" : "client"}
        paginationModel={paginationModeServer ? paginationModel : undefined}
        onPaginationModelChange={
          paginationModeServer ? setPaginationModel : undefined
        }
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </Grid>
  );
};

export default memo(ReDataTable);
