import { useEffect, useState } from 'react';
import styles from "./Tables.module.css"
import { Table } from "./Table/Table"

export const Tables = () => {


    const [results, setResults] = useState([])

    const getData = async () => {
        try {
          const response = await fetch(`http://localhost:4500`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        getData()
      }, [])
      
    return (
        <div className={styles.tables}>
            <h1>Tables</h1>
            <Table results={results} />
        </div>
    )
}


