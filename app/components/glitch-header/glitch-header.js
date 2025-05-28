"use client";
// ^^ this runs client side
import React, { useState,useEffect } from "react";
import "./glitch-header.css";

const Glitch_Header = ({ title,start }) => {
    const [displayed, setDisplayed] = useState("");
    const [step, setStep] = useState(0);
    const randomCharPool = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
        "-", "=", "{", "}", "[", "]", ":", ";", "\"", "'", "<", ">",
        ",", ".", "?", "/", "~", "`", "|", " "
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Stop when done
            if (step > title.length) {
                clearInterval(interval);
                return;
            }

            // Build the string
            const lockedPart = title.slice(0, step);
            const randomPart = Array.from(title.slice(step))
                .map(() => randomCharPool[Math.floor(Math.random() * randomCharPool.length)])
                .join("");

            setDisplayed(lockedPart + randomPart);
            setStep(prev => prev + 1);
        }, 120); // Set interval speed

        return () => clearInterval(interval); // cleanup
    }, [step, title]);

    return (
        <div>
            <h1 className="glitch-header">{displayed}</h1>
        </div>
    );
}

export default Glitch_Header;