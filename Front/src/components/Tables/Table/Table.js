import { useState } from "react"

import { FaTrash } from "react-icons/fa";
import styles from "./Table.module.css"

export const Table = ({ results, setResults }) => {


    const [checkClick, setCheckClick] = useState(false)


    const handleCheckClick = (data_id) => {
        setCheckClick(true)
            if (checkClick) {
                console.log(data_id); 
        }
  
    };


   const deleteData = async (id) => {
    try {
        const response = await fetch(`http://localhost:4500/resources/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setResults(results.filter(d => d.enrollment_id !== id));
        } else {
            // If the server returns an error status code (4xx or 5xx), throw an error
            throw new Error('Failed to delete data');
        }
    } catch (error) {
        // If an error occurs during the fetch operation, log the error and re-throw it
        console.error('Error:', error);
        throw error;
    }
};

    



    

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
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
                        results.map((d) => {
                            return <tr key={d.enrollment_id}>
                                <td className={styles.inputTD}><input type="checkbox" onClick={() => handleCheckClick(d.enrollment_id)} /></td>
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
                                <td className={styles.buttonTD} onClick={() => deleteData(d.enrollment_id)}><button ><FaTrash /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}