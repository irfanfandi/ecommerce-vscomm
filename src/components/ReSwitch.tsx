"use client";
import { FormControlLabel, Switch } from "@mui/material";
import { styled, useTheme } from "@mui/styles";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme }: { theme: any }) => ({
    "& .MuiTypography-root": {
      color: theme.palette.text.secondary,
    },
  })
);

interface ReSwitchProps {
  label: string;
  disabled?: boolean;
  onFinish?: (value: any) => void;
}

export type SwitchHandle = {
  getValue: () => boolean;
  setDefaultValue: (params: boolean) => void;
};

const ReSwitch = forwardRef<SwitchHandle, ReSwitchProps>((props, ref) => {
  const theme: any = useTheme();
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    getValue(): boolean {
      return checked;
    },
    setDefaultValue(params: boolean) {
      setChecked(params);
    },
  }));

  useEffect(() => {
    if (props.onFinish) {
      props.onFinish(checked);
    }
  }, [checked]);

  return (
    <StyledFormControlLabel
      sx={{ mt: theme.spacing(2) }}
      control={
        <Switch
          disabled={props.disabled}
          inputRef={ref}
          onChange={() => {
            setChecked(!checked);
          }}
          checked={checked}
        />
      }
      label={props.label}
    />
  );
});

export default memo(ReSwitch);
