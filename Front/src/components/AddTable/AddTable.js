import { useState } from "react"

import styles from "./AddTable.module.css"

export const AddTable = () => {


    const [group_num, setGroup_num] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [course_name, setCourse_name] = useState('')
    const [course_teacher, setCourse_teacher] = useState('')
    const [course_details, setCourse_details] = useState('')
    const [enrollment_date, setEnrollment_date] = useState('')







    // addData part, create body object and give them type of keys

    const addData = () => {
        const parsedGroupNum = parseInt(group_num)
        const parsedAge = parseInt(age)

        if (!isNaN(parsedGroupNum) && !isNaN(parsedAge)) {
            const body = {
                group_num: parsedGroupNum,
                name,
                surname,
                email,
                age: parsedAge,
                course_name,
                course_teacher,
                course_details,
                enrollment_date

            };

            console.log(body);

            setGroup_num('')
            setName('')
            setSurname('')
            setEmail('')
            setAge('')
            setCourse_name('')
            setCourse_teacher('')
            setCourse_details('')
            setEnrollment_date('')
        } else {
            console.error('Group or Age number is not a valid number.');
        }
    };



    return (
        <div className={styles.addTable}>
            <h1>Add Table</h1>
            <input
                className={styles.group_numField}
                type="text"
                placeholder="Group"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
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
    )
}


