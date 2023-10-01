import DashboardPage from "@/components/Dashboard/DashboardPage";
import { Fragment } from "react";

type Props = {};

export const metadata = {
  title: "Admin - Dashboard",
};

const page = async (props: Props) => {
  return (
    <Fragment>
      <DashboardPage />
    </Fragment>
  );
};

export default page;
