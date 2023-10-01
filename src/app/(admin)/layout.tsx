import AppBarAdmin from "@/components/AppBarAdmin";
import DrawerAdmin from "@/components/DrawerAdmin";
import { authOptions } from "@/lib/auth";
import { Box, Toolbar } from "@mui/material";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Admin",
};

const borderRoot = "1px solid rgb(229, 234, 242)";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarAdmin user={user} />
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
