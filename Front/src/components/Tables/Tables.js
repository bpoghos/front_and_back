import { Table } from "./Table/Table"
import { useState } from "react";

import styles from "./Tables.module.css"

export const Tables = ({ results, setResults, handleEditButtonClick, editClick }) => {

  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);

  

  const handleSortClickNumber = (columnName) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    setSortedColumn(columnName);

    const sortedResults = [...results].sort((a, b) => {
        if (direction === "asc") {
            return a[columnName] < b[columnName] ? -1 : 1;
        } else {
            return b[columnName] < a[columnName] ? -1 : 1;
        }
    });

    setResults(sortedResults);
};

const handleSortClickString = (columnName) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    setSortedColumn(columnName);

    const sortedResults = [...results].sort((a, b) => {
        const nameA = a[columnName].toUpperCase();
        const nameB = b[columnName].toUpperCase();

        if (direction === "asc") {
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        } else {
            if (nameB < nameA) return -1;
            if (nameB > nameA) return 1;
            return 0;
        }
    });

    setResults(sortedResults);
};


  return (
    <div className={styles.tables}>
      <h1>Tables</h1>
      <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th onClick={() => handleSortClickNumber("group_num", sortDirection, setSortDirection, setSortedColumn, results, setResults)}>Group</th>
                        <th onClick={() => handleSortClickNumber("student_id", sortDirection, setSortDirection, setSortedColumn, results, setResults)}>ID</th>
                        <th onClick={() => handleSortClickString("name")}>Name</th>
                        <th onClick={() => handleSortClickString("surname")}>Surname</th>
                        <th onClick={() => handleSortClickString("email_address")}>Email</th>
                        <th onClick={() => handleSortClickNumber("age")}>Age</th>
                        <th onClick={() => handleSortClickString("course_name")}>Course</th>
                        <th onClick={() => handleSortClickString("course_teacher")}>Teacher</th>
                        <th onClick={() => handleSortClickString("course_details")}>Details</th>
                        <th onClick={() => handleSortClickString("enrollment_date")}>Date</th>
                    </tr>
                </thead>
                <tbody>
      {
        
        results.map((d) => (
          <Table
            key={d.enrollment_id}
            d={d} // Add a unique key prop for each table
            results={results}
            setResults={setResults}
            handleEditButtonClick={handleEditButtonClick}
            editClick={editClick}
          />
        ))
      }
      </tbody>
            </table>
    </div>
  )
}


