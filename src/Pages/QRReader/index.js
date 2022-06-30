import { Fragment, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import qrSuccessSound from "../../sound/off.mp3";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
function MyQRReader() {
  const [data, setData] = useState("No result");
  const audioPlayer = useRef(null);
  const URL_EXPRESSION =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return (
    <Fragment>
      <audio ref={audioPlayer} src={qrSuccessSound} />
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        onResult={(result, error) => {
          if (!!result) {
            audioPlayer.current.play();
            setData(result?.text);
            console.log("sousdfsdfdsfdsfdsnd");
          }
          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <Box sx={{mt:3, textAlign:"center", width:"100%"}}>
        {/* <Typography sx={{wordWrap: "break-word"}}variant="body1" color="textPrimary">{data}</Typography> */}
          {data.match(URL_EXPRESSION) ? (
            <Link href={data} underline="hover" sx={{wordWrap: "break-word"}}>
              {data}
            </Link>
          ) : (
            <Typography variant="body1" color="textPrimary" sx={{wordWrap: "break-word"}}>
              Result: {data}
            </Typography>
          )}
      </Box>
    </Fragment>
  );
}

export default MyQRReader;
