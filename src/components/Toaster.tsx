"use client";
import React from 'react';
import {Bounce, ToastContainer} from "react-toastify";

function Toaster(props: { theme?: string | undefined; }) {
    const {theme} = props;
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
            theme={theme || "dark"}
            transition={Bounce}
        />
    );
}

export default Toaster;