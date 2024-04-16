import { useEffect, useState } from "react"
import { AddTable } from "../../components/AddTable/AddTable"
import { Filter } from "../../components/Filter/Filter"
import { Tables } from "../../components/Tables/Tables"

import styles from "./HomePage.module.css"


export const HomePage = () => {
    const [editClick, setEditClick] = useState({})

    const [results, setResults] = useState([])

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

    console.log(results);

    // Edit function part

    const handleEditButtonClick = (id) => {
        setEditClick((prevState) => ({
            [id]: !prevState[id] // Toggle the edit state for the specific post ID
        }));

    }


    return (
        <div className={styles.homePage}>
            <div className={styles.filterContainer}>
                <Filter />
                <AddTable results={results} setResults={setResults} editClick={editClick}/>
            </div>
            <Tables
                results={results}
                setResults={setResults}
                handleEditButtonClick={handleEditButtonClick}
                editClick={editClick}
            />
        </div>
    )
}