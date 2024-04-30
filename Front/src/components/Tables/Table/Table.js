import { useState } from "react";
import { Link } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
import { FaRegFileLines, FaPencil } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";

import styles from "../Tables.module.css";

// Define the Table component
export const Table = ({ results, setResults, d }) => {

    // State variables for checkbox and edit mode
    const [checkClick, setCheckClick] = useState(false);
    const [editClick, setEditClick] = useState({});

    // State variable to manage field data
    const [fieldsData, setFieldsData] = useState({
        group_num: d?.group_num || '',
        name: d?.name || '',
        surname: d?.surname || '',
        email_address: d?.email_address || '',
        age: d?.age || '',
        course_name: d?.course_name || '',
        course_teacher: d?.course_teacher || '',
        course_details: d?.course_details || '',
        enrollment_date: d?.enrollment_date || ''
    });

    // Function to handle checkbox click
    const handleCheckClick = (data_id) => {
        setCheckClick(true);
    };

    // Function to delete data
    const deleteData = async (id) => {
        try {
            // Send DELETE request to server
            const response = await fetch(`http://localhost:4500/resources/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check if request is successful
            if (response.ok) {
                // Remove deleted item from results
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

    // Function to handle field changes
    const handleChangeField = (field, value) => {
        setFieldsData(prevFieldsData => ({
            ...prevFieldsData,
            [field]: value || ''
        }));
    };

    // Function to handle edit button click
    const handleEditButtonClick = (id) => {
        setEditClick((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Function to handle field editing and update
    const clickChangeField = async (id) => {
        try {
            // Send PUT request to update data
            const response = await fetch(`http://localhost:4500/resources/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fieldsData),
            });

            // Check if request is successful
            if (response.ok) {
                // Wait for the JSON response
                const updatedData = await response.json();
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Render the component
    return (
        <>
            {
                <tr key={d.enrollment_id}>
                    <td className={styles.inputTD}>
                        <input type="checkbox" onClick={() => handleCheckClick(d.enrollment_id)} />
                    </td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.group_num} onChange={(e) => handleChangeField('group_num.', e.target.value)} /> : d.group_num}</td>
                    <td>{d.student_id}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.name} onChange={(e) => handleChangeField('name', e.target.value)} /> : d.name}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.surname} onChange={(e) => handleChangeField('surname', e.target.value)} /> : d.surname}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.email_address} onChange={(e) => handleChangeField('email_address', e.target.value)} /> : d.email_address}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.age} onChange={(e) => handleChangeField('age', e.target.value)} /> : d.age}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.course_name} onChange={(e) => handleChangeField('course_name', e.target.value)} /> : d.course_name}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.course_teacher} onChange={(e) => handleChangeField('course_teacher', e.target.value)} /> : d.course_teacher}</td>
                    <td>{editClick[d.enrollment_id] ? <textarea type="text" value={fieldsData?.course_details} onChange={(e) => handleChangeField('course_details', e.target.value)} /> : d.course_details}</td>
                    <td>{editClick[d.enrollment_id] ? <input type="text" value={fieldsData?.enrollment_date} onChange={(e) => handleChangeField('enrollment_date', e.target.value)} /> : d.enrollment_date}</td>
                    <td>
                        <Link to={`/${d.enrollment_id}`}>
                            <div><FaRegFileLines /></div>
                        </Link>
                    </td>
                    <td>
                        <div
                            onClick={() => handleEditButtonClick(d.enrollment_id)}
                            className={styles.editButton}>
                            {editClick[d.enrollment_id] ? <MdOutlineDone style={{ color: 'green' }} onClick={() => clickChangeField(d.enrollment_id)} /> : <FaPencil />}
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
    );
};
