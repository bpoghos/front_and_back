import { useState } from 'react';
import './App.css';
import { AddTable } from './components/AddTable/AddTable';
import { Filter } from './components/Filter/Filter';
import { Tables } from './components/Tables/Tables';

function App() {


  const [results, setResults] = useState([])



  const search = async (inputValue) => {
    try {
      const response = await fetch(`http://localhost:4500/?q=${inputValue}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  console.log(results);



  return (
    <div className="App">
      <div className="filter-container">
        <Filter search={search} results={results}/>
        <AddTable />
      </div>
      <Tables results={results}/>
    </div>
  );
}

export default App;
