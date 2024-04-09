import { useState } from "react"
import styles from "./Filter.module.css"

export const Filter = () => {

    const [text, setText] = useState('')

    const handleChangeInput = (e) => {
        const inputValue = e.target.value;
        setText(inputValue)
       
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
           

        </div>
    )
}


