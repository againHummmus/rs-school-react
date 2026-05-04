import React from 'react';

interface State {
  error: Error | null;
}

export default class ErrorButton extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null };
  }

  handleClick() {
    this.setState({ error: new Error('This is a test error!') });
  }

  render() {
    if (this.state.error) throw this.state.error;

    return (
      <button
        className="cursor-pointer fixed bottom-3 left-3 rounded-xl bg-red-700/40 border border-text text-text px-6 py-2 font-bold hover:bg-red-700/50 transition-all"
        onClick={() => this.handleClick()}
      >
        Throw error!
      </button>
    );
  }
}
