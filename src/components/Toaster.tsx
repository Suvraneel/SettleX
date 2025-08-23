import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

function Toaster() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={"dark"}
      transition={Bounce}
    />
  );
}

export default Toaster;
