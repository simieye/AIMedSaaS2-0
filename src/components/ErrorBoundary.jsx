// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">出错了</h2>
          <p className="text-gray-600 mb-4">很抱歉，发生了一些错误。请刷新页面重试。</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            刷新页面
          </button>
        </div>;
    }
    return this.props.children;
  }
}