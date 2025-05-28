"use client";
// ^^ this runs client side
import React, { useState,useEffect } from "react";
import "./marquee.css";

const Maraquee = ({ items }) => {
    return (
        <div>
            <div className="marquee-container">
                <div className="marquee-content">
                    <span>🚀 Welcome to the stream! Follow for more! 🚀</span>
                    <span>🚀 Welcome to the stream! Follow for more! 🚀</span>
                </div>
            </div>
        </div>
    );
}

export default Maraquee;