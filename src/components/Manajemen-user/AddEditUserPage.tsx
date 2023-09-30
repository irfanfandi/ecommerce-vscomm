import { Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { useEffect, useRef } from "react";
import ReButtonSubmit, { ButtonHandle } from "../ReButtonSubmit";
import ReInput, { InputHandle } from "../ReInput";

const AddEditUserPage = ({
  selectedData,
  onCloseModal,
}: {
  selectedData: any;
  onCloseModal: () => void;
}) => {
  const theme: any = useTheme();
  const _refEmail = useRef<InputHandle>(null);
  const _refName = useRef<InputHandle>(null);
  const _refPhone = useRef<InputHandle>(null);
  const _refButtonSubmit = useRef<ButtonHandle>(null);

  const handleSubmit = async () => {
    _refButtonSubmit.current?.setLoadingButton(true);
    const payload = {
      id: selectedData ? selectedData.id : "",
      name: _refName.current?.getValue(),
      phone: _refPhone.current?.getValue(),
      email: _refEmail.current?.getValue(),
      role: "USER",
      password: `user${_refName.current?.getValue()}`,
    };

    try {
      const ress = selectedData
        ? await axios.put("api/user", payload)
        : await axios.post("api/user", payload);
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
    _refPhone.current?.setDefaultValue(selectedData.phone);
    _refEmail.current?.setDefaultValue(selectedData.email);
  };

  useEffect(() => {
    if (selectedData) {
      setDefaultValuEdit();
    }
  }, []);

  return (
    <>
      <ReInput ref={_refName} label="Nama" required={true} />
      <ReInput ref={_refPhone} label="Nomor Telepon (+62)" required={true} />
      <ReInput ref={_refEmail} label="Email" required={true} />
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

export default AddEditUserPage;
