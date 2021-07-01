import React, { Component } from "react";
import "./error-boundary.styles.scss";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-image-overlay">
          <h2>Sorry 😔 Something went wrong... </h2>
          <div className="error-image-container"></div>
        </div>
      );
    }

    return this.props.children;
  }
}
