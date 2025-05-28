"use client";
// ^^ this runs client side
import React, { useState,useEffect } from "react";
import "./social.css";

const Quote = ({ text,link,image }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    return (
        <a href={link} className="container" target="_blank">
            <img className="socialImage" src={image}></img>
            <p className="socialText" href={link}>{text}</p>
        </a>
    );
}

export default Quote;