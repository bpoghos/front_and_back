import { useState } from "react"
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa";
import { FaRegFileLines, FaPencil } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import styles from "./Table.module.css"

export const Table = ({ results, setResults, handleEditButtonClick, editClick }) => {


    const [checkClick, setCheckClick] = useState(false)
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortedColumn, setSortedColumn] = useState(null);
    


    const handleCheckClick = (data_id) => {
        setCheckClick(true)
        if (checkClick) {
            console.log(data_id);
        }

    };


    const handleSortClickNumber = (columnName) => {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(direction);
        setSortedColumn(columnName);

        const sortedResults = [...results].sort((a, b) => {
            if (direction === "asc") {
                return a[columnName] < b[columnName] ? -1 : 1;
            } else {
                return b[columnName] < a[columnName] ? -1 : 1;
            }
        });

        setResults(sortedResults);
    };

    const handleSortClickString = (columnName) => {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(direction);
        setSortedColumn(columnName);

        const sortedResults = [...results].sort((a, b) => {
            const nameA = a[columnName].toUpperCase();
            const nameB = b[columnName].toUpperCase();

            if (direction === "asc") {
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            } else {
                if (nameB < nameA) return -1;
                if (nameB > nameA) return 1;
                return 0;
            }
        });

        setResults(sortedResults);
    };

   


console.log(editClick);


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
                        <th onClick={() => handleSortClickNumber("group_num", sortDirection, setSortDirection, setSortedColumn, results, setResults)}>Group</th>
                        <th onClick={() => handleSortClickNumber("student_id", sortDirection, setSortDirection, setSortedColumn, results, setResults)}>ID</th>
                        <th onClick={() => handleSortClickString("name")}>Name</th>
                        <th onClick={() => handleSortClickString("surname")}>Surname</th>
                        <th onClick={() => handleSortClickString("email_address")}>Email</th>
                        <th onClick={() => handleSortClickNumber("age")}>Age</th>
                        <th onClick={() => handleSortClickString("course_name")}>Course</th>
                        <th onClick={() => handleSortClickString("course_teacher")}>Teacher</th>
                        <th onClick={() => handleSortClickString("course_details")}>Details</th>
                        <th onClick={() => handleSortClickString("enrollment_date")}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((d) => {
                            return <tr key={d.enrollment_id}>
                                <td className={styles.inputTD}>
                                    <input type="checkbox" onClick={() => handleCheckClick(d.enrollment_id)} />
                                </td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.group_num}/> : d.group_num}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.student_id}/> : d.student_id}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.name}/> : d.name}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.surname}/> : d.surname}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.email_address}/> : d.email_address}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.age}/> : d.age}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.course_name}/> : d.course_name}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.course_teacher}/> : d.course_teacher}</td>
                                <td>{editClick[d.enrollment_id] ? <textarea type="text" value={d.course_details}/> : d.course_details}</td>
                                <td>{editClick[d.enrollment_id] ? <input type="text" value={d.enrollment_date}/> : d.enrollment_date}</td>
                                <td>
                                    <Link to={`/${d.enrollment_id}`}>
                                        <div><FaRegFileLines /></div>
                                    </Link>
                                </td>
                                <td>
                                    <div
                                        onClick={() => handleEditButtonClick(d.enrollment_id)}
                                        className={styles.editButton}>
                                        {editClick[d.enrollment_id] ? <MdOutlineDone style={{ color: 'green' }} /> : <FaPencil />}
                                    </div>
                                </td>
                                <td
                                    className={styles.buttonTD}
                                    onClick={() => deleteData(d.enrollment_id)}>
                                    <button ><FaTrash /></button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}