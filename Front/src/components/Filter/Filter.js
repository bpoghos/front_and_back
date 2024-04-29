import { useState } from "react"
import styles from "./Filter.module.css"

export const Filter = ({ results, setSearchResults }) => {
 


    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) return setSearchResults(results);
    
        const searchedResults = results.filter(item =>
            (item.name && item.name.toLowerCase().includes(query)) || 
            (item.course_name && item.course_name.toLowerCase().includes(query))
        );
        setSearchResults(searchedResults);
    }
    

    
    return (
        <div className={styles.filter}>
            <h1>Filter</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
            />


        </div>
    )
}


