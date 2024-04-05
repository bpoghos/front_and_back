import styles from "./Table.module.css"

export const Table = ({ data }) => {



    console.log(data);

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d) => {
                            return <tr key={d.enrollment_id}>
                                <td>{d.group_num}</td>
                                <td>{d.student_id}</td>
                                <td>{d.name}</td>
                                <td>{d.surname}</td>
                                <td>{d.email_address}</td>
                                <td>{d.age}</td>
                                <td>{d.course_name}</td>
                                <td>{d.course_teacher}</td>
                                <td>{d.course_details}</td>
                                <td>{d.enrollment_date}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}