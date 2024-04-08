import { useEffect, useState } from "react"
import styles from "./Filter.module.css"

export const Filter = ({ search, results }) => {

    const [text, setText] = useState('')

    const handleChangeInput = (e) => {
        const inputValue = e.target.value;
        setText(inputValue)
        search(inputValue)
    }




    return (
        <div className={styles.filter}>
            <h1>Filter</h1>
            <input
                type="text"
                value={text}
                placeholder="Search"
                onChange={handleChangeInput}
            />
            <ul>
                {results ? (
                    results.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))
                ) : (
                    <li>No results</li>
                )}
            </ul>

        </div>
    )
}


