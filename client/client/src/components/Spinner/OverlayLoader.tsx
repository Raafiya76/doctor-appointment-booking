import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

export default function OverlayLoader() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100%",
        background: "rgb(0, 0, 0,.3)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "99999",
      }}
    >
      <BeatLoader color="#fff" size={15} />
    </Box>
  );
}
