"use client";
import ReButtonSubmit from "@/components/ReButtonSubmit";
import ReInput from "@/components/ReInput";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/navigation";

type Props = {};

const LoginForm = (props: Props) => {
  const theme: any = useTheme();
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          backgroundImage: 'url("../image/bg-login.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        container
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item px={"25%"}>
          <Typography variant="h4" align="center" fontWeight={600}>
            NAMA APLIKASI
          </Typography>
          <Typography
            variant="inherit"
            align="center"
            fontSize={12}
            sx={{ mt: theme.spacing(4) }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} component={Paper} elevation={0} square>
        <Box
          sx={{
            py: "30%",
            px: "25%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            Selamat Datang Admin
          </Typography>
          <Typography
            variant="inherit"
            color={"GrayText"}
            fontSize={12}
            sx={{ mt: theme.spacing(2) }}
          >
            Silahkan masukkan email atau nomor telepon dan password Anda untuk
            mulai menggunakan aplikasi
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <ReInput label="Email / Nomor Telpon" />
            <ReInput label="Password" />
            <Grid mt={theme.spacing(4)}>
              <ReButtonSubmit title="Masuk" onClick={handleSubmit} />
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
