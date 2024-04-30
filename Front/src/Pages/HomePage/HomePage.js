import { useEffect, useState } from "react"
import { AddTable } from "../../components/AddTable/AddTable"
import { Filter } from "../../components/Filter/Filter"
import { Tables } from "../../components/Tables/Tables"

import styles from "./HomePage.module.css"


export const HomePage = () => {


    const [results, setResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    // Get all data function part


    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:4500/resources`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    

    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    
    const filteredResults = searchQuery
        ? results.filter(item =>
            item.name && item.name.toLowerCase().includes(searchQuery)
          )
        : results;

    // Edit function part

   

    return (
        <div className={styles.homePage}>
            <div className={styles.filterContainer}>
                <Filter handleSearchChange={handleSearchChange}/>
                <AddTable results={results} setResults={setResults} />
            </div>
            <Tables
                results={filteredResults}
                setResults={setResults}
            />
        </div>
    )
}