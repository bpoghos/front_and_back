import { AddTable } from "../../components/AddTable/AddTable"
import { Filter } from "../../components/Filter/Filter"
import { Tables } from "../../components/Tables/Tables"

import styles from "./HomePage.module.css"


export const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.filterContainer}>
                <Filter />
                <AddTable />
            </div>
            <Tables />
        </div>
    )
}