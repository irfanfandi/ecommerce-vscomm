import { Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { useEffect, useRef } from "react";
import ReButtonSubmit, { ButtonHandle } from "../ReButtonSubmit";
import ReInput, { InputHandle } from "../ReInput";
import ReSwitch, { SwitchHandle } from "../ReSwitch";

const AddEditProductPage = ({
  selectedData,
  onCloseModal,
}: {
  selectedData: any;
  onCloseModal: () => void;
}) => {
  const theme: any = useTheme();
  const _refImage = useRef<InputHandle>(null);
  const _refName = useRef<InputHandle>(null);
  const _refPrice = useRef<InputHandle>(null);
  const _refButtonSubmit = useRef<ButtonHandle>(null);
  const _refIsActive = useRef<SwitchHandle>(null);

  const handleSubmit = async () => {
    _refButtonSubmit.current?.setLoadingButton(true);
    const payload = {
      id: selectedData ? selectedData.id : "",
      name: _refName.current?.getValue(),
      image: "/upload/product1.png",
      price: parseInt(_refPrice.current?.getValue()),
      isActive: _refIsActive.current?.getValue(),
    };

    try {
      const ress = selectedData
        ? await axios.put("api/product", payload)
        : await axios.post("api/product", payload);
      if (ress.status === 200) {
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
    _refButtonSubmit.current?.setLoadingButton(false);
  };

  const setDefaultValuEdit = () => {
    _refButtonSubmit.current?.setDisableButton(false);
    _refName.current?.setDefaultValue(selectedData.name);
    _refPrice.current?.setDefaultValue(selectedData.price);
    _refIsActive.current?.setDefaultValue(selectedData.isActive);
  };

  useEffect(() => {
    if (selectedData) {
      setDefaultValuEdit();
    }
  }, []);

  return (
    <>
      <ReInput ref={_refImage} label="Image" />
      <ReInput ref={_refName} label="Nama" required={true} />
      <ReInput ref={_refPrice} label="Harga" type="number" required={true} />
      <ReSwitch ref={_refIsActive} label="Aktif" />
      <Grid container justifyContent={"flex-end"} mt={theme.spacing(3)}>
        <ReButtonSubmit
          ref={_refButtonSubmit}
          onClick={() => {
            handleSubmit();
          }}
          title="Simpan"
        />
      </Grid>
    </>
  );
};

export default AddEditProductPage;
