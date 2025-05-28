"use client";
// ^^ this runs client side
import React, { useState,useEffect } from "react";

const Quote = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // This runs once on load, getting us the index of the random quote we're using.
    // It only runs on component load because of the [] at the end.
    useEffect(() => {
        setCurrentIndex(Math.floor(Math.random() * items.length));
    }, []);
    
    return (
        <div>
            <p>{items[currentIndex]}</p>
        </div>
    );
}

export default Quote;