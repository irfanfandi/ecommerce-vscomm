"use client";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

interface ReConfirmDialogProps {
  title: string;
  content?: string;
  handleSubmit: () => void;
  loadingButton: boolean;
  textConfirm?: string;
}

export type ConfirmDialogHandle = {
  setOpenDialog: (params: any) => void;
};

const ReConfirmDialog = forwardRef<ConfirmDialogHandle, ReConfirmDialogProps>(
  ({ title, content, handleSubmit, loadingButton, textConfirm }, ref) => {
    const theme: any = useTheme();
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, (): any => ({
      setOpenDialog(params: boolean) {
        setOpen(params);
      },
    }));

    return (
      <div>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>
            <Grid container direction={"row"} justifyContent={"space-between"}>
              <Typography fontWeight={500}>{title}</Typography>
              <IconButton onClick={() => setOpen(false)} size="small">
                <Close fontSize="inherit" />
              </IconButton>
            </Grid>
          </DialogTitle>
          {content && (
            <DialogContent>
              <DialogContentText>{content}</DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Grid container justifyContent="flex-end" px={theme.spacing(1)}>
              <Grid item>
                <Button
                  variant="text"
                  disabled={loadingButton}
                  onClick={() => handleSubmit()}
                >
                  {textConfirm || "KONFIRMASI"}
                  {loadingButton && (
                    <CircularProgress
                      size={14}
                      color="inherit"
                      style={{ marginLeft: theme.spacing(1) }}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);

export default ReConfirmDialog;
