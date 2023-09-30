"use client";
/* eslint-disable react/display-name */
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/styles";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface ReInputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  size?: "small" | "medium";
  style?: React.CSSProperties;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  onFinish?: (value: any) => void;
  onFinishTyping?: (value: any) => void;
  required?: boolean;
  multiline?: boolean;
  InputProps?: object;
  InputLabelProps?: object;
}

export type InputHandle = {
  setDefaultValue: (params: any) => void;
  getValue: () => any;
};

const StyledTextField = styled(TextField)(({ theme }: { theme: any }) => ({
  "& .MuiOutlinedInput-root, .MuiOutlinedInput-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  "& .MuiFormLabel-root, .MuiInputLabel-root, .MuiInputBase-input, .MuiOutlinedInput-input":
    {
      color: "GrayText",
    },
  "& .MuiInputBase-root, .MuiOutlinedInput-root": {
    borderRadius: 0,
    fontSize: 14,
  },
  "& .MuiFormLabel-asterisk, .MuiInputLabel-asterisk": {
    color: "GrayText",
    fontSize: 14,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: theme.borderRoot,
  },
}));

const ReInput = forwardRef<InputHandle, ReInputProps>((props, ref) => {
  const [value, setValue] = useState<any>(null);
  const theme: any = useTheme();

  useImperativeHandle(ref, (): any => ({
    getValue() {
      return value;
    },
    setDefaultValue(params: any) {
      setValue(params);
    },
  }));

  useEffect(() => {
    if (props.onFinish) {
      if (value !== undefined) props.onFinish(value);
    }
    if (props.onFinishTyping) {
      const timeoutId = setTimeout((): void => {
        if (props.onFinishTyping !== undefined) {
          props.onFinishTyping(value);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [value]);

  return (
    <Grid
      container
      style={{
        marginTop: theme.spacing(2),
        ...props.style,
      }}
    >
      {props.required && (
        <Typography sx={{ mr: 1 }} variant="caption" color="red">
          *
        </Typography>
      )}
      {props.label && (
        <Typography variant="subtitle2" color={theme.palette.text.secondary}>
          {props.label}
        </Typography>
      )}
      <StyledTextField
        inputRef={ref}
        className={props.className}
        // label={props.label}
        placeholder={props.placeholder || `Masukan ${props.label}`}
        size={props.size || "medium"}
        value={value || ""}
        style={{
          marginTop: theme.spacing(1),
        }}
        variant="outlined"
        fullWidth
        type={props.type ?? "text"}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        required={props.required ?? false}
        multiline={props.multiline ?? false}
        rows={4}
        InputProps={props.InputProps}
        InputLabelProps={props.InputLabelProps}
      />
    </Grid>
  );
});

export default memo(ReInput);
