// src/components/Loading.jsx
import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid #ddd",
          borderTopColor: "#333",
          display: "inline-block",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>{text}</span>

      <style>{`
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
}
