import AppBarAdmin from "@/components/AppBarAdmin";
import DrawerAdmin from "@/components/DrawerAdmin";
import { Box, Toolbar } from "@mui/material";

export const metadata = {
  title: "Admin",
};

const borderRoot = "1px solid rgb(229, 234, 242)";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarAdmin />
      <DrawerAdmin />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${245}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
