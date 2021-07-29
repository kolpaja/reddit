import React from "react";
import "./Modal.styles.scss";

function Modal(props) {
  return (
    <div className="Modal">
      <div className="Modal__backdrop" onClick={props.onClose} />
      <card className="Modal__card">
        <header className="Modal__header">
          <h2>Modal Sample</h2>
        </header>
        <div className="Modal__content">
          <p>Hello there</p>
        </div>
        <footer className="Modal__actions">
          <button onClick={props.onClose}>Okay</button>
        </footer>
      </card>
    </div>
  );
}

export default Modal;
