import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Box, CssBaseline } from "@mui/material";
import * as React from "react";

export const metadata = {
  title: "VascommShop",
};

const DRAWER_WIDTH = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
