"use client";
import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import { makeStyles, styled, useTheme } from "@mui/styles";
import { memo } from "react";

const useStyles = makeStyles((theme: any): object => ({
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    width: 500,
    borderRadius: 10,
  },
  containerHeader: {
    borderRadius: 10,
    backgroundColor: theme.palette.secondary.main,
  },
  containerBody: {},
}));

const StyledModal = styled(Modal)(({ theme }: { theme: any }) => ({
  "& .MuiBackdrop-root, MuiModal-backdrop": {
    backgroundColor: "rgba(107, 122, 144, 0.2)",
    backdropFilter: "blur(4px)",
  },
}));

interface ModalProps {
  title: string;
  children: any;
  open: boolean;
  setOpen?: () => void;
}

const ReModalInput = ({ title, children, open, setOpen }: ModalProps) => {
  const theme: any = useTheme();
  const classes: any = useStyles();

  return (
    <StyledModal
      open={open}
      onClose={setOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.box}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          id="modal-modal-title"
          py={theme.spacing(3)}
          px={theme.spacing(2)}
          className={classes.containerHeader}
        >
          <Typography fontWeight={500}>{title}</Typography>
          <IconButton onClick={setOpen} size="small">
            <Close fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid
          container
          direction={"row"}
          id="modal-modal-description"
          py={theme.spacing(2)}
          px={theme.spacing(2)}
          className={classes.containerBody}
        >
          {children}
        </Grid>
      </Box>
    </StyledModal>
  );
};

export default memo(ReModalInput);
