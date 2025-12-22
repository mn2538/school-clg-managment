import React, { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
        };

        if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        }

        return () => {
        document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={overlay} onClick={onClose}>
            <div style={modal} 
            onClick = {(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const modal = {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    width: "400px"
};
