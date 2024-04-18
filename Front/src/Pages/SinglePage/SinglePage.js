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
    }, [])



    return (
        <div className={styles.singlePage}>
            <table>
                <thead>
                    <th>Group</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Details</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.group_num}</td>
                    </tr>
                </tbody>
            </table>
            <h1>{data.name}</h1>
            <h1>{data.surname}</h1>
            <h1>{data.email_address}</h1>
            <h1>{data.course_name}</h1>
            <h1>{data.course_teacher}</h1>
        </div>
    )
}