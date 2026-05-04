import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick, children, className } = this.props;
    return (
      <button onClick={onClick} className={className ?? 'cursor-pointer h-10 px-6 bg-accent/20 border border-accent text-white rounded-lg hover:bg-accent/30 transition-all font-semibold'}>
        {children}
      </button>
    );
  }
}
