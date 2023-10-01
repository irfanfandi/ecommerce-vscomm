import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const [file, setFile] = useState<File>();

  const handleSubmit = async () => {
    _refButtonSubmit.current?.setLoadingButton(true);
    const payload = new FormData();
    if (file) payload.set("image", file);
    payload.append("id", selectedData ? selectedData.id : "");
    payload.append("name", _refName.current?.getValue());
    payload.append("price", _refPrice.current?.getValue());
    payload.append("isActive", "true");

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
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item>
          <input
            type="file"
            name="image"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </Grid>
        <Typography
          variant="subtitle2"
          color={theme.palette.text.secondary}
          sx={{ mt: 2 }}
        >
          Upload Image Product (ration (9:16))
        </Typography>
      </Grid>

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
