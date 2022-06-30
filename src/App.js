import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MyQRReader from "./Pages/QRReader";
import CreateQR from "./Pages/CreateQR";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const [menuValue, setMenuValue] = React.useState(0);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QR Scanner
            </Typography>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          mt: 3,
          paddingBottom: "100px",
          pl: 2,
          pr: 2,
          bgcolor: "background.default",
        }}
      >
        {menuValue ? <CreateQR /> : <MyQRReader />}
      </Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          sx={{ justifyContent: "space-between" }}
          value={menuValue}
          onChange={(event, newValue) => {
            setMenuValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="QR Scanner"
            icon={<QrCodeScannerIcon />}
          />
          <BottomNavigationAction label="Create QR" icon={<QrCodeIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary:{
            main:"#00897b"
          },
          mode,
        },
      }),
    [mode]
  );

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#00897b",
  //     },
  //   },
  // });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
