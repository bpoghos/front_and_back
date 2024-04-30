import styles from "./Filter.module.css";

// Filter component receives handleSearchChange function as prop
export const Filter = ({ handleSearchChange }) => {
 
    // Function to handle input change
    const handleInputChange = (e) => {
        // Call handleSearchChange function with input value
        handleSearchChange(e.target.value);
    };

    // Render the component
    return (
        <div className={styles.filter}>
            <h1>Filter</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={handleInputChange} 
            />
        </div>
    );
};
