import { AddTable } from './components/AddTable/AddTable';
import { Filter } from './components/Filter/Filter';
import { Tables } from './components/Tables/Tables';
import './App.css';

function App() {




  return (
    <div className="App">
      <div className="filter-container">
        <Filter />
        <AddTable />
      </div>
      <Tables/>
    </div>
  );
}

export default App;
