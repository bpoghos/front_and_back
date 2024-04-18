import { useState } from "react"
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa";
import { FaRegFileLines, FaPencil } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import styles from "../Tables.module.css"

export const Table = ({ results, setResults, d }) => {


    const [checkClick, setCheckClick] = useState(false)
    const [editClick, setEditClick] = useState({})






    const handleCheckClick = (data_id) => {
        setCheckClick(true)
        if (checkClick) {

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



    const handleChangeField = async (id, field, value) => {
        try {
            const response = await fetch(`http://localhost:4500/resources/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [field]: value }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setResults((prevResults) => 
                    prevResults.map((item) => 
                        item.enrollment_id === id ? { ...item, ...updatedData } : item
                    )
                );
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };


    const handleEditButtonClick = (id) => {
        setEditClick((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };


    return (
        <>
            {
                <tr key={d.enrollment_id}>
                    <td className={styles.inputTD}>
                        <input type="checkbox" onClick={() => handleCheckClick(d.enrollment_id)} />
                    </td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.group_num} onChange={(e) => handleChangeField(d.enrollment_id, 'group_num', e.target.value)}/> : d.group_num}</td>
                    <td>{d.student_id}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.name} onChange={(e) => handleChangeField(d.enrollment_id, 'name', e.target.value)} /> : d.name}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.surname} onChange={(e) => handleChangeField(d.enrollment_id, 'surname', e.target.value)} /> : d.surname}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.email_address} onChange={(e) => handleChangeField(d.enrollment_id, 'email_address', e.target.value)} /> : d.email_address}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.age} onChange={(e) => handleChangeField(d.enrollment_id, 'age', e.target.value)} /> : d.age}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.course_name} onChange={(e) => handleChangeField(d.enrollment_id, 'course_name', e.target.value)} /> : d.course_name}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.course_teacher} onChange={(e) => handleChangeField(d.enrollment_id, 'course_teacher', e.target.value)} /> : d.course_teacher}</td>
                    <td>{editClick[d.enrollment_id] ? <textarea type="text" value={d.course_details} onChange={(e) => handleChangeField(d.enrollment_id, 'course_details', e.target.value)} /> : d.course_details}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={d.enrollment_date} onChange={(e) => handleChangeField(d.enrollment_id, 'enrollment_date', e.target.value)} /> : d.enrollment_date}</td>
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
            }
        </>
    )
}