import React from "react"
import SearchInput from "./components/SearchInput"
import SearchOutput from "./components/SearchOutput"

class App extends React.Component {

  render() {
    return (
      <div className='container my-16 lg:my-20 flex flex-col'>
        <SearchInput />
        <SearchOutput/>
      </div>
    )
  }
}

export default App
