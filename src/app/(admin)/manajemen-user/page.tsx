import User from "@/components/Manajemen-user/User";
import { Fragment } from "react";

type Props = {};
export const metadata = {
  title: "Admin - User",
};

const page = (props: Props) => {
  return (
    <Fragment>
      <User />
    </Fragment>
  );
};

export default page;
