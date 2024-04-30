import { useState } from "react";
import styles from "./AddTable.module.css";

export const AddTable = ({ results, setResults }) => {

    // State variables to manage form inputs
    const [group_num, setGroup_num] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email_address, setEmail_address] = useState('');
    const [age, setAge] = useState('');
    const [course_name, setCourse_name] = useState('');
    const [course_teacher, setCourse_teacher] = useState('');
    const [course_details, setCourse_details] = useState('');
    const [enrollment_date, setEnrollment_date] = useState('');

    // Function to add data
    const addData = async () => {
        // Parse numeric fields
        const parsedGroupNum = parseInt(group_num);
        const parsedAge = parseInt(age);

        // Check if parsed values are not NaN
        if (!isNaN(parsedGroupNum) && !isNaN(parsedAge)) {
            // Create body object for POST request
            const body = {
                group_num: parsedGroupNum,
                name,
                surname,
                email_address,
                age: parsedAge,
                course_name,
                course_teacher,
                course_details,
                enrollment_date,
            };

            // Log body for debugging
            console.log(body);

            try {
                // Send POST request to add data
                const response = await fetch("http://localhost:4500/resources", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                });

                // Check if request is successful
                if (response.ok) {
                    console.log("Data submitted successfully");

                    // Fetch updated data and update results state
                    const updatedResponse = await fetch("http://localhost:4500/resources");
                    if (updatedResponse.ok) {
                        const updatedData = await updatedResponse.json();
                        setResults(updatedData);
                    } else {
                        console.error("Failed to fetch updated data:", updatedResponse.statusText);
                    }
                } else {
                    console.error("Failed to submit data:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to submit data:", error.message);
            }

            // Clear form inputs after submission
            setGroup_num('');
            setName('');
            setSurname('');
            setEmail_address('');
            setAge('');
            setCourse_name('');
            setCourse_details('');
            setCourse_teacher('');
            setEnrollment_date('');
        }
    };

    // Render the component
    return (
        <div className={styles.addTable}>
            <h1>Add Table</h1>
            <input
                className={styles.group_numField}
                type="text"
                placeholder="Group Number"
                value={group_num}
                onChange={(e) => setGroup_num(e.target.value)} />
            <input
                className={styles.nameField}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <input
                className={styles.sureNameField}
                type="text"
                placeholder="SureName"
                value={surname}
                onChange={(e) => setSurname(e.target.value)} />
            <input
                className={styles.emailField}
                type="text"
                placeholder="Email"
                value={email_address}
                onChange={(e) => setEmail_address(e.target.value)} />
            <input
                className={styles.ageField}
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)} />
            <input
                className={styles.course_nameField}
                type="text"
                placeholder="Course Name"
                value={course_name}
                onChange={(e) => setCourse_name(e.target.value)} />
            <input
                className={styles.course_teacherField}
                type="text"
                placeholder="Teacher Name"
                value={course_teacher}
                onChange={(e) => setCourse_teacher(e.target.value)} />
            <textarea
                className={styles.course_detailsField}
                type="textarea"
                placeholder="Course Details"
                value={course_details}
                onChange={(e) => setCourse_details(e.target.value)} />
            <input
                className={styles.enrollment_dateField}
                type="date"
                placeholder="Enrollment Date"
                value={enrollment_date}
                onChange={(e) => setEnrollment_date(e.target.value)} />

            <button onClick={addData}>ADD</button>
        </div>
    );
};
