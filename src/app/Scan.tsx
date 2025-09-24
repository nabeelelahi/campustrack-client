import { QrReader } from "react-qr-reader";

function Scan() {
  return (
    <div>
      <h2>Scan QR</h2>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (result) {
            console.log("QR Result:", result?.getText());
          }
          if (error) {
            console.info(error);
          }
        }}
        // style={{ width: "100%" }}
      />
    </div>
  );
}

export default Scan;
