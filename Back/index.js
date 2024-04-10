const express = require('express');
const { config } = require("./msConfig");
const sql = require('mssql');
const cors = require('cors')



const app = express()
app.use(cors())



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

app.get('/resources/:id', (req, res) => {
    const resourceId = parseInt(req.params.id);
    const resource = resources.find(resource => resource.id === resourceId);
    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
});

// API for post data

// POST method to add new data to the database
app.post("/resources", async (req, res) => {
    try {
        // Extract data from the request body
        const { group_num, student_id, name, surname /* Add other fields here */ } = req.body;

        // Connect to the database
        await sql.connect(config);

        // Define the SQL query to insert new data into the database
        const query = `
            INSERT INTO Enrollment (group_num, student_id, name, surname)
            VALUES (@group_num, @student_id, @name, @surname)
        `;

        // Create a new SQL request
        const request = new sql.Request();

        // Add parameters to the query
        request.input('group_num', sql.Int, group_num);
        request.input('student_id', sql.Int, student_id);
        request.input('name', sql.NVarChar, name);
        request.input('surname', sql.NVarChar, surname);

        // Add other input parameters for other columns and values

        // Execute the query
        await request.query(query);

        // Send a success response
        res.status(201).send("Data added successfully");
    } catch (error) {
        // If an error occurs, log the error and send a 500 Internal Server Error response
        console.error('Error:', error);
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



