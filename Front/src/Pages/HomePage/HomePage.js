import { useEffect, useState } from "react";
import { AddTable } from "../../components/AddTable/AddTable";
import { Filter } from "../../components/Filter/Filter";
import { Tables } from "../../components/Tables/Tables";

import styles from "./HomePage.module.css";


export const HomePage = () => {
    // State variables to store results and search query
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Function to fetch data from the server
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:4500/resources`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        getData();
    }, []);

    // Function to handle search query change
    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    // Filter results based on search query
    const filteredResults = searchQuery
        ? results.filter(item =>
            item.name && item.name.toLowerCase().includes(searchQuery)
          )
        : results;

    // Render the component
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
    );
};
