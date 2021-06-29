import React from "react";
import "./spinner.styles.scss";

export default function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  );
}
