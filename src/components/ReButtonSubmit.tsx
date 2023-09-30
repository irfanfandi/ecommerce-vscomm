"use client";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import {
  Fragment,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";

interface ReButtonProps {
  onClick: () => void;
  title: string;
}

export type ButtonHandle = {
  setDisableButton: (params: boolean) => void;
  setLoadingButton: (params: boolean) => void;
};

const ReButtonSubmit = forwardRef<ButtonHandle, ReButtonProps>(
  ({ onClick, title }, ref) => {
    const [disable, setDisable] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);

    useImperativeHandle(ref, () => ({
      setDisableButton(value: boolean): void {
        setDisable(value);
      },
      setLoadingButton(value: boolean): void {
        setLoadingButton(value);
      },
    }));

    return (
      <Fragment>
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(107, 122, 144, 0.2)",
            backdropFilter: "blur(4px)",
          }}
          open={loadingButton}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Button
          disabled={disable || loadingButton}
          onClick={onClick}
          variant="contained"
        >
          {loadingButton && (
            <CircularProgress size={20} sx={{ mr: 2 }} color="inherit" />
          )}
          {title}
        </Button>
      </Fragment>
    );
  }
);

export default memo(ReButtonSubmit);
