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

app.get("/", async (req, res) => {
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

app.post('/resources', (req, res) => {
    const newResource = req.body;
    // Assuming resources is an array where you store your resources
    resources.push(newResource);
    res.status(201).json(newResource); // Return the newly created resource with status 201 Created
});


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

app.delete('/resources/:id', (req, res) => {
    const resourceId = parseInt(req.params.id);
    const index = resources.findIndex(resource => resource.id === resourceId);
    if (index !== -1) {
        resources.splice(index, 1);
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
});





app.listen(4500, () => {
    console.log("listening on port 4500...");
})



