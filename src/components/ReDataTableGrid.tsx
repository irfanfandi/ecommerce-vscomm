"use client";
import { Grid, LinearProgress } from "@mui/material";
import { styled, useTheme } from "@mui/styles";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { memo } from "react";

const StyledDataGrid = styled(DataGrid)(({ theme }: { theme: any }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.background.paper,
  },
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
    color: theme.palette.text.primary,
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
}

const ReDataTableGrid: React.FC<ReDataTableProps> = ({
  rows = [],
  columns,
  isLoading = false,
}) => {
  const theme: any = useTheme();

  return (
    <Grid
      mt={theme.spacing(3)}
      pb={theme.spacing(3)}
      sx={{
        width: "100%",
        height: rows.length <= 0 ? 500 : "",
        "& .header-col": {
          backgroundColor: theme.palette.background.paper,
        },
        "& .MuiDataGrid-row": {
          "[aria-colindex$='1']": {
            color: theme.palette.text.primary,
            fontWeight: 500,
          },
        },
      }}
    >
      <StyledDataGrid
        rows={rows}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
        }
        rowCount={rows.length}
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </Grid>
  );
};

export default memo(ReDataTableGrid);
