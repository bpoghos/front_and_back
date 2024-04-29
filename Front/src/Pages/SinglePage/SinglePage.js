import { useParams } from "react-router-dom"
import styles from "./SinglePage.module.css"
import { useEffect, useState } from "react";

export const SinglePage = () => {

    const [data, setData] = useState([])

    const params = useParams()

    const { id } = params



    const getStudent = async (s_id) => {
        const data = await fetch(`http://localhost:4500/resources/${s_id}`)
        const res = await data.json()
        setData(res)
    }

    useEffect(() => {
        getStudent(id)
    }, [id])



    return (
        <div className={styles.singlePage}>
            <h2>Name: {data.name}</h2>
            <h2>Surname: {data.surname}</h2>
            <p><strong>Email: </strong>{data.email_address}</p>
            <p><strong>Coures Name: </strong>{data.course_name}</p>
            <p><strong>Course Teacher: </strong>{data.course_teacher}</p>
            <p><strong>Date: </strong>{data.enrollment_date}</p>

        </div>
    )
}