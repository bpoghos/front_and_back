import styles from "./Filter.module.css"

export const Filter = () => {
    return (
        <div className={styles.filter}>
            <h1>Filter</h1>
            <button>All</button>
            <button>Students</button>
            <button>Courses</button>
        </div>
    )
}


