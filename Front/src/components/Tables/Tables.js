import { useEffect, useState } from "react"
import styles from "./Tables.module.css"
import { Table } from "./Table/Table"

export const Tables = () => {


    const [data, setData] = useState([])

    const getData = async () => {
        const data = await fetch("http://localhost:4500/")
        const res = await data.json()
        setData(res)
    }



    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.tables}>
            <h1>Tables</h1>
            <Table data={data}/>
        </div>
    )
}


