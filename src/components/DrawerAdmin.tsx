"use client";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MuiList from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MENU_ADMIN } from "./ListMenu";

const List = styled(MuiList)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: 10,
  ".MuiListItemText-root": {
    marginLeft: 0,
  },
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
    color: "white",
  },
  "&& .MuiListItemButton-root:hover": {
    borderRadius: 0,
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    marginTop: 8,
    marginBottom: 8,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 12,
  },
}));

type Props = {};

const DrawerAdmin = (props: Props) => {
  const pathname = usePathname();
  const route = useRouter();

  useEffect(() => {
    console.log(pathname, "pathname");
  }, [pathname]);

  const isDrawerSelected = (name: string): boolean => {
    if (name === "Dashboard" && pathname === "/") return true;
    return pathname.includes(name.replace(" ", "-").toLowerCase());
  };

  return (
    <Box component="nav" sx={{ width: { sm: 245 }, flexShrink: { sm: 0 } }}>
      <Drawer
        sx={{
          width: 245,
          flexShrink: 0,
          border: 0,
          "& .MuiDrawer-paper": {
            width: 245,
            border: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {MENU_ADMIN.map(({ title, icon, link }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={isDrawerSelected(title)}
                onClick={() => {
                  route.push(link);
                }}
              >
                <ListItemIcon>{icon(isDrawerSelected(title))}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 450,
                  }}
                  primary={title}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default DrawerAdmin;
