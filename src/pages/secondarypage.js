import React from "react";
import { useLocation } from "react-router-dom";

const pageStyles = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  fontFamily: "Poppins, sans-serif",
  padding: "20px",
  height: "100%",
};

const cardStyles = {
  width: "420px",
  padding: "35px 30px",
  borderRadius: "25px",
  background: "rgba(255,255,255,0.35)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const itemStyles = {
  margin: "15px 0",
  padding: "12px 15px",
  width: "90%",
  background: "#fdfdfd",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.1)",
  fontSize: "1.1rem",
  textAlign: "left",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
 
};

function Data() {
  const { state } = useLocation();

  if (!state)
    return (
      <h2
        style={{
          ...pageStyles,
          color: "white",
          fontSize: "2rem",
          textShadow: "0px 2px 5px rgba(0,0,0,0.4)",
        }}
      >
        No data received. Please submit the form first.
      </h2>
    );

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <h1 style={{ marginBottom: "20px", color: "black" }}>Submitted Data</h1>

        {state.map((field) => (
          <div key={field.id} style={itemStyles}>
            <strong style={{ color: "#555" }}>{field.placeholder}: </strong>
            <span style={{ color: "#000" }}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;

