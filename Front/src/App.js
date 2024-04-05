import './App.css';
import { AddTable } from './components/AddTable/AddTable';
import { Filter } from './components/Filter/Filter';
import { Tables } from './components/Tables/Tables';

function App() {
  return (
    <div className="App">
      <div className="filter-container">
        <Filter />
        <AddTable />
      </div>
      <Tables />
    </div>
  );
}

export default App;
