import { useEffect, useState } from "react"
import { AddTable } from "../../components/AddTable/AddTable"
import { Filter } from "../../components/Filter/Filter"
import { Tables } from "../../components/Tables/Tables"

import styles from "./HomePage.module.css"


export const HomePage = () => {


    const [results, setResults] = useState([])

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
    return (
        <div className={styles.homePage}>
            <div className={styles.filterContainer}>
                <Filter />
                <AddTable results={results} setResults={setResults} />
            </div>
            <Tables results={results} setResults={setResults} />
        </div>
    )
}