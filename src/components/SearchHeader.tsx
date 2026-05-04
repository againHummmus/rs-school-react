import React from 'react';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

type HeaderPropsType = {
  searchItem: string;
  setSearchItem: (searchItem: string) => void;
};

type HeaderStateType = {
  inputValue: string;
};

export default class SearchHeader extends React.Component<HeaderPropsType, HeaderStateType> {
  constructor(props: HeaderPropsType) {
    super(props);
    this.state = { inputValue: props.searchItem };
  }

  handleSearch = () => {
    const cleanValue = this.state.inputValue.trim();
    this.props.setSearchItem(cleanValue);
  };

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  componentDidUpdate(prevProps: Readonly<HeaderPropsType>): void {
    if (prevProps.searchItem !== this.props.searchItem) {
      this.setState({ inputValue: this.props.searchItem });
    }
  }

  render() {
    return (
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <h1 className="text-text font-display text-center text-7xl">
          Search for anime
        </h1>
        
        <div className='flex gap-2 items-center'>
          <TextInput
            value={this.state.inputValue}
            onChange={this.onChangeInput}
            placeholder="Search for a character..."
          />
          
          <Button
            onClick={this.handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}