"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };

export class ErrorBoundary extends Component<Props, { erro: boolean }> {
  state = { erro: false };

  static getDerivedStateFromError() {
    return { erro: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Coração 3D]", error);
  }

  render() {
    return this.state.erro ? this.props.fallback : this.props.children;
  }
}
