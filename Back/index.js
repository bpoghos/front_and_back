const express = require('express');
const { request } = require('http');
const sql = require('mssql');
const cors = require('cors')


const app = express()
app.use(cors())

var config = {
    user: "sa",
    password: "123qwerty",
    server: "AREG-PC",
    database: "Books",
    options: {
        trustServerCertificate: true
    }
}

sql.connect(config, err => {
    if (err) {
        throw err
    }
    console.log("Connection Successful!");
});


app.get("/", async (request, response) => {
    try {
        await sql.connect(config);
     
        const result = await new sql.Request().query(`
            SELECT Groups.group_num, Students.*,Courses.course_name,Courses.course_teacher, Courses.course_details, Enrollment.enrollment_date, Enrollment.enrollment_id
            FROM Enrollment 
            JOIN Students ON Students.student_id = Enrollment.student_id
            JOIN Groups ON Students.student_id = Groups.student_id
            JOIN Courses ON Courses.course_id = Enrollment.course_id
        `);
        response.send(result.recordset);
        console.dir(result.recordset);
    } catch (err) {
        console.error("Error executing query:", err);
        response.status(500).send("Error fetching table names");
    } finally {
        sql.close();
    }
});


app.listen(4500, () => {
    console.log("listening on port 4500...");
})



