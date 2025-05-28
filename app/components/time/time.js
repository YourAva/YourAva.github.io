"use client";
// ^^ this runs client side
import React, { useState, useEffect } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <p>{time.toLocaleTimeString()}</p>
  );
};

export default Time;
