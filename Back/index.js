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


// app.post("/resources", async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { group_num, name, surname, email_address, age, course_name, course_teacher, course_details, enrollment_date } = req.body;

//         // Connect to the database
//         await sql.connect(config);

//         // Begin a transaction
//         const transaction = new sql.Transaction();
//         await transaction.begin();

//         try {
//             // Insert data into Students table
//             const studentQuery = `
//                 INSERT INTO Students (name, surname, email_address, age)
//                 OUTPUT INSERTED.student_id
//                 VALUES (@name, @surname, @email_address, @age)
//             `;
//             const studentRequest = new sql.Request(transaction)
//                 .input('name', sql.NVarChar, name)
//                 .input('surname', sql.NVarChar, surname)
//                 .input('email_address', sql.NVarChar, email_address)
//                 .input('age', sql.Int, age);
//             const { recordset: [{ student_id }] } = await studentRequest.query(studentQuery);

//             // Insert data into Groups table
//             const groupQuery = `
//                 INSERT INTO Groups (student_id, group_num)
//                 VALUES (@student_id, @group_num)
//             `;
//             const groupRequest = new sql.Request(transaction)
//                 .input('student_id', sql.Int, student_id)
//                 .input('group_num', sql.Int, group_num);
//             await groupRequest.query(groupQuery);

//             // Insert data into Courses table
//             const courseQuery = `
//                 INSERT INTO Courses (course_name, course_teacher, course_details)
//                 OUTPUT INSERTED.course_id
//                 VALUES (@course_name, @course_teacher, @course_details)
//             `;
//             const courseRequest = new sql.Request(transaction)
//                 .input('course_name', sql.NVarChar, course_name)
//                 .input('course_teacher', sql.NVarChar, course_teacher)
//                 .input('course_details', sql.NVarChar, course_details);
//             const { recordset: [{ course_id }] } = await courseRequest.query(courseQuery);

//             // Insert data into Enrollment table
//             const enrollmentQuery = `
//                 INSERT INTO Enrollment (student_id, course_id, enrollment_date)
//                 VALUES (@student_id, @course_id, @enrollment_date)
//             `;
//             const enrollmentRequest = new sql.Request(transaction)
//                 .input('student_id', sql.Int, student_id)
//                 .input('course_id', sql.Int, course_id)
//                 .input('enrollment_date', sql.Date, enrollment_date);
//             await enrollmentRequest.query(enrollmentQuery);

//             // Commit the transaction
//             await transaction.commit();

//             // Send a success response
//             res.status(201).send("Data added successfully");
//         } catch (error) {
//             // If an error occurs, rollback the transaction
//             await transaction.rollback();

//             // Log the error and send a 500 Internal Server Error response
//             console.error('Error:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         } finally {
//             // Close the transaction and database connection
//             transaction.close();
//             sql.close();
//         }
//     } catch (error) {
//         // If an error occurs, log the error and send a 500 Internal Server Error response
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// app.post("/resources", async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { group_num, name, surname, email_address, age, course_name, course_teacher, course_details, enrollment_date } = req.body;

//         // Connect to the database
//         await sql.connect(config);

//         // Define the SQL query to insert new data into the database (assuming you're inserting into the Students table)
//         const query = `
//             INSERT INTO Enrollment (group_num, name, surname, email_address, age, course_name, course_teacher, course_details, enrollment_date)
//             VALUES (@group_num, @name, @surname, @email_address, @age, @course_name, @course_teacher, @course_details, @enrollment_date)
//         `;

//         // Create a new SQL request
//         const request = new sql.Request();

//         // Add parameters to the query
//         request.input('group_num', sql.Int, group_num);
//         request.input('name', sql.NVarChar, name);
//         request.input('surname', sql.NVarChar, surname);
//         request.input('email_address', sql.NVarChar, email_address);
//         request.input('age', sql.Int, age);
//         request.input('course_name', sql.VarChar, course_name);
//         request.input('course_teacher', sql.NVarChar, course_teacher);
//         request.input('course_details', sql.VarChar, course_details);
//         request.input('enrollment_date', sql.Date, enrollment_date);

//         // Execute the query
//         await request.query(query);

//         // Send a success response
//         res.status(201).send("Data added successfully");
//     } catch (error) {
//         // If an error occurs, log the error and send a 500 Internal Server Error response
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//         // Close the database connection
//         sql.close();
//     }
// });


app.post("/resources", async (req, res) => {
    try {
        // Extract data from the request body
        const { name, surname, email_address, age, course_name, course_teacher, course_details } = req.body;

        // Connect to the database
        await sql.connect(config);

        // Begin a transaction
        const transaction = new sql.Transaction();
        await transaction.begin();

        try {
            // Insert into Students table
            const studentResult = await transaction.request()
                .input('name', sql.NVarChar, name)
                .input('surname', sql.NVarChar, surname)
                .input('email_address', sql.NVarChar, email_address)
                .input('age', sql.Int, age)
                .query('INSERT INTO Students (name, surname, email_address, age) VALUES (@name, @surname, @email_address, @age)');
            
            if (!studentResult || !studentResult.recordset || studentResult.recordset.length === 0 || !studentResult.recordset[0].insertId) {
                throw new Error('Failed to insert data into Students table or get insertId');
            }

            const studentId = studentResult.recordset[0].insertId;

            // Insert into Courses table
            const courseResult = await transaction.request()
                .input('course_name', sql.NVarChar, course_name)
                .input('course_teacher', sql.NVarChar, course_teacher)
                .input('course_details', sql.NVarChar, course_details)
                .query('INSERT INTO Courses (course_name, course_teacher, course_details) VALUES (@course_name, @course_teacher, @course_details)');
            
            if (!courseResult || !courseResult.recordset || courseResult.recordset.length === 0 || !courseResult.recordset[0].insertId) {
                throw new Error('Failed to insert data into Courses table or get insertId');
            }

            const courseId = courseResult.recordset[0].insertId;

            // Insert into Enrollment table
            const enrollmentResult = await transaction.request()
                .input('enrollment_date', sql.DateTime, new Date())
                .input('student_id', sql.Int, studentId)
                .input('course_id', sql.Int, courseId)
                .query('INSERT INTO Enrollment (enrollment_date, student_id, course_id) VALUES (@enrollment_date, @student_id, @course_id)');
            
            if (!enrollmentResult || !enrollmentResult.recordset || enrollmentResult.recordset.length === 0 || !enrollmentResult.recordset[0].insertId) {
                throw new Error('Failed to insert data into Enrollment table or get insertId');
            }

            // Commit the transaction
            await transaction.commit();

            // Send a success response
            res.status(201).send("Data added successfully");
        } catch (error) {
            // If an error occurs, rollback the transaction
            await transaction.rollback();
            console.error('Error:', error.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        // If an error occurs, log the error and send a 500 Internal Server Error response
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Close the database connection
        sql.close();
    }
});





// API for edit data 

app.put('/resources/:id', (req, res) => {
    const resourceId = parseInt(req.params.id);
    const updatedResource = req.body;
    const index = resources.findIndex(resource => resource.id === resourceId);
    if (index !== -1) {
        resources[index] = updatedResource;
        res.json(updatedResource);
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
});



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



