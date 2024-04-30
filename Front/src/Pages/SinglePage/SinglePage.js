// Import React hooks and styles
import { useParams } from "react-router-dom";
import styles from "./SinglePage.module.css";
import { useEffect, useState } from "react";

// Define the SinglePage component
export const SinglePage = () => {

    // State variable to store data of the single student
    const [data, setData] = useState([]);

    // Get the parameters from the URL
    const params = useParams();
    const { id } = params;

    // Function to fetch data of a single student based on the ID
    const getStudent = async (s_id) => {
        // Fetch data from the server
        const response = await fetch(`http://localhost:4500/resources/${s_id}`);
        // Parse the JSON response
        const res = await response.json();
        // Set the data state with the fetched data
        setData(res);
    };

    // Effect hook to fetch data of the single student when the ID changes
    useEffect(() => {
        getStudent(id);
    }, [id]);

    // Render the component
    return (
        <div className={styles.singlePage}>
            <h2>Name: {data.name}</h2>
            <h2>Surname: {data.surname}</h2>
            <p><strong>ID: </strong>{data.student_id}</p>
            <p><strong>Group: </strong>{data.group_num}</p>
            <p><strong>Email: </strong>{data.email_address}</p>
            <p><strong>Age: </strong>{data.age}</p>
            <p><strong>Coures Name: </strong>{data.course_name}</p>
            <p><strong>Course Teacher: </strong>{data.course_teacher}</p>
            <p><strong>Course Details: </strong>{data.course_details}</p>
            <p><strong>Date: </strong>{data.enrollment_date}</p>
        </div>
    );
};
