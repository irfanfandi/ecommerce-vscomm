import { Box } from "@mui/material";
import { Fragment } from "react";

export const metadata = {
  title: "Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>{children}</Box>
    </Fragment>
  );
}
