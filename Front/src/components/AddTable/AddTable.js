import styles from "./AddTable.module.css"

export const AddTable = () => {
    return (
        <div className={styles.addTable}>
            <h1>Add Table</h1>
            <input className={styles.nameField} type="text" placeholder="Name" />
            <input className={styles.sureNameField} type="text" placeholder="SureName" />
            <button>ADD</button>
        </div>
    )
}


