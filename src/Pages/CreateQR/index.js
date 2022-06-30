import * as React from "react";
import QRCode from "qrcode";
import { Box, Button, TextField } from "@mui/material";

function CreateQR() {
  const [text, setText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {/* <h1>Create QR</h1> */}
      <TextField
        fullWidth
        id="standard-basic"
        label="Enter content"
        variant="standard"
        placeholder="Type somethings..."
        onChange={(e) => setText(e.target.value)}
        sx={{mb:2}}
      />
      <Box sx={{display:"flex", justifyContent:"flex-end"}}>
      <Button sx={{mb:2}}onClick={() => generateQrCode()} variant="contained">Generate</Button>
      </Box>
      {/* <button onClick={() => generateQrCode()}>Generate</button> */}
      {imageUrl ? (
        <a href={imageUrl} download>
          <img src={imageUrl} alt="qrcode" width="100%" />
        </a>
      ) : null}
    </React.Fragment>
  );
}

export default CreateQR;
