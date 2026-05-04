import React from "react"
import SearchOutput from "./components/SearchOutput"
import ErrorBoundary from "./components/ui/ErrorBoundary";
import ErrorButton from "./components/ui/ErrorButton";
import SearchHeader from "./components/SearchHeader";

interface AppState {
  searchString: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {searchString: localStorage.getItem('lastSearch') || ''};
  }

  componentDidUpdate(_prevProps: {}, prevState: AppState) {
    if (prevState.searchString !== this.state.searchString) {
      localStorage.setItem('lastSearch', this.state.searchString);
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className='relative container my-16 lg:my-20 flex flex-col gap-4'>
          <SearchHeader searchItem={this.state.searchString} setSearchItem={(searchItem) => this.setState({searchString: searchItem})} />
          <SearchOutput searchItem={this.state.searchString} />
          <ErrorButton/>
        </div>
      </ErrorBoundary>
    )
  }
}

export default App
