"use client";
import { Box, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
  bgColor: string;
  title: string;
};

const ReChipStatus = (props: Props) => {
  return (
    <Box
      sx={{
        p: 0.5,
        px: 1,
        borderRadius: "10px",
        backgroundColor: props.bgColor,
      }}
    >
      <Typography color={"white"} fontSize={13} fontWeight={500}>
        {props.title}
      </Typography>
    </Box>
  );
};

export default memo(ReChipStatus);
