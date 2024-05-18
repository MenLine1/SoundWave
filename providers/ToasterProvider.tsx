"use client";

import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return(
        <Toaster
            toastOptions={{
                style:{
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '15px',
                }
            }}
        />
    )
}

export default ToasterProvider;