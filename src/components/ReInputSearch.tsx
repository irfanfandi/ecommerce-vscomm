"use client";
import { Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/styles";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface ReInputSearchProps {
  onFinish?: (value: string) => void;
  onFinishTyping?: (value: string) => void;
  style?: React.CSSProperties;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  label: string;
  InputLabelProps?: object;
  onClick?: () => void;
}

const StyledTextField = styled(TextField)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.secondary.main,
  paddingTop: 6,
  paddingBottom: 6,
  "& .MuiFormLabel-root, .MuiInputLabel-root, .MuiInputBase-input, .MuiOutlinedInput-input":
    {
      fontSize: 14,
      fontWeight: 500,
    },
  "&& .Mui-disabled": {
    WebkitTextFillColor: theme.palette.text.primary,
  },
  "& .MuiInputBase-root, .MuiOutlinedInput-root": {
    borderWidth: 0,
    fontSize: 14,
    marginLeft: theme.spacing(2),
  },
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(2),
  },
}));

const ReInputSearch = forwardRef<HTMLInputElement, ReInputSearchProps>(
  (props, ref) => {
    const [value, setValue] = useState<any>(null);

    useImperativeHandle(ref, (): any => ({
      getValue() {
        return value;
      },
      setDefaultValue(params: any) {
        setValue(params);
      },
    }));

    useEffect(() => {
      if (value !== null) {
        if (props.onFinish) {
          props.onFinish(value);
        }
        if (props.onFinishTyping) {
          const timeoutId = setTimeout(() => {
            if (props.onFinishTyping !== undefined) {
              props.onFinishTyping(value);
            }
          }, 500);
          return () => clearTimeout(timeoutId);
        }
      }
    }, [value]);

    return (
      <Grid style={{ width: "100%" }} onClick={props.onClick}>
        <StyledTextField
          inputRef={ref}
          placeholder={props.label}
          style={{
            ...props.style,
          }}
          value={value || ""}
          variant="standard"
          label=""
          fullWidth
          type={props.type}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          InputProps={{
            endAdornment:
              value === null || value === "" ? (
                <SearchIcon fontSize="small" />
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setValue("");
                  }}
                >
                  <Close fontSize="small" />
                </div>
              ),
            disableUnderline: true,
          }}
          InputLabelProps={props.InputLabelProps}
        />
      </Grid>
    );
  }
);

export default memo(ReInputSearch);
