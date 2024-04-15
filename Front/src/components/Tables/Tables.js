import { useEffect, useState } from 'react';
import styles from "./Tables.module.css"
import { Table } from "./Table/Table"

export const Tables = ({ results, setResults }) => {




  return (
    <div className={styles.tables}>
      <h1>Tables</h1>
      <Table results={results} setResults={setResults} />
    </div>
  )
}


