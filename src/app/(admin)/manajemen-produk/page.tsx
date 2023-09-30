import Product from "@/components/Manajemen-product/Product";
import { Fragment } from "react";

type Props = {};
export const metadata = {
  title: "Admin - Product",
};

const page = (props: Props) => {
  return (
    <Fragment>
      <Product />
    </Fragment>
  );
};

export default page;
