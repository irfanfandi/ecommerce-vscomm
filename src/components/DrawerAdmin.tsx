import { BookOnline, HomeMaxOutlined, Person } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Fragment } from "react";

type Props = {};

const MENU_ADMIN = [
  { title: "Dashboard", icon: <HomeMaxOutlined /> },
  { title: "Manajemen User", icon: <Person /> },
  { title: "Manajemen Produk", icon: <BookOnline /> },
];
const DrawerAdmin = (props: Props) => {
  return (
    <Fragment>
      <Drawer
        sx={{
          width: 245,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 245,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {MENU_ADMIN.map(({ title, icon }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
};

export default DrawerAdmin;
