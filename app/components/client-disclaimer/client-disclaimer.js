"use client";
import { useState } from "react";

import "./client-disclaimer.css";

export default function ClientDisclaimer({ children }) {
  const [accepted, setAccepted] = useState(false);

  if (!accepted) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        textAlign: "center",
      }}>
        <div className="lines"></div>
        <h1 className="text-red-800 bg-amber-400 w-full header-title">Disclaimer</h1>
        <p className="w-2xl">This site uses autoplaying media. Click the lock icon on the left of the URL &gt; Connection Secure &gt; More Information &gt; Permissions &gt; Autoplaying, disable Use default and allow.</p>
        <button
          onClick={() => setAccepted(true)}
          className="buttonContainer"
        >
          Continue
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
