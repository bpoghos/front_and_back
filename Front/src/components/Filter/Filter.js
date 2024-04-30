import styles from "./Filter.module.css"

export const Filter = ({ handleSearchChange }) => {
 

    const handleInputChange = (e) => {
        handleSearchChange(e.target.value);
    };


    
    return (
        <div className={styles.filter}>
            <h1>Filter</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />


        </div>
    )
}


