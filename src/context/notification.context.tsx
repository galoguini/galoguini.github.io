import { AlertColor } from "@mui/material";
import React, { useContext } from "react";
import { Notification } from "../components";

type ContextProps = {
    getError: (msg: string) => void
    getSuccess: (msg: string) => void
    getInfo: (msg: string) => void
    getWarning: (msg: string) => void
}

const NotificationContext = React.createContext<ContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [msg, setMsg] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<AlertColor | undefined>(undefined);

    const handleClose = () => {
        setOpen(false)
    }

    const getError = (msg: string) => {
        setSeverity("error")
        setOpen(true)
        setMsg(msg)
    };

    const getSuccess = (msg: string) => {
        setSeverity("success")
        setOpen(true)
        setMsg(msg)
    };

    const getInfo = (msg: string) => {
        setSeverity("info")
        setOpen(true)
        setMsg(msg)
    };

    const getWarning = (msg: string) => {
        setSeverity("warning")
        setOpen(true)
        setMsg(msg)
    };

    const value = {
        getError,
        getSuccess,
        getInfo,
        getWarning,
    }

    return (
        <NotificationContext.Provider value={value}>
            <Notification handleClose={handleClose} open={open} severity={severity} msg={msg} />{children}
        </NotificationContext.Provider>
    )
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("No existe contexto");
    return context;
}