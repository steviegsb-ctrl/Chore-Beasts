import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { /* TODO: send to Sentry */ }
  render() { return this.state.hasError ? (this.props.fallback ?? null) : this.props.children; }
}
