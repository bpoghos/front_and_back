const express = require('express');
const { config } = require("./msConfig");
const sql = require('mssql');
const cors = require('cors')



const app = express()

app.use(cors())
app.use(express.json());


sql.connect(config, err => {
    if (err) {
        throw err
    }
    console.log("Connection Successful!");
});


// get method for get all data from database and create API 

app.get("/resources", async (req, res) => {
    try {
        await sql.connect(config);

        let queryString = `
            SELECT Groups.group_num, Students.*,Courses.course_name,Courses.course_teacher, Courses.course_details, Enrollment.enrollment_date, Enrollment.enrollment_id
            FROM Enrollment 
            JOIN Students ON Students.student_id = Enrollment.student_id
            JOIN Groups ON Students.student_id = Groups.student_id
            JOIN Courses ON Courses.course_id = Enrollment.course_id
        `;

        const result = await new sql.Request().query(queryString);
        res.send(result.recordset);
        console.dir(result.recordset);
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data");
    } finally {
        sql.close();
    }
});


// GET a resource by ID

app.get("/resources/:id", async (req, res) => {
    try {
        await sql.connect(config);

        const resourceId = req.params.id;
        let queryString = `
            SELECT Groups.group_num, Students.*,Courses.course_name,Courses.course_teacher, Courses.course_details, Enrollment.enrollment_date, Enrollment.enrollment_id
            FROM Enrollment 
            JOIN Students ON Students.student_id = Enrollment.student_id
            JOIN Groups ON Students.student_id = Groups.student_id
            JOIN Courses ON Courses.course_id = Enrollment.course_id
            WHERE enrollment_id = @resourceId
        `;

        const result = await new sql.Request()
            .input('resourceId', sql.Int, resourceId)
            .query(queryString);

        if (result.recordset.length > 0) {
            res.send(result.recordset[0]);
            console.dir(result.recordset[0]);
        } else {
            res.status(404).send("Resource not found");
        }
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data");
    } finally {
        sql.close();
    }
});


// API for post data

// POST method to add new data to the database



app.post('/resources', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);

        const {
            group_num,
            name,
            surname,
            email_address,
            age,
            course_name,
            course_teacher,
            course_details,
            enrollment_date
        } = req.body;

        // Insert a new student into Students table
        const studentResult = await sql.query`
            INSERT INTO Students (name, surname, email_address, age)
            VALUES (${name}, ${surname}, ${email_address}, ${age});
            SELECT SCOPE_IDENTITY() as student_id;
        `;
        const student_id = studentResult.recordset[0].student_id;

        // Insert a new course into Courses table
        const courseResult = await sql.query`
            INSERT INTO Courses (course_name, course_details, course_teacher)
            VALUES (${course_name}, ${course_details}, ${course_teacher});
            SELECT SCOPE_IDENTITY() as course_id;
        `;
        const course_id = courseResult.recordset[0].course_id;

        // Insert into Groups table
        const groupResult = await sql.query`
            INSERT INTO Groups (student_id, group_num)
            VALUES (${student_id}, ${group_num});
            SELECT SCOPE_IDENTITY() as group_id;
        `;
        const group_id = groupResult.recordset[0].group_id;

        // Insert into Enrollment table
        const enrollmentResult = await sql.query`
            INSERT INTO Enrollment (enrollment_date, student_id, course_id)
            VALUES (${enrollment_date}, ${student_id}, ${course_id});
            SELECT SCOPE_IDENTITY() as enrollment_id;
        `;
        const enrollment_id = enrollmentResult.recordset[0].enrollment_id;

        console.log('Queries executed successfully.');

        res.status(200).json({ message: 'Data submitted successfully', student_id, course_id, group_id, enrollment_id });

    } catch (err) {
        console.error('Error executing queries:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    } finally {
        // Close the connection
        await sql.close();
    }
});


app.put("/resources/:id", async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);

        const enrollmentId = req.params.id;
        const {
            group_num,
            name,
            surname,
            email_address,
            age,
            course_name,
            course_teacher,
            course_details,
            enrollment_date
        } = req.body;

        // Update Students table
        await sql.query`
            UPDATE Students 
            SET name = ${sql.VarChar(255)}(${name}), 
                surname = ${sql.VarChar(255)}(${surname}), 
                email_address = ${sql.VarChar(255)}(${email_address}), 
                age = ${sql.Int}(${age})
            WHERE student_id = (SELECT student_id FROM Enrollment WHERE enrollment_id = ${sql.Int}(${enrollmentId}));
        `;

        // Update Courses table
        await sql.query`
            UPDATE Courses 
            SET course_name = ${sql.VarChar(255)}(${course_name}), 
                course_details = ${sql.VarChar(255)}(${course_details}), 
                course_teacher = ${sql.VarChar(255)}(${course_teacher})
            WHERE course_id = (SELECT course_id FROM Enrollment WHERE enrollment_id = ${sql.Int}(${enrollmentId}));
        `;

        // Update Groups table
        await sql.query`
            UPDATE Groups 
            SET group_num = ${sql.VarChar(50)}(${group_num})
            WHERE student_id = (SELECT student_id FROM Enrollment WHERE enrollment_id = ${sql.Int}(${enrollmentId}));
        `;

        // Update Enrollment table
        await sql.query`
            UPDATE Enrollment 
            SET enrollment_date = ${sql.DateTime2}(${enrollment_date})
            WHERE enrollment_id = ${sql.Int}(${enrollmentId});
        `;

        console.log('Data updated successfully.');

        res.status(200).json({ message: 'Data updated successfully' });

    } catch (err) {
        console.error('Error executing queries:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    } finally {
        // Close the connection
        await sql.close();
    }
});







// API for edit data 





// DELETE method to delete a resource from the database
app.delete('/resources/:id', async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const resourceId = req.params.id;

        // Connect to the database
        await sql.connect(config);

        // Define the SQL query to delete the resource with the given ID
        const query = `
            DELETE FROM Enrollment
            WHERE enrollment_id = @resourceId
        `;

        // Create a new SQL request
        const request = new sql.Request();

        // Add the resource ID as a parameter to the query
        request.input('resourceId', sql.Int, resourceId);

        // Execute the query
        await request.query(query);

        // Send a success response
        res.status(204).send(); // 204 No Content
    } catch (error) {
        // If an error occurs, log the error and send a 500 Internal Server Error response
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Close the database connection
        sql.close();
    }
});



app.listen(4500, () => {
    console.log("listening on port 4500...");
})



