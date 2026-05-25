import React, { type ErrorInfo } from 'react';
import ErrorUI from '../ui/error-ui/ErrorUI';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: string | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('There was an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="h-screen w-full flex items-center justify-center"><ErrorUI error={this.state.error} /></div>;
    }

    return this.props.children;
  }
}
