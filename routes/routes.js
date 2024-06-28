var express = require('express')
var route = express.Router()
var mammoth = require('mammoth')
const session = require('express-session');
var csvParser = require("csv-parser")
var fs = require('fs')
var moment = require("moment")
var pdf = require("html-pdf")
const path = require('path');
var pdf_lib = require("pdf-lib")
const randomstring = require("randomstring")
const nodemailer = require("nodemailer")
var bodyParser = require('body-parser')
var multer = require("multer")
var excel = require("exceljs")
var Swal = require('sweetalert2')
const util = require('util')
const upload = multer({ dest: 'uploads/' });
var connection = require('../db/connection.js');
const { Console, error } = require('console');
let data = []; // Store CSV data globally
// Configure session middleware
route.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


route.use(bodyParser.json({ limit: '500mb' }));
route.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }))


function today_date_1() {
  const today = new Date(); 

  const year = today.getFullYear();
  let month = today.getMonth() + 1; 
  let day = today.getDate();

  month = month.toString().padStart(2, '0');
  day = day.toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}


function today_date_2() {
  const today = new Date(); 

  const year = today.getFullYear();
  let month = today.getMonth() + 1; 
  let day = today.getDate();

  month = month.toString().padStart(2, '0');
  day = day.toString().padStart(2, '0');

  return `${day}-${month}-${year}`;
}





//Multer configuration

// const storage2 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file,'file_file')
//     const candidateId = req.session.candidate_id;  
//     if (!candidateId) {
//       return cb(new Error('Candidate ID is required'));
//     }

//     let file_type = file.mimetype;
//     let uploadPath;

//     const rootDir = path.resolve(__dirname);
//     const driveLetter = rootDir.split(path.sep)[0]; 

//     if (file_type == 'application/pdf') {
//       uploadPath = path.join(driveLetter, `hrm_documents/${candidateId}/pdf`);
//     } else if (file_type == 'image/jpeg' || file_type == 'image/png' || file_type == 'image/gif' || file_type == 'image/jpg' || file_type == 'image/webp') {
//       uploadPath = path.join(driveLetter,`hrm_documents/${candidateId}/image`);
//     } else {
//       return cb(new Error('Unsupported file type'));
//     }

//     console.log(`Attempting to create directory: ${uploadPath}`);

//     fs.mkdir(uploadPath, { recursive: true }, (err) => {
//       if (err) {
//         console.error(`Failed to create directory: ${uploadPath}`, err);
//         return cb(err);
//       }
//       console.log(`Directory created or already exists: ${uploadPath}`);
//       cb(null, uploadPath);
//     });
//   },
//   filename: function (req, file, cb) {
//     let originalname = file.originalname;
//     let randomNum = Math.round(Math.random() * 999999) + 100000;
//     let currentDate = moment().format('YYYYMMDD'); 
//     let newFilename = `${randomNum}_${currentDate}_${originalname}`; 
//     cb(null, newFilename);
//   }
// });

// const file2 = multer({ storage: storage2 });




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file, 'file_fjldfdj')
//     let file_type = file.mimetype

//     if (file_type == 'application/pdf') {
//       console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq')
//       cb(null, '/hrm_documents/pdf');
//     }
//     else if (file_type == 'image/jpeg' || file_type == 'image/png' || file_type == 'image/gif' || file_type == 'image/jpg' || file_type == 'image/webp') {
//       cb(null, '/hrm_documents/image');
//     }
//   },
//   filename: function (req, file, cb) {
//     // Save the file with its original name
//     cb(null, file.originalname);
//   }
// });

// const file = multer({ storage: storage });

 //Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    // Save the file with its original name
    cb(null, file.originalname);
  }
});

const file= multer({ storage: storage });





// Middleware to check if user is logged in
const redirectLogin = (req, res, next) => {
  if (!req.session.user_id) {

    res.cookie("ManageDE", "");
    res.cookie("button_id", "");
    res.cookie("main_tab_id", "");
    res.redirect('/');
  } else {
    next();
  }
}
const redirectmanager = (req, res, next) => {
  if (!req.session.emp_id) {

    res.cookie("ManageDE", "");
    res.cookie("button_id", "");
    res.cookie("main_tab_id", "");
    res.redirect('/');
  } else {
    next();
  }
}



// Middleware to check if user is logged in
const redirectCandidate = (req, res, next) => {
  if (!req.session.candidate_id) {

    res.cookie("ManageDE", "");
    res.cookie("button_id", "");
    res.cookie("main_tab_id", "");
    res.redirect('/');
  } else {
    next();
  }
}
// ***********************************************Login route*****************************************************
route.get('/', (req, res) => {
  try {
    res.render('login.ejs');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// function getCurrentDateTime() {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');

//   const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   return formattedDateTime;
// }

function getCurrentDateTime() {
  const date = new Date();
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}



// Function getCurrentMonthRange
function getCurrentMonthRange() {
  const today = new Date(); 

  const year = today.getFullYear();
  let month = today.getMonth() + 1; 

  const formattedMonth = month.toString().padStart(2, '0');

  const startDate = `${year}-${formattedMonth}-01`;

  const endDate = new Date(year, month, 0);
  const formattedEndDay = endDate.getDate().toString().padStart(2, '0');
  const endDateString = `${year}-${formattedMonth}-${formattedEndDay}`;

  return {
    startDate: startDate,
    endDate: endDateString
  };
}


// Function generate a list of dates between two dates 
function getDateRange(toDate, fromDate) {
  let start = new Date(toDate);
  let end = new Date(fromDate);

  let dateList = [];

  while (start <= end) {
    dateList.push(start.toISOString().split('T')[0]);

    start.setDate(start.getDate() + 1);
  }

  return dateList;
}


route.post('/login', async (req, res) => {
  const { USER_TYPE, EMP_CODE, PASSWORD } = req.body;

  try {
    const con = await connection();
    let query, table;

    // Execute query based on user type
    if (USER_TYPE === '2') {
      query = 'SELECT * FROM employee_master WHERE EMPLID = ? AND PASSWORD = ?';
      table = 'employee_master';
    } else if (USER_TYPE === '3') {
      query = 'SELECT * FROM candidate_login WHERE candidate_id = ? AND PASSWORD = ? ';
      table = 'candidate_login';
    } else {
      query = 'SELECT * FROM hrm_user_login WHERE EMP_CODE = ? AND PASSWORD = ? AND STATUS = ?';
      table = 'hrm_user_login';
    }

    con.query(query, [EMP_CODE, PASSWORD, "1"], async (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 1) {
        // If user found
        if (USER_TYPE == '0') {
          // For HR
          if (results[0].ROLE == 'ADMIN') {
            req.session.user_id = results[0].EMP_CODE;
            req.session.role = results[0].ROLE;
            req.session.user_type = USER_TYPE;
            req.session.name = results[0].EMP_NAME;
            req.session.admin_mail=results[0].EMP_Email_ID
            // Update login dates
            const currentDate = new Date().toISOString().slice(0, 10);
            const currentTime = new Date().toLocaleString().slice(10, 18);
            const loginDateTime = currentDate + ' ' + currentTime;
            if (!results[0].F_LOGIN_DATE) {
              await updateLoginDate(con, EMP_CODE, 'F_LOGIN_DATE', loginDateTime);
            }
            await updateLoginDate(con, EMP_CODE, 'L_LOGIN_DATE', loginDateTime, EMP_CODE);
            res.send('/dashboard_admin');
          } else {
            res.send('error');
          }
        } else if (USER_TYPE == '1') {
          // For admin
          if (results[0].ROLE == 'HR') {
            req.session.user_id = results[0].EMP_CODE;
            req.session.role = results[0].ROLE;
            req.session.user_type = USER_TYPE;
            req.session.name = results[0].EMP_NAME;
            req.session.hr_email_id = results[0].EMP_Email_ID;
            // Update login dates
            const currentDate = new Date().toISOString().slice(0, 10);
            const currentTime = new Date().toLocaleString().slice(10, 18);
            const loginDateTime = currentDate + ' ' + currentTime;
            if (!results[0].F_LOGIN_DATE) {
              await updateLoginDate(con, EMP_CODE, 'F_LOGIN_DATE', loginDateTime);
            }
            await updateLoginDate(con, EMP_CODE, 'L_LOGIN_DATE', loginDateTime, EMP_CODE);
            res.send('/dashboard_admin');
          } else {
            res.send('error');
          }
        } else if (USER_TYPE === '2') {
          // For manager
          req.session.emp_id = results[0].EMPLID;
          req.session.role = 'MANAGER';
          req.session.user_type = USER_TYPE;
          req.session.name = results[0].Emp_Name;
          req.session.manager_mail_id = results[0].emp_email;

          // Update login dates
          const currentDate = new Date().toISOString().slice(0, 10);
          const currentTime = new Date().toLocaleString().slice(10, 18);
          const loginDateTime = currentDate + ' ' + currentTime;
          if (!results[0].F_LOGIN_DATE) {
            await updateLoginDate(con, EMP_CODE, 'F_LOGIN_DATE', loginDateTime);
          }
          await updateLoginDate(con, EMP_CODE, 'L_LOGIN_DATE', loginDateTime, EMP_CODE);
          res.send('/manager_dashboard');
        } else if (USER_TYPE === '3') {
          // For candidate
        // Adjust status check as per your schema
        req.session.role = 'CANDIDATE';
        req.session.user_type = USER_TYPE;
            req.session.candidate_id = results[0].candidate_id;
            req.session.candidate_name = results[0].candidate_name;
            req.session.candidate_email=results[0].candidate_email

            // Update login dates for candidate
      
            res.send('/candidate_dashboard');
        
        }

    con.end()

      } else {
        // If no user found, show error message
        res.send('error');
      }
    });

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Internal Server Error');
  }
});



async function updateLoginDate(con, EMP_CODE, columnName, datetime) {
  return new Promise((resolve, reject) => {
    con.query(`UPDATE hrm_user_login SET ${columnName} = ? WHERE EMP_CODE = ?`, [datetime, EMP_CODE], (err) => {
      if (err) {
        console.error(`Error updating ${columnName}:`, err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}



//***************************************************logout****************************************************

route.get('/logout', (req, res) => {
  // Clear session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/');
  });
});




route.get('/logout_candidate', (req, res) => {
  // Clear session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/');
  });
});




route.post('/upload', upload.single('csvFile'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    const filePath = req.file.path;
    data = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => {
        fs.unlinkSync(filePath);
        res.render('index', { data });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//****************************************** Dashboard route********************************************************
route.get("/dashboard_admin", redirectLogin, (req, res) => {
  const role = req.session.role; // Retrieve role from session
  res.render("admin/dashboard_admin", { role, EMP_CODE: req.session.user_id });
});

route.post('/admin_dashboard_onload', redirectLogin,async (req, res) => {
  try {
    const con=await connection()
    const user_name = req.session.name; 
    let today_date1 = today_date_1(); 
    let status="approved"
  
    let query1=`
      SELECT COUNT( candidate_id) AS total_emp_count
      FROM 
        candidate_login`
  
    con.query(query1,function(err1,result1){
      if(err1) throw err1
      let total_emp=result1[0].total_emp_count
      console.log(total_emp,'total_emp1111')
      
      let query2=
      `SELECT         
          COUNT( candidate_id) AS total_emp_on_leave
        FROM
          leave_request
        WHERE 
          (
            (from_date IS NOT NULL AND to_date IS NOT NULL AND
              ? BETWEEN from_date AND to_date)
            OR
            (
              (from_date IS NULL OR from_date = '') AND 
              (to_date IS NULL OR to_date = '') AND 
              multi_date LIKE CONCAT('%', ?, '%')
            )
          )    
          AND
            status=?
          `
  
          con.query(query2, [today_date1, today_date1,status], function(err2, result2){
  
            let emp_on_leave=result2[0].total_emp_on_leave
  
            console.log(emp_on_leave,'emp_on_leave_emp_on_leave')
  
            let present_emp=total_emp-emp_on_leave
            console.log(present_emp,'present_emp')
  
            res.send({ user_name:user_name, total_emp:total_emp, emp_on_leave:emp_on_leave, present_emp:present_emp });
  
          })
  
    })
  
  } catch (error) {
    console.log(error);    
  }
});
// //*******************************************Job description route***********************************************
route.get('/jobDescription', redirectLogin, (req, res) => {
  try {
    res.render('admin/job_description.ejs', { role: req.session.role, EMP_CODE: req.session.user_id, page: 'job_description' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});



//   route.get('/jobDescription', (req, res) => {
//     try {
//         res.render('job_description.ejs',)
//     } catch (error) {
//         console.log(error)
//     }
// })

//jd creation
route.post('/jd_creation', async (req, res) => {
  try {
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date().toLocaleString('en-GB').slice(12, 20)
    let datetime = date.concat(" ", time)
    let created_by = req.session.user_id + " : " + req.session.name
    console.log(created_by)
    // let time = new Date().toLocaleDateString
    const { job_title, funct, business, about, role_s, role_res, key_per, edu_qual, cd, cb } = req.body;
    console.log(job_title, funct, business, about, role_s, role_res, key_per, edu_qual)

    var query = 'INSERT INTO jd_creation_master(job_title,jd_creation_master.function,business,about_us,role_summary,role_nd_responsibilites,key_performance,education_qualification,is_active,creation_date,created_by, jd_status) VALUES ?'
    var values = [[job_title, funct, business, about, role_s, role_res, key_per, edu_qual, '1', datetime, created_by, 'Active']]


    var con = await connection()
    con.query(query, [values], (error, result) => {
      console.log(result,'result')

      if (result.affectedRows > 0) {
        const jdid = result.insertId;
        console.log(jdid, "dgdusgdiueudgi");
        res.json({ success: true, jdid: jdid });
      } else {
        res.json({ success: false, message: 'No rows affected' });
      }
    })


  }
  catch (error) {

  }
})


route.post("/status", async (req, res) => {
  var jdid = req.body.jdid;
  var status = req.body.status

  var jd_part1 = jdid.split("MIS")
  var jd_number = jd_part1[1]

  const con = await connection();
  var sql = `UPDATE jd_creation_master SET jd_status='${status}' WHERE jd_id='${jd_number}'`

  con.query(sql, (error, result) => {
    if (result) {
      console.log("success inserted ")
      res.send("success")

    }
    else {
      console.log("error when inserting a data")
      res.send("error")
    }
  })
})


//update jd
route.post('/jd_updation', async (req, res) => {
  try {
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date().toLocaleString('en-GB').slice(12, 20)
    let datetime = date.concat(" ", time)
    let modified = req.session.user_id + " : " + req.session.name
    // let time = new Date().toLocaleDateString
    const { jd_id, job_title, funct, business, role_s, role_res, key_per, edu_qual, cd, cb } = req.body;
    // console.log(job_title,funct,business,about,role_s,role_res,key_per,edu_qual)
    console.log(jd_id, "eniguhidhijdid")

    var query = `UPDATE  jd_creation_master SET job_title="${job_title}",jd_creation_master.function="${funct}",business="${business}",role_summary="${role_s}",role_nd_responsibilites="${role_res}",key_performance="${key_per}",education_qualification="${edu_qual}",modified_date="${datetime}",modified_by="${modified}" WHERE jd_id=${jd_id} `



    var con = await connection()
    con.query(query, (error, result) => {
      if (error) {
        res.send('error')
        throw error
      }
      else {
        console.log(result)
        res.send('success')
      }
    })


  }
  catch (error) {

  }
})


route.get('/view_job_description', redirectLogin, async (req, res) => {
  try {
    var query = "SELECT  prefix,jd_id,job_title,jd_creation_master.function,business,about_us,role_summary,role_nd_responsibilites,key_performance,education_qualification,is_active,DATE_FORMAT(creation_date, '%d-%m-%Y %H:%i:%s ') AS creation_date,created_by,DATE_FORMAT(modified_date, '%d-%m-%Y %H:%i:%s ') AS modified_date,modified_by, jd_status  FROM jd_creation_master  ORDER BY jd_id DESC"
    var con = await connection()
    con.query(query, (error, result) => {
      console.log(result,'result')
      if (error) throw error
      else {
        console.log(result)
        res.render('admin/view_job_description', { jd_data: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'view_job_description' })
      }
    })


  }
  catch (error) {
    console.log(error)
  }
})


route.post('/manage_jd_filter', redirectLogin, async (req, res) => {
  try {
    let con = await connection()
    // let {from_date, to_date, status_val}=req.body;
    let status_val = req.body.status_val

    let from_date = req.body.from_date
    let from_date1 = moment(from_date, 'DD/MM/YYYY').format('YYYY-MM-DD')

    let to_date = req.body.to_date
    let to_date1 = moment(to_date, 'DD/MM/YYYY').format('YYYY-MM-DD')

    console.log(from_date1, to_date1, status_val, 'abc11')

    if (from_date !== '' && to_date !== '' && status_val == 'none') {
      console.log('abcac')
      let query1 = `
        SELECT  
          prefix,
          jd_id,
          job_title,
          jd_creation_master.function,
          business,          
          role_summary,
          role_nd_responsibilites,
          key_performance,
          education_qualification,
          is_active,
          DATE_FORMAT(creation_date, '%d-%m-%Y %H:%i:%s ') AS creation_date,
          created_by,DATE_FORMAT(modified_date, '%d-%m-%Y %H:%i:%s ') AS modified_date,
          modified_by, 
          jd_status  
        FROM 
          jd_creation_master
        WHERE 
          DATE(creation_date) >= ? AND DATE(creation_date) <= ?

        `

      con.query(query1, [from_date1, to_date1], (err1, result1) => {
        if (err1) throw err1
        console.log(result1, 'result_filter_111')

        res.send({ data1: result1 })
      })
    }

    else if (from_date == '' && to_date == '' && status_val !== 'none') {
      let query1 = `
      SELECT  
        prefix,
        jd_id,
        job_title,
        jd_creation_master.function,
        business,
        role_summary,
        role_nd_responsibilites,
        key_performance,
        education_qualification,
        is_active,
        DATE_FORMAT(creation_date, '%d-%m-%Y %H:%i:%s ') AS creation_date,
        created_by,DATE_FORMAT(modified_date, '%d-%m-%Y %H:%i:%s ') AS modified_date,
        modified_by, 
        jd_status  
      FROM 
        jd_creation_master
      WHERE 
        jd_status = ?
      `

      con.query(query1, [status_val], (err2, result2) => {
        if (err2) throw err2
        console.log(result2, 'result_filter_222')

        res.send({ data1: result2 })
      })

    }


    else if (from_date !== '' && to_date !== '' && status_val !== 'none') {
      let query1 = `
        SELECT  
          prefix,
          jd_id,
          job_title,
          jd_creation_master.function,
          business,
          role_summary,
          role_nd_responsibilites,
          key_performance,
          education_qualification,
          is_active,
          DATE_FORMAT(creation_date, '%d-%m-%Y %H:%i:%s ') AS creation_date,
          created_by,DATE_FORMAT(modified_date, '%d-%m-%Y %H:%i:%s ') AS modified_date,
          modified_by, 
          jd_status  
        FROM 
          jd_creation_master
        WHERE 
          DATE(creation_date) >= ? AND DATE(creation_date) <= ? AND
          jd_status = ?
        `

      con.query(query1, [from_date1, to_date1, status_val], (err3, result3) => {
        if (err3) throw err3
        console.log(result3, 'result_filter_333')

        res.send({ data1: result3 })
      })

    }

  }
  catch (err) {
    console.log(err, 'err')
  }
})


//**********************************************createuser route***************************************************
route.get('/createuser', redirectLogin, (req, res) => {
  try {
    res.render('admin/createuser.ejs', { role: req.session.role, EMP_CODE: req.session.user_id, page: "createuser" });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


route.post('/createuser', async (req, res) => {
  try {
    const userData = {
      EMP_CODE: req.body.EMP_CODE,
      EMP_NAME: req.body.EMP_NAME,
      ROLE: req.body.ROLE,
      PASSWORD: req.body.PASSWORD,
      EMP_DESI: req.body.EMP_DESI,
      EMP_Email_ID: req.body.EMP_Email_ID,
      EMP_NUMBER: req.body.EMP_NUMBER,
      EMP_VERTICAL: req.body.EMP_VERTICAL,
      REP_MANAGER_ID: req.body.REP_MANAGER_ID,
      REP_MANAGER_NAME: req.body.REP_MANAGER_NAME,
      REP_MANAGER_Email_ID: req.body.REP_MANAGER_Email_ID,
      REP_MANAGER_MOBILE: req.body.REP_MANAGER_MOBILE,
      BRANCH: req.body.BRANCH,
      ZONE: req.body.ZONE
    };

    // Check if employee ID already exists in the database
    var con = await connection()
    con.query('SELECT * FROM hrm_user_login WHERE EMP_CODE = ?', [userData.EMP_CODE], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // If employee ID already exists, display message and return
      if (results.length > 0) {
        res.status(400).send('Employee ID already exists');
        return;
      }

      // If employee ID does not exist, execute insert query
      con.query('INSERT INTO hrm_user_login SET ?', userData, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Redirect the user after successful insertion
        res.redirect('/createuser');
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

route.post('/checkEmployeeCode', async (req, res) => {
  try {
    const { EMP_CODE } = req.body;

    // Execute query to check if employee code exists
    var con = await connection();
    con.query('SELECT COUNT(*) AS count FROM hrm_user_login WHERE EMP_CODE = ?', [EMP_CODE], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const count = results[0].count;
      const exists = count > 0;
      res.json({ exists });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


route.post('/checkEmployeeCode', async (req, res) => {
  try {
    const { EMP_CODE } = req.body;

    // Execute query to check if employee code exists
    var con = await connection();
    con.query('SELECT COUNT(*) AS count FROM hrm_user_login WHERE EMP_CODE = ?', [EMP_CODE], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const count = results[0].count;
      const exists = count > 0;
      res.json({ exists });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// route.get('/createuser', redirectLogin, (req, res) => {
//   try {
//     res.render('admin/createuser.ejs', { role: req.session.role,EMP_CODE : req.session.user_id });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// format date function
function formatDate(dateString) {
  if (dateString) {
    const months = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    const parts = dateString.split('-');
    if (parts.length === 3) {
      let year = parseInt(parts[2]);
      if (year < 100) {
        year += year < 50 ? 2000 : 1900;
      }
      return `${year}-${months[parts[1]]}-${parts[0]}`;
    } else {
      return null;
    }
  } else {
    return null; 
  }
}

function findDuplicates(arr) {
  const counts = {};
  const duplicates = [];

  arr.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  for (const key in counts) {
    if (counts[key] > 1) {
      duplicates.push(key);
    }
  }

  return duplicates;
}
route.post('/saveDataToDatabase', redirectLogin, async (req, res) => {

  try {
    const formData = req.body.form_data;
    let count_insert = 0
    let count_update = 0
 
    const empIds = formData.map(data => data[0]);

    const duplicateIds = findDuplicates(empIds);
    console.log(duplicateIds)
    if (duplicateIds.length > 0) {
      return res.send({ dup: "duplic", Duplicate: duplicateIds });
    }
    var con = await connection()
    var connquery = util.promisify(con.query).bind(con)

    for (var i = 0; formData.length > i; i++) {

      var empId = formData[i][0]
     
      var data = formData[i]

      const insertValues = [[
        data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7],
        data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15],
        data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23],
        data[24], data[25], formatDate(data[26]), data[27], data[28], data[29], data[30],
        formatDate(data[31]), formatDate(data[32]), data[33], data[34], data[35], data[36], data[37], data[38],
        data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46],
        formatDate(data[47]), data[48], data[49], data[50], data[51], data[52], data[53], data[54], data[55]
      ]]
      const updateValues = [
        data[1], data[2], data[3], data[4], data[5], data[6], data[7],
        data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15],
        data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23],
        data[24], data[25], formatDate(data[26]), data[27], data[28], data[29], data[30],
        formatDate(data[31]), formatDate(data[32]), data[33], data[34], data[35], data[36], data[37], data[38],
        data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46],
        formatDate(data[47]), data[48], data[49], data[50], data[51], data[52], data[53], data[54],
        data[55], data[0]
      ];

      const selectQuery = await connquery('SELECT * FROM employee_master WHERE EMPLID = ?', [empId]);
      if (selectQuery.length > 0) {

        const updateQuery = ` UPDATE employee_master SET Emp_Name = ?, COMPANY = ?, Comp_Name= ?, Vertical = ?, SubVertical = ?, POSITION = ?, Prefix = ?,FIRST_NAME = ?,MIDDLE_NAME = ?, LAST_NAME = ?, PAYROLL_STATUS = ?, BUSINESS_UNIT = ?, BU_Descr = ?,DEPTID = ?, Department = ?, CostCenterID = ?, EMP_FUNCTION = ?, SUB_FUNCTION = ?,BUSINESS = ?,PAYGROUP = ?, PAYGROUP_DESCR = ?, LOCATION_STATE = ?, LOCATION = ?, LOCATION_DESCR = ?, SEX = ?,BIRTHDATE = ?, QUALIFICATION = ?, Prev_Exp = ?, Jub_Exp = ?, Tot_Exp = ?, TERM_DATE = ?, HIRE_DATE = ?,Designation = ?, JOBCODE = ?, GRADE = ?, Supervisor_PositionID = ?, SUPERVISOR_ID = ?, SUPERVISOR_NAME = ?,Sup_EMAIL_ADDR = ?, L2_SUPERVISOR_ID = ?, L2_SUPRVISOR_NAME = ?, L2_POSITION_NBR = ?, L2_EMAIL = ?,Previous_EMPLOYER = ?, BLOOD_TYPE = ?, MAR_STATUS = ?, MARRIAGE_DATE = ?, PAN = ?,EmpBUSSINESS_EMAILID = ?,EmpPersonal_EMAILID = ?, BUS_PHONE = ?, HOME_PHONE = ?, EMERG_CNTCT = ?, ADDRESS = ?, FATHER_NAME = ? WHERE EMPLID = ?`

        await connquery(updateQuery, updateValues).then(() => {
          count_update++
        })

      }
      else {
        const insertQuery = `INSERT INTO employee_master (EMPLID, Emp_Name, COMPANY, Comp_Name,Vertical, SubVertical, POSITION, Prefix, FIRST_NAME, MIDDLE_NAME, LAST_NAME, PAYROLL_STATUS, BUSINESS_UNIT, BU_Descr,DEPTID, Department, CostCenterID, EMP_FUNCTION, SUB_FUNCTION,BUSINESS, PAYGROUP,PAYGROUP_DESCR, LOCATION_STATE, LOCATION, LOCATION_DESCR, SEX, BIRTHDATE,QUALIFICATION, Prev_Exp, Jub_Exp, Tot_Exp, TERM_DATE, HIRE_DATE, Designation, JOBCODE, GRADE, Supervisor_PositionID, SUPERVISOR_ID, SUPERVISOR_NAME,Sup_EMAIL_ADDR, L2_SUPERVISOR_ID, L2_SUPRVISOR_NAME, L2_POSITION_NBR, L2_EMAIL, Previous_EMPLOYER, BLOOD_TYPE, MAR_STATUS, MARRIAGE_DATE, PAN, EmpBUSSINESS_EMAILID,EmpPersonal_EMAILID, BUS_PHONE, HOME_PHONE, EMERG_CNTCT, ADDRESS, FATHER_NAME  ) VALUES ?`;

        await connquery(insertQuery, [insertValues]).then(() => {
          count_insert++
        })

      }


    }
 
    console.log(count_insert, count_update)
    if (count_insert || count_update) {
      res.send({ count_insert: count_insert, count_update: count_update })
    }
    else {
      res.send("failed")
    }

  } catch (error) {
    console.log(error)
  }
});




function sqlquery(get_query, values, count) {
  return new Promise((resolve, reject) => {
    con.query(get_query, [values], (error, result) => {
      if (error) {
        console.error('Error checking employee existence:', selectErr2);
        return;
      }
      else {
        resolve(count++)
        console.log('success insertion')
      }
    })
  })

}


route.get('/employee-master', redirectLogin, (req, res) => {
  try {

    res.render('admin/employee_master.ejs', { EMP_CODE: req.session.user_id, role: req.session.role, page: 'employee_master' })

  } catch (error) {
    console.log(error)
  }
})



route.get('/view_employee', async (req, res) => {
  const conn = await connection();
  conn.query('SELECT * FROM employee_master ', (error, results, fields) => {
    if (error) throw error;

    res.render('admin/view_employee', { data: results, role: req.session.role, EMP_CODE: req.session.user_id, page: 'view_employee' });
  });
});








route.get("/pdf", async (req, res) => {
  const con = await connection();
  con.query('SELECT* FROM jd_creation_master ', (error, results, fields) => {
    if (error) throw error;

    res.render("admin/pdf", { data: results })
  })
})




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishal.manthanitsolutions@gmail.com',
    pass: 'yjal dkyp ncld juil'
  }
});


function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
}

route.get('/forgot', (req, res) => {
  res.render('forgotPassword');
});

var verifyOTP

route.post('/forgot', async (req, res) => {

  const { email } = req.body;
  const conne = await connection();
  conne.query('SELECT * FROM hrm_user_login WHERE EMP_Email_ID = ?', [email], (error, results) => {
    if (error) {
      console.error('Error retrieving user from database: ' + error);
      res.status(500).send('Failed to retrieve user');
      return;
    }

    if (results.length > 0) {
      const otp = generateOTP();
      verifyOTP = otp
      console.log(verifyOTP);
      const mailOptions = {
        from: 'vishal.manthanitsolutions@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is: ${otp}

              Thanks & Regards 
              MIS IT Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ' + error);
          res.status(500).send('Failed to send email');
        } else {
          console.log('Email sent: ' + info.response);
          res.render('verifyOTP', { email });
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  });
});


route.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  if (verifyOTP == otp) {
    res.render('resetPassword', { email });
  } else {
    res.status(400).send('Invalid OTP');
  }
});

route.post('/reset', async (req, res) => {
  const { email, password } = req.body;

  const conn = await connection();

  conn.query('UPDATE hrm_user_login SET PASSWORD = ? WHERE EMP_Email_ID = ?', [password, email], (error, results) => {
    if (error) {
      console.error('Error updating password in database: ' + error);
      res.status(500).send('Failed to update password');
      return;
    }
    res.redirect("/");
  });
});


function verifyOTP(inputOTP, generatedOTP) {
  return inputOTP === generatedOTP;
}




route.get('/changePassword', redirectLogin, (req, res) => {
  try {
    res.render('admin/change_password.ejs', { role: req.session.role, EMP_CODE: req.session.user_id });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
route.get('/changePassword_manager', redirectmanager, (req, res) => {
  try {
    res.render('admin/change_password.ejs', { role: req.session.role, EMP_CODE: req.session.user_id });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


route.post('/changePassword', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const EMP_CODE = req.session.user_id;
    const EMPLID = req.session.emp_id;
    const USER_TYPE = req.session.user_type;
    
    const con = await connection();
    if (USER_TYPE === '1') {
      con.query('SELECT * FROM hrm_user_login WHERE EMP_CODE = ? AND PASSWORD = ?', [EMP_CODE, oldPassword], (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error'});
          return;
        }

        if (results.length === 1) {
          con.query('UPDATE hrm_user_login SET PASSWORD = ? WHERE EMP_CODE = ?', [newPassword, EMP_CODE], (err, result) => {
            if (err) {
              console.error('Error updating password:', err);
              res.status(500).json({ success: false, message: 'Internal Server Error'});
            } else {
              res.json({ success: true, message: 'Password updated successfully'});
            }
          });
        } else {
          res.json({ success: false, message: 'Old password does not match'});
        }
      });
    } else if (USER_TYPE === '2') {

      con.query('SELECT * FROM employee_master WHERE EMPLID = ? AND PASSWORD = ?', [EMPLID, oldPassword], (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error'});
          return;
        }

        if (results.length === 1) {

          con.query('UPDATE employee_master SET PASSWORD = ? WHERE EMPLID = ?', [newPassword, EMPLID], (err, result) => {
            if (err) {
              console.error('Error updating password:', err);
              res.status(500).json({ success: false, message: 'Internal Server Error'});
            } else {
              res.json({ success: true, message: 'Password updated successfully'});
            }
          });
        } else {
          res.json({ success: false, message: 'Old password does not match'});
        }
      });
    } else {

      res.status(400).json({ success: false, message: 'Invalid user type'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
});

route.post('/checkOldPassword', async (req, res) => {
  try {
    const { oldPassword } = req.body;
    const EMP_CODE = req.session.user_id;
    const USER_TYPE = req.session.user_type;
    const EMPLID = req.session.emp_id;
    const con = await connection();

    if (USER_TYPE === '1') {

      con.query('SELECT * FROM hrm_user_login WHERE EMP_CODE = ? AND PASSWORD = ?', [EMP_CODE, oldPassword], (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error'});
          return;
        }

        if (results.length === 1) {
          res.json({ success: true, message: 'Old password matches'});
        } else {
          res.json({ success: false, message: 'Old password does not match'});
        }
      });
    } else if (USER_TYPE === '2') {

      con.query('SELECT * FROM employee_master WHERE EMPLID = ? AND PASSWORD = ?', [EMPLID, oldPassword], (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error'});
          return;
        }

        if (results.length === 1) {
          res.json({ success: true, message: 'Old password matches'});
        } else {
          res.json({ success: false, message: 'Old password does not match'});
        }
      });
    } else {

      res.status(400).json({ success: false, message: 'Invalid user type'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
});


// route.get('/profile/:EMP_CODE', async (req, res) => {
//   const role = req.session.role;
//   const EMP_CODE = req.params.EMP_CODE

//   var con = await connection();
//   var sql = `SELECT * FROM hrm_user_login WHERE EMP_CODE = '${EMP_CODE}'`
//   con.query(sql, (err, result) => {
//     if (result) {
//       if (result.length > 0) {
//         const employee = result[0];
//         console.log(result, "hlooooooo")
//         const firstLetter = employee.EMP_NAME.charAt(0).toUpperCase();
//         console.log(employee, 'employee')
//         console.log(firstLetter, 'firstLetter')
//         res.render('admin/profile', { employee, firstLetter, role, EMP_CODE });
//       } else {
//         res.send('Employee not found');
//       }
//     }
//     else {
//       res.send("error")
//       console.log("error fitch data")
//     }


//   });
// });


// view JD

route.get('/profile/:EMP_CODE', async (req, res) => {
  const role = req.session.role;
  const EMP_CODE = req.params.EMP_CODE;
  
  
  const userType = req.session.user_type; // Assuming userType is set in session to distinguish between different user types



  console.log(role,EMP_CODE,userType,"xsuyfdfsyifyyudf")
  var con = await connection();
  
  // Define SQL query and table based on userType
  let sql, tableName;
  if (userType === '2') {
    tableName = 'employee_master';
    sql = `SELECT * FROM ${tableName} WHERE EMPLID = '${EMP_CODE}'`;
  } else if (userType === '3') {
    tableName = 'candidate_login';
    sql = `SELECT * FROM ${tableName} WHERE candidate_id = '${EMP_CODE}'`;
  } else if (userType === '0' || userType === '1') {
    tableName = 'hrm_user_login';
    sql = `SELECT * FROM ${tableName} WHERE EMP_CODE = '${EMP_CODE}' AND ROLE = '${role}'`;
  } else {
    res.send('Invalid user type');
    return;
  }

  con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.send('Error fetching data');
      console.log(result,"hssidgfuydyfyu")
      return;
    }

    if (result.length > 0) {
      const employee = result[0];


  console.log(employee,"idbidfbikfi")
      if  (userType === '0' || userType === '1' ) {

        console.log(employee.EMP_NAME,"employee.EMP_NAME")

        const firstLetter = employee.EMP_NAME.charAt(0).toUpperCase();
        res.render('profile', { employee, firstLetter,userType, role, EMP_CODE });
      }


      else if(userType === '2') {

        console.log(employee.Emp_Name,"employee.EME")
        const firstLetter = employee.Emp_Name.charAt(0).toUpperCase();
        res.render('profile', { employee, firstLetter,userType, role, EMP_CODE });
      }



      else if(userType === '3') {

        console.log(role,"rolejsuyfduyjd")
        const firstLetter = employee.candidate_name.charAt(0).toUpperCase();
        res.render('profile', { employee, userType, firstLetter, role, EMP_CODE });
      }
      
      else {
        res.send('Employee data is invalid');
      }
    } else {
      res.send('Employee not found');
    }
  });
});


route.get('/view_user', redirectLogin, async (req, res) => {
  try {
    var query = "SELECT  ID,EMP_CODE,EMP_NAME,ROLE,EMP_DESI,EMP_Email_ID,EMP_NUMBER,EMP_VERTICAL,REP_MANAGER_ID,REP_MANAGER_NAME,REP_MANAGER_Email_ID,REP_MANAGER_MOBILE,BRANCH,ZONE,STATUS  FROM hrm_user_login"
    var con = await connection()
    con.query(query, (error, result) => {
      if (error) throw error
      else {
        console.log(result)
        res.render('admin/view_user', { role: req.session.role, user_data: result, EMP_CODE: req.session.user_id, page: "view_user" })
      }
    })
  }
  catch (error) {
    console.log(error)
  }
})

route.post('/admin_status', redirectLogin, async (req, res) => {
  var emp_id = req.body.emp_id
  var status = req.body.status
  
    var query = "update hrm_user_login set STATUS=?  where EMP_CODE =?"
    var con = await connection()
    con.query(query,[status,emp_id], (error, result) => {
    if(result.affectedRows > 0 ){
      res.send("success")
    }
    else{
      res.send("error")
    }
    })
})

route.get("/manager_view", redirectmanager, async (req, res) => {
  var con = await connection()
  const query = `SELECT  prefix,jd_id,job_title,jd_creation_master.function,business FROM jd_creation_master`

  con.query(query, (error, result) => {
    if (result.length > 0) {
      console.log("view data in successfull")
    }
    else {

      console.log(error)
    }
    res.render("manager/manager_view_jd", { data:result,role:req.session.role,EMP_CODE:req.session.emp_id, page:"manager_view_jd" })
  })


})

route.get("/manager_dashboard", redirectmanager, (req, res) => {

  res.render("manager/manager_dashboard", { role: req.session.role, EMP_CODE: req.session.emp_id });
})

function getResumePath(resume) {
  const fileExtension = path.extname(resume).toLowerCase();
  if (fileExtension === '.pdf') {
      return `pdf/${resume}`;
  } else {
      return `image/${resume}`;
  }
}

route.get("/manager_interview_schedule", redirectmanager, async (req, res) => {
  try {
      let emp_id = req.session.emp_id;
      let emp_name = req.session.name;

      const con = await connection();

      let query1 = `
      SELECT level,jdid,DATE_FORMAT(Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Interview_Date_formated,Candidate_Name,candidate_email,	 
          Mode_of_Interview,source_of_profile,resume FROM assign_interview WHERE Emp_Name='${emp_id}:${emp_name}'`;

      con.query(query1, function (err, result) {
          if (err) throw err;
          const processedResult = result.map(item => ({
              ...item,
              resumePath: getResumePath(item.resume)
          }));

          res.render("manager/manager_interview_schedule", {
              data1: processedResult,
              role: req.session.role,
              EMP_CODE: req.session.user_id,
              page: "manager_interview_schedule"
          });
      });
  } catch (err) {
      console.log(err);
  }
});


route.get("/manager_interview_score", redirectmanager, async (req, res) => {
  try {
    let emp_id = req.session.emp_id;
    let emp_name = req.session.name;
    let empcocet = `${req.session.emp_id}:${req.session.name}`
    const con = await connection();

    let query1 =
      `SELECT
      assign_interview.r_id, 
      assign_interview.level,
      assign_interview.jdid, 
      DATE_FORMAT(assign_interview.Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Interview_Date_formated,
      assign_interview.Candidate_Name,
      assign_interview.candidate_email,	 
      assign_interview.Mode_of_Interview, 
      assign_interview.source_of_profile, 
      assign_interview.resume,
      recruitment_master.division 
    FROM 
      assign_interview, recruitment_master
where
      assign_interview.Emp_Name='${emp_id}:${emp_name}' AND assign_interview.score ='empty' AND assign_interview.r_id = recruitment_master.r_id ORDER BY assign_interview.r_id DESC`


    con.query(query1, function (err, result) {
      if (err) throw err;
      console.log(result, 'result11111111')
      res.render("manager/manager_interview_score", { data1: result, role: req.session.role, EMP_CODE: req.session.user_id, page: "manager_interview_schedule", emp_name: emp_name, empcocet: empcocet });

    })


  }
  catch (err) {
    console.log(err, 'err')
  }


})


route.post("/manager_interview_score", async (req, res) => {
  const jdid = req.body.jdid;
  const score = req.body.score;

  console.log(score, "hloolollllllllllll")
  const con = await connection()
  query = `update assign_interview set score= '${score}' where jdid ='${jdid}'`

  con.query(query, function (err, data) {
    if (data) {
      console.log("success")
      res.send("success")
    } else {
      console.log(err);
      res.send("error");
    }
  })


})



route.get('/manager_create_jd', redirectmanager, (req, res) => {

  res.render("manager/manager_create_jd", { role: req.session.role, EMP_CODE: req.session.user_id });
})




// manager_requirement
route.get("/requirment", redirectmanager, async (req, res) => {
  try {
    const con = await connection()
    const query2 = `select * from division_master `
    const query1 = `SELECT  prefix,jd_id,job_title,jd_creation_master.function,business,about_us,role_summary,role_nd_responsibilites,key_performance,education_qualification,is_active,DATE_FORMAT(creation_date, '%d-%m-%Y %H:%i:%s ') AS creation_date,created_by,DATE_FORMAT(modified_date, '%d-%m-%Y %H:%i:%s ') AS modified_date,modified_by  FROM jd_creation_master WHERE jd_status ='Active' ORDER BY jd_id DESC `

    con.query(query1, (error, result) => {
      if (error) {
        console.log(error)

      }
      else {
        con.query(query2, (err, result2) => {
          if (error) {
            console.log(error);
          }

          else {
            res.render("manager/manager_requirement", { data: result, result: result2, role: req.session.role, EMP_CODE: req.session.user_id, page: "manager_requirement" })


          }

        })

      }

    })


  } catch (error) {
    console.log(error)
  }
})







// Route handlerfinterview_manage
route.post("/requirement", file.array('files'), async (req, res) => {
  // Access uploaded file details AFTER Multer middleware has processed the upload
  var jd_id = req.body.jd_id;
  console.log(jd_id,'jd_id')
  var userid = req.session.emp_id;
  var empname = req.session.name;
  var empid_name = userid + ":" + empname;
  let date = new Date().toISOString().slice(0, 10);
  let time = new Date().toLocaleString('en-GB').slice(12, 20)
  let datetime = date.concat(" ", time)
  console.log(empid_name, "hloo")
  var location_state = req.body.location_state;
  var direct_reporting = req.body.direct_reporting;
  var indirect_matrix = req.body.indirect_matrix;
  var location_hq = req.body.location_hq;
  var team_size = req.body.team_size;

  var division = req.body.division;
  var roleTextarea = req.body.roleTextarea;
  var files = req.files.map(file => file.filename).join(',');

  try {
    const con = await connection();

    const query = `INSERT INTO recruitment_master(jd_id,location_state, direct_reporting, indirect_matrix, location_hq,team_size, division, jd_requirements, raised_by, reference,creation_datetime) VALUES (?,?, ?, ?,? ,?,?, ?, ?,?,?)`;
    const values = [jd_id, location_state, direct_reporting, indirect_matrix, location_hq,team_size, division, roleTextarea, empid_name, files, datetime];

    con.query(query, values, (err, result) => {
      console.log(result,'result')
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Fail");
      } else {
         
        let r_query = `SELECT r_id FROM recruitment_master ORDER BY r_id DESC LIMIT 1;`
        con.query(r_query,(err,result2)=>{

          if(err)throw err;
          res.json({message:result2[0].r_id})
        })
      }


    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.send("Failed to connect to database");
  }
});



// recruitment request
route.get("/recruitement_request", redirectLogin, async (req, res) => {
  try {
    const query = `
    SELECT 
      r_id,
      location_state,
      location_hq,
      direct_reporting,
      indirect_matrix,
      team_size,
      division,
      raised_by,
      reference,
      prefix,
      level,
      recruitment_master.jd_id,
      job_title,
      jd_creation_master.function,
      business,
      about_us,
      role_summary,
      role_nd_responsibilites,
      key_performance,
      education_qualification
      FROM
      recruitment_master,jd_creation_master
      WHERE 
      recruitment_master.jd_id=jd_creation_master.jd_id
      ORDER BY r_id DESC`


    const con = await connection()

    con.query(query, (error, result) => {
      console.log(result,'result')
      if (error) {
        console.log(error)
      } else {
        // console.log(result,"hloooooooooo_fjajflfjajfl")
        res.render("admin/recruitment_request", { all_data: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'recruitement_request' })
      }
    })



  }
  catch (error) {

  }
})

// interview-----------------------manager---------------------------start------------------------


// recruitment request
route.get("/interview_manage", redirectLogin, async (req, res) => {
  try {
    const query =
      ` SELECT 
   
        r_id,
        level,
        jdid,
        Emp_Name, 
        DATE_FORMAT(Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Formated_Interview_Date, 
        Candidate_Name, 
        Candidate_email,
        Candidate_mobile,
        Mode_of_Interview,
        source_of_profile,
        CASE 
          WHEN  score='empty' THEN '-'
          ELSE score
        END AS score
        ,
        CASE 
          WHEN status='empty' THEN 'Select any status'
          ELSE status
          END AS status
      FROM 
        assign_interview 
      ORDER BY 
        r_id  desc`


    const con = await connection()

    con.query(query, (error, result) => {
      if (error) {
        console.log(error)
      } else {

        res.render("admin/interview_manage", { all_data: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'interview_manage' })
      }
    })


  }
  catch (error) {

  }
})

route.post('/interview_manage_filter', async (req, res) => {
  try {
    let con = await connection()
    let { from_date, to_date, status_val } = req.body
    console.log(from_date, to_date, status_val, 'api_req.body')

    let from_date1 = moment(from_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    let to_date1 = moment(to_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    console.log(from_date1, to_date1, 'api_req.body111')

    if (from_date !== '' && to_date !== '' && status_val !== 'none') {
      let query1 =
        `SELECT 
        r_id,
        level,
        jdid,
        Emp_Name, 
        DATE_FORMAT(Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Formated_Interview_Date, 
        Candidate_Name, 
        Candidate_email,
        Candidate_mobile,
        Mode_of_Interview,
        source_of_profile,
        CASE 
          WHEN  score='empty' THEN '-'
          ELSE score
        END AS score
        ,
        CASE 
          WHEN status='empty' THEN 'Select any status'
          ELSE status
          END AS status
      FROM 
        assign_interview 
      WHERE
        DATE(Interview_Date) >= ? AND DATE(Interview_Date) <= ? AND status=? 
        `


      con.query(query1, [from_date1, to_date1, status_val], function (err1, result1) {
        if (err1) throw err1
        console.log(result1, 'result111')
        res.send({ data1: result1 })
      })
    }


    else if (from_date !== '' && to_date !== '' && status_val == 'none') {
      let query1 =
        `SELECT 
        r_id,
        level,
        jdid,
        Emp_Name, 
        DATE_FORMAT(Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Formated_Interview_Date, 
        Candidate_Name, 
        Candidate_email,
        Candidate_mobile,
        Mode_of_Interview,
        source_of_profile,
        CASE 
          WHEN  score='empty' THEN '-'
          ELSE score
        END AS score
        ,
        CASE 
          WHEN status='empty' THEN 'Select any status'
          ELSE status
          END AS status
      FROM 
        assign_interview 
      WHERE
        DATE(Interview_Date) >= ? AND DATE(Interview_Date) <= ?  
      `


      con.query(query1, [from_date1, to_date1], function (err1, result1) {
        if (err1) throw err1
        console.log(result1, 'result11')
        res.send({ data1: result1 })
      })
    }

    else if (from_date == '' && to_date == '' && status_val !== 'none') {
      let query1 =
        `SELECT 
        r_id,
        level,
        jdid,
        Emp_Name, 
        DATE_FORMAT(Interview_Date, '%d-%m-%Y, %h:%i:%s %p') AS Formated_Interview_Date, 
        Candidate_Name, 
        Candidate_email,
        Candidate_mobile,
        Mode_of_Interview,
        source_of_profile,
        CASE 
          WHEN  score='empty' THEN '-'
          ELSE score
        END AS score
        ,
        CASE 
          WHEN status='empty' THEN 'Select any status'
          ELSE status
          END AS status
      FROM 
        assign_interview 
      WHERE
        status =?    `


      con.query(query1, [status_val], function (err1, result1) {
        if (err1) throw err1
        console.log(result1, 'result11')
        res.send({ data1: result1 })
      })
    }


  }
  catch (err) {
    console.log(err, 'err')
  }
})




route.post('/send_interview_status_mail',async function(req,res){
  try{

    let con=await connection()
    let hr_email=req.session.hr_email_id
    let jd_id_1=req.body.jd_id
    let jd_id=jd_id_1.slice(5,9);
    let r_id_val=req.body.r_id_val
    let status_val=req.body.status_val
    let level_val=req.body.level_val
    let candidate_name=req.body.candidate_name
    let candidate_email=req.body.candidate_email
    let candidate_mobile=req.body.candidate_mobile

    console.log(hr_email,r_id_val,status_val,level_val,candidate_name,candidate_email,candidate_mobile,'data_data')



    
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
          user: 'vishal.manthanitsolutions@gmail.com',
          pass: 'yjal dkyp ncld juil'
      },
      tls: {
        rejectUnauthorized: false 
    }
      
  });
  
      if( status_val == 'Next Level' ){        
  
        let mailOptions1 = {
          from: "vishal.manthanitsolutions@gmail.com",
          to:`${candidate_email}; ${hr_email}`,
          subject: `${r_id_val}: ${candidate_name} your have been cleared ${level_val}`,
    
          html:`
          <div style="font-size: 16px; color:black;">
            <div style="font-weight: bold ; margin-bottom: 10px;">Hi ${candidate_name} </div>
            <div style="margin-bottom: 40px;">
              You have been cleared ${level_val} 
            </div>


            <div style="font-weight: bold;">Thanks & Regards</div> 
            <div style="font-weight: bold;">MIS HR Team</div>
          </div>`
      };
    
      
      
    
        const info1 = await transporter.sendMail(mailOptions1);
        console.log('Email 1 sent: ' + info1.response);
    
      
        res.status(200).send('emails sent successfully');
      }

      else if( status_val == 'Hold' ){        
  
        let mailOptions1 = {
          from: "vishal.manthanitsolutions@gmail.com",
          to:`${candidate_email}; ${hr_email}`,
          subject: `${r_id_val}: ${candidate_name} your Hold at ${level_val}`,
    
          html:`
          <div style="font-size: 16px; color:black;"> 
            <div style="font-weight: bold ; margin-bottom: 10px;">
              Hi ${candidate_name} 
            </div>

            <div style="margin-bottom: 40px;">
              Your are Hold at ${level_val} 
            </div>



            <div style="font-weight: bold;">Thanks & Regards</div> 
            <div style="font-weight: bold;">MIS HR Team</div>
          </div>`
          
      };
    
      
      
    
        const info1 = await transporter.sendMail(mailOptions1);
        console.log('Email 1 sent: ' + info1.response);
    
      
        res.status(200).send('emails sent successfully');
      }

      else if( status_val == 'Not Short Listed' ){        
  
        let mailOptions1 = {
          from: "vishal.manthanitsolutions@gmail.com",
          to:`${candidate_email}; ${hr_email}`,
          subject: `${r_id_val}: ${candidate_name} your Not short listed for Next Round`,
    
          html:`
          <div style="font-size: 16px; color:black;">
            <div style="margin-bottom:10px; font-weight: bold;">Hi ${candidate_name} </div>
            <div style="margin-bottom:40px;">
              Your are Not Short Listed for Next Round 
            </div>


            <div style="font-weight: bold;">Thanks & Regards</div> 
            <div style="font-weight: bold;">MIS HR Team</div>
          </div>`
      };
    
      
      
    
        const info1 = await transporter.sendMail(mailOptions1);
        console.log('Email 1 sent: ' + info1.response);
    
      
        res.status(200).send('emails sent successfully');
      }

      else if( status_val == 'Short Listed'){      
        
        let query1=`SELECT job_title FROM jd_creation_master WHERE jd_id=?`
        let query2=`SELECT password FROM candidate_login WHERE r_id=?`

        con.query(query1,[jd_id], async function(err1,result1){
          if(err1) throw err1;
          console.log(result1,'result1mmmmmmmmm')
          con.query(query2,[r_id_val], async function(err2,result2){
            if(err2) throw err2;
            console.log(result2,'result2kkkkkkkkkkk')
            
        let url="http://localhost:6600//candidate_login"
  
        let mailOptions1 = {
          from: "vishal.manthanitsolutions@gmail.com",
          to:`${candidate_email}; ${hr_email}`,
          subject: `${r_id_val}: ${candidate_name} your are selected`,
    
          html:`
          <div style="font-size: 16px; color:black;">
            <div style="margin-bottom:10px; font-weight: bold;">
              Hi ${candidate_name}
            </div>

            <div >
              Your are selected as a <b>${result1[0].job_title}</b>
            </div>

            <div >
              Now you have submit you documents digitally with the help below url.  
            </div>

            <div >
              For login you need Candidate ID and Password.   
            </div>

            <div >
            <ul >
              <li>  
                Candidate ID: You have to fill your Mobile No or Email Id
              </li>
              <li>
                Password: ${result2[0].password}
              </li>
            </ul>
            </div>


            <div style=" font-weight: bold; margin-top:10px; margin-bottom:40px;">
              <b>Url:</b>
              <a href=${url}>
                <button style="font-weight: bold; background: #4169E1; color:white; padding:5px 10px 5px 10px; border-radius:10px;" >
                  Click Here
                </button>
              </a>  
            </div>

            
            <div style=" font-weight: bold;">Thanks & Regards</div> 
            <div style=" font-weight: bold;">MIS HR Team</div>
          </div>`
      };
    
      
      
    
        const info1 = await transporter.sendMail(mailOptions1);
        console.log('Email 1 sent: ' + info1.response);


        })
      })

      
        res.status(200).send('emails sent successfully');
      }
  
  
  }
  catch(err){
    console.log(err)
  }
})




// route.post("/interview_manage", async (req, res) => {
//   var r_id = req.body.r_id;
//   var jd_id= req.body.jd_id;
//   var level = req.body.level;
//   var status = req.body.status;
//   var candidate_name = req.body.candidate_name;
//   var candidate_email = req.body.candidate_email;
//   var candidate_mobile = req.body.candidate_mobile;

//   console.log(status, r_id, level, "statusgdkugeuedgeudfeihdihd");

//   try {
//     const con = await connection();

//     const sql = `UPDATE assign_interview SET status=? WHERE r_id='${r_id}' AND level='${level}'`;

//     con.query(sql, [status], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send(err);
//         return;
//       }
// console.log(result,"udytgigfiuieyfi")
//       if (result.affectedRows > 0) {

//           const query = `INSERT INTO candidate_login (r_id,jd_id,candidate_name, candidate_email, candidate_mobile,status) VALUES (?, ?, ?,?,?,?)`;
//           const values = [r_id,jd_id,candidate_name, candidate_email, candidate_mobile,status];

//           con.query(query, values, (err, result1) => {
//             console.log(result1, "data inserted");
//             if (err) {
//               console.error(err);
//               res.status(500).send(err);
//               return;
//             }

//             res.status(200).send("success");
//           });

//       } else {
//         res.status(404).send("No matching record found");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });



route.post("/interview_manage", async (req, res) => {

  try {

    var r_id = req.body.r_id;
    var jd_id = req.body.jd_id;
    var level = req.body.level;
    var status = req.body.status;
    var candidate_name = req.body.candidate_name;
    var candidate_email = req.body.candidate_email;
    var candidate_mobile = req.body.candidate_mobile;

    console.log(status, r_id, level, "statusgdkugeuedgeudfeihdihd");


    const con = await connection();

    let sql2 = `SELECT r_id FROM candidate_login`

    con.query(sql2, function (err2, result2) {
      if (err2) throw err2
      // console.log(result2,'result2')
      let candidate_login_r_id = []
      for (let i = 0; i < result2.length; i++) {
        let cand_rid = result2[i].r_id
        candidate_login_r_id.push(cand_rid)
      }
      console.log(candidate_login_r_id, 'candidate_login_r_id')

      let cand_r_id_match = candidate_login_r_id.includes(r_id)
      if (cand_r_id_match) {

        const sql = `UPDATE assign_interview SET status=? WHERE r_id='${r_id}' AND level='${level}'`;

        con.query(sql, [status], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
          } else {
            res.send('success')
          }
        })

      }
      else {


        const sql = `UPDATE assign_interview SET status=? WHERE r_id='${r_id}' AND level='${level}'`;

        con.query(sql, [status], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
          } else {
            if (status == 'Short Listed') {

              if (candidate_name.length < 4) {

                let candt_password = (candidate_name).trim() + (candidate_mobile.slice(0, 4))
                // console.log(candt_password,'candt_password')

                const query = `INSERT INTO candidate_login (r_id,jd_id,candidate_name, candidate_email, candidate_mobile,status,password) VALUES  (?, ?, ?,?,?,?,?)`;
                const values = [r_id, jd_id, candidate_name, candidate_email, candidate_mobile, status, candt_password];

                con.query(query, values, (err, result1) => {
                  console.log(result1, "data inserted");
                  if (err) {
                    console.error(err);
                    res.status(500).send(err);
                    return;
                  }

                  res.status(200).send("success");
                });

              }
              else {
                let candt_password = ((candidate_name).trim()).slice(0, 4) + (candidate_mobile.slice(0, 4))
                // console.log(candt_password,'candt_password')


                const query = `INSERT INTO candidate_login (r_id,jd_id,candidate_name, candidate_email, candidate_mobile,status,password) VALUES  (?, ?, ?,?,?,?,?)`;
                const values = [r_id, jd_id, candidate_name, candidate_email, candidate_mobile, status, candt_password];

                con.query(query, values, (err, result1) => {
                  console.log(result1, "data inserted");
                  if (err) {
                    console.error(err);
                    res.status(500).send(err);
                    return;
                  }

                  res.status(200).send("success");
                });

              }
            }
            else {
              res.send('success')
            }


          }
        })
      }



    })


  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});




route.get("/interview_manage_view", redirectLogin, async (req, res) => {
  try {
    const query = "SELECT r_id, level,jdid, Emp_Name, DATE_FORMAT(Interview_Date, '%d-%m-%Y %H:%i:%s ') AS Interview_Date, Candidate_Name, Mode_of_Interview,source_of_profile,score,status from assign_interview"

    const con = await connection()

    con.query(query, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result.length, "hloooooooooo")
        res.render("admin/interview_manage_view", { all_data: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'interview_manage' })
      }
    })



  }
  catch (error) {

  }
})




route.get("/offer_letter_template", redirectLogin,async  (req, res) => {  

  var conn = await connection()

  sql = `select candidate_id, jd_id, candidate_name, candidate_email, candidate_mobile from  candidate_login `

  conn.query(sql , (error,result)=>{
 if(result.length > 0) {
console.log(result,"success")
 }
 else{
  console.log("error",error)
 } 

 res.render("admin/offer_letter_template", {   all_data:result,  role: req.session.role, EMP_CODE: req.session.user_id, page: 'offer_letter_template' })
})
       
      })



      route.get("/health_template", redirectLogin,async  (req, res) => {  

        var conn = await connection()

        sql = `select candidate_id, jd_id, candidate_name, candidate_email, candidate_mobile from  candidate_login `

        conn.query(sql , (error,result)=>{
       if(result.length > 0) {
console.log(result,"success")
       }
       else{
        console.log("error",error)
       } 
       
       res.render("admin/health_template", {  all_data:result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'health_template' })
        })

        
      })



      route.get("/terminate_temp", redirectLogin,async  (req, res) => {  

        var conn = await connection()

        sql = `select candidate_id, jd_id, candidate_name, candidate_email, candidate_mobile from  candidate_login `

        conn.query(sql , (error,result)=>{
       if(result.length > 0) {
console.log(result,"success")
       }
       else{
        console.log("error",error)
       } 
       
       res.render("admin/terminate_temp", {  all_data:result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'health_template' })
        })

        
      })
  

      route.get("/warning_temp", redirectLogin,async  (req, res) => {  

        var conn = await connection()

        sql = `select candidate_id, jd_id, candidate_name, candidate_email, candidate_mobile from  candidate_login `

        conn.query(sql , (error,result)=>{
       if(result.length > 0) {
console.log(result,"success")
       }
       else{
        console.log("error",error)
       } 
       
       res.render("admin/warning_temp", {  all_data:result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'health_template' })
        })

        
      })
  
      






  
 






route.get("/interview_view", redirectLogin, async (req, res) => {
  try {
    const query = `
      SELECT 
      assign_interview.ID,
        assign_interview.r_id, 
        assign_interview.level,
        assign_interview.jdid,
        assign_interview.Emp_Name, 
        DATE_FORMAT(assign_interview.Interview_Date, '%d-%m-%Y %H:%i:%s') AS Interview_Date, 
        assign_interview.Candidate_Name, 
        recruitment_master.division,
        recruitment_master.location_hq,
        jd_creation_master.jd_id,
        jd_creation_master.job_title

      FROM 
        recruitment_master 
      JOIN 
        assign_interview ON assign_interview.r_id = recruitment_master.r_id 

        JOIN
        jd_creation_master ON recruitment_master.jd_id = jd_creation_master.jd_id

      ORDER BY 
      assign_interview.ID DESC;
    `;

    const con = await connection();

    con.query(query, (error, result) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).send("Internal Server Error");
      }

      console.log(result.length, "hloooooooooo", result);
      res.render("admin/interview_view", {
        all_data: result,
        role: req.session.role,
        EMP_CODE: req.session.user_id,
        page: 'interview view'
      });
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Internal Server Error");
  }
});


// interview-----------------------manager---------------------------end--------------------



//  hr _view employee -------------------start---------------

route.get('/hr_view_employee', redirectLogin, async (req, res) => {
  // Execute the SELECT query
  const conn = await connection();
  conn.query('SELECT * FROM employee_master', (error, result) => {
    if (error) throw error;

    // Render the 'viewData.ejs' template and pass the data to it
    res.render("admin/hr_view_employee", { data: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'hr_view_employee' });
  })
})


// ------------------------------- hr _view employee -------------------end----------------------------------


// route.post('/get_emp', redirectLogin, async (req, res) => {

//   try {


//     let jd_id = req.body.jd_id;

//     let r_id = req.body.r_id;
   

//     const con = await connection()


//     var query = "SELECT CONCAT(EMPLID,':',EMP_Name)AS Full_name FROM employee_master"


//     con.query(query, (error1, result1) => {
//       if (error1) throw error1

//       else {
//         console.log(result1, 'result1_fdkaf')

//         var query2 =
//           `SELECT
//         assign_interview.r_id,  
//         assign_interview.jdid, 
//         assign_interview.level,
//         assign_interview.status,
//         assign_interview.score
//       FROM
//         assign_interview
//       WHERE 
//         assign_interview.r_id=?`

//         con.query(query2, [r_id], (error2, result2) => {
//           if (error2) throw error2;
//           console.log(result2, 'result2_dfjdflk')
//           res.send({ data1: result1, data2: result2 })
//         })



//       }
//     })
//   }
//   catch (error) {
//     console.log(error)
//   }

// })



route.post('/get_emp', redirectLogin, async (req, res) => {

  try {


    let jd_id = req.body.jd_id;
    console.log(jd_id, 'jd_id_jgfjlajl')
    let r_id = req.body.r_id;
    console.log(r_id, 'r_id_r_id1111')

    const con = await connection()


    var query = "SELECT CONCAT(EMPLID,':',EMP_Name)AS Full_name FROM employee_master"


    con.query(query, (error1, result1) => {
      if (error1) throw error1

      else {
        console.log(result1, 'result1_fdkaf')

        var query2 =
          `SELECT 
        assign_interview.r_id,  
        assign_interview.jdid, 
        assign_interview.level,
        assign_interview.status,
        assign_interview.score,
        assign_interview.Candidate_Name,
        assign_interview.candidate_mobile,
        assign_interview.candidate_email,
        assign_interview.source_of_profile,
        assign_interview.remarks
      FROM
        assign_interview
      WHERE 
        assign_interview.r_id=?`

        con.query(query2, [r_id], (error2, result2) => {
          if (error2) throw error2;
          console.log(result2, 'result2_dfjdflk')
          res.send({ data1: result1, data2: result2 })
        })



      }
    })
  }
  catch (error) {
    console.log(error)
  }

})


route.post('/health_template_email',async(req,res)=>{
  console.log("heloo")
  try {
    let mail=req.body.pre
 let receiver1='ramkeshn311@gmail.com'

    let toAddresses = `${receiver1}`;

    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
          user: 'hrm@manthanitsolutions.in',
          pass: 'Manthan@4321#'
      },
      debug: true
  });

    let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: toAddresses,
        subject: 'Health Letter Temp',
        html: `<pre>${mail}</pre>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.send("success");
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        logger.error(error + ' in nodemailer')
        throw error;
    }  } catch (error) {
    console.log(error)
  }
})

route.post('/terminate_template_email',async(req,res)=>{
  console.log("heloo")
  try {

    let mail=req.body.pre
 let receiver1=req.body.candidate_email
 console.log(req.body.candidate_email)


    let toAddresses = `${receiver1}`;


    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
          user: 'hr@manthanitsolutions.in',
          pass: 'Harpal@2024#'
      },
      debug: true
  });

    let mailOptions = {
        from: 'hr@manthanitsolutions.in',
        to: toAddresses,
        subject: 'Termination Letter',
        html: `<pre>${mail}</pre>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.send("success");
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }  } catch (error) {
    console.log(error)
  }
})

route.post('/warning_template_email',async(req,res)=>{
  console.log("heloo")
  try {


    let mail=req.body.pre
 let receiver1=req.body.candidate_email

    let toAddresses = `${receiver1}`;


    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
          user: 'hr@manthanitsolutions.in',
          pass: 'Harpal@2024#'
      },
      debug: true
  });

    let mailOptions = {
        from: 'hr@manthanitsolutions.in',
        to: toAddresses,
        subject: 'Warning Letter',
        html: `<pre>${mail}</pre>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.send("success");
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }  } catch (error) {
    console.log(error)
  }
})


route.post('/interview_data', file.single('resume'), async (req, res) => {
 
  const hr_id = req.session.user_id; // Retrieve hr_id from session
  const formData = req.body;


  const con = await connection()
  const resume = req.file;

  const {
    level,
    r_id,
    jd_id,
    emp_name,
    date_time,
    cand_name,
    mode_inter,
    url,
    address,
    remarks,
    cand_mobl_no,
    cand_email,
    sour_of_profile,
    score,
  } = formData;


  console.log(sour_of_profile,'11111')
  const emp_id = formData.emp_name.split(":")[0];
  const emp_nam = formData.emp_name.split(":")[1];
  const date = formData.date_time.split("T")[0];
  const time = formData.date_time.split("T")[1];
  const level_1 = formData.level.split("-")[1];


  // const con = await connection();

  // Query to get HR's email using hr_id
  const hrEmailQuery = `SELECT Emp_Email_ID FROM hrm_user_login WHERE EMP_CODE = ?`;


  con.query(hrEmailQuery, [hr_id], (err, hrResult) => {
    if (err) {
      console.error('Error retrieving HR email:', err);
      res.status(500).send('Error retrieving HR email');
      return;
    }

    if (hrResult.length === 0) {
      console.error('No HR found with the provided hr_id:', hr_id);
      res.status(404).send('HR not found');
      return;
    }

    const hr_email = hrResult[0].Emp_Email_ID;
    // Query to get employee's email using emp_id
    const empEmailQuery = `SELECT EmpPersonal_EMAILID FROM employee_master WHERE EMPLID = ?`;

    con.query(empEmailQuery, [emp_id], (err, empResult) => {
      if (err) {
        console.error('Error retrieving employee email:', err);
        res.status(500).send('Error retrieving employee email');
        return;
      }

      if (empResult.length === 0) {
        console.error('No employee found with the provided emp_id:', emp_id);
        res.status(404).send('Employee not found');
        return;
      }

      const emp_email = empResult[0].EmpPersonal_EMAILID.concat(";");

      console.log(emp_email, "hlllo")

      // mobile_query= `select candidate_mobile,candidate_email from assign_interview where  candidate_mobile=? OR candidate_email=?` 

      // con.query(mobile_query,[cand_mobl_no,cand_email],(err,resultmobile)=>{
      //   if (err) {
      //     console.error('Error checking mobile number and email:', err);
      //     res.status(500).send('Error checking mobile number and email');
      //     return;
      //   }

      //   if (resultmobile.length > 0) {
      //     console.log('Mobile number and email already exist:', resultmobile);
      //     res.send('error');
      //   }
      // else{
      console.log(err, "error")
      const sql = `
    INSERT INTO assign_interview 
    (level, r_id, jdid, Emp_Name, Interview_Date, Candidate_Name, Mode_of_Interview,meeting_link,address,remarks, candidate_mobile, candidate_email, source_of_profile, resume, score, status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

      con.query(sql, [level, r_id, jd_id, emp_name, date_time, cand_name, mode_inter, url, address, remarks, cand_mobl_no, cand_email, sour_of_profile, resume.originalname, 'empty', 'empty'], (err, result) => {
        if (err) {
          console.error('Error inserting interview data:', err);
          res.status(500).send('Failed to insert data');
        }

        else {

          let query2 = `UPDATE recruitment_master SET level=? WHERE r_id=?`
          console.log(level, "hlooohiohiu")
          con.query(query2, [level, r_id], function (err, result2) {
            if (err) throw err

            const msg = [cand_email, emp_email,]
            const Link = "http://localhost:6600/candidate_login"

         
            console.log(msg, 'msg_msg111111')
            // Send email after data insertion
            sendEmail(cand_name, date, time, hr_email, msg, emp_nam, level_1, mode_inter, url, address, resume, r_id, Link);

            res.send("success");

          })
        }


      })
        // }


        // })

        // 


        ;
    });
  });
})


// Function to send email using Nodemailer
function sendEmail(cand_name, date, time, hr_email, msg, emp_nam, level_1, mode_inter, url, address, resume, r_id, Link) {
  const r_id1 = r_id.r_id
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vishal.manthanitsolutions@gmail.com',
      pass: 'yjal dkyp ncld juil'
    }
  });

  if (mode_inter == 'Telephonic') {

    const mailOptions = {
      from: 'vishal.manthanitsolutions@gmail.com',
      to: msg,
      cc: hr_email,
      attachments: [{
        filename: 'output.pdf',
        path: __dirname + '/output.pdf',
        contentType: 'application/pdf'
      }],
      subject: 'Interview Schedule',
      text: `Subject line: Interview for at Manthan it Solutions.
  
      Dear Mr. ${cand_name},
  
      Your interview has been Scheduled with Mr.${emp_nam} – So be available during the time.

      Level -${level_1}
  
      Date – ${date} || Timing – ${time}`,

      attachments: [
        {
          filename: `document${r_id1}.pdf`,
          content: resume,
          encoding: 'base64'
        }
      ]

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } else if (mode_inter == 'ZOOM/MST') {
    const mailOptions = {
      from: 'vishal.manthanitsolutions@gmail.com',
      to: msg,
      cc: hr_email,
      subject: 'Interview Schedule',
      text: `Subject line: Interview for at Manthan it Solutions
  
      Dear Mr. ${cand_name},
  
      Your interview has been Scheduled with Mr.${emp_nam} – So be available during the time.
  
      Level -${level_1}
  
      Mode Of Interview - ${mode_inter}
      
      Interview Link - ${url}
  
      Date – ${date} || Timing – ${time}
     
      `,

      attachments: [
        {
          filename: `document${r_id1}.pdf`,
          content: resume, // Assuming `resume` contains the PDF content
          encoding: 'base64'
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } else if (mode_inter == 'Face To Face') {
    const mailOptions = {
      from: 'vishal.manthanitsolutions@gmail.com',
      to: msg,
      cc: hr_email,
      subject: 'Interview Schedule',
      text: `Subject line: Interview for at Manthan it Solutions
  
      Dear Mr. ${cand_name},
  
      Your interview has been Scheduled with Mr.${emp_nam} – So be available during the time.
  
      Level -${level_1}
  
      Mode Of Interview - ${mode_inter}
      
      Address - ${address}
  
      Date – ${date} || Timing – ${time}
     
      `,
      attachments: [
        {
          filename: `document${r_id1}.pdf`,
          content: resume,
          encoding: 'base64'
        }
      ]
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }

}



route.post('/reporting_view', async (req, res) => {
  const jd_id = req.body.jd_id;

  if (!jd_id) {
    return res.status(400).send('JD ID is missing in the request body');
  }

  const con = await connection();

  let query_1 = `SELECT location_state, direct_reporting, location_hq,team_size FROM recruitment_master WHERE jd_id = ?`;
  con.query(query_1, [jd_id], (error, result) => {
    console.log(result)
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send('Internal Server Error');
    }


    res.status(200).send({ result: result });
  });
});



route.post('/employeetable', async (req, res) => {
  try {
    const con = await connection(); // Establish database connection

    let qry1 = `SELECT DISTINCT EMPLID, Emp_Name, COMPANY, Comp_Name, Vertical, SubVertical, POSITION, Prefix, FIRST_NAME, MIDDLE_NAME, LAST_NAME, PAYROLL_STATUS, BUSINESS_UNIT, BU_Descr, DEPTID, Department, CostCenterID, EMP_FUNCTION, BUSINESS, PAYGROUP, PAYGROUP_DESCR, LOCATION_STATE, LOCATION, LOCATION_DESCR, SEX, BIRTHDATE, QUALIFICATION, Prev_Exp, Jub_Exp, Tot_Exp, TERM_DATE, HIRE_DATE, Designation, JOBCODE, GRADE, Supervisor_PositionID, SUPERVISOR_ID, SUPERVISOR_NAME, Sup_EMAIL_ADDR, L2_SUPERVISOR_ID, L2_SUPRVISOR_NAME, L2_POSITION_NBR, L2_EMAIL, Previous_EMPLOYER, BLOOD_TYPE, MAR_STATUS, MARRIAGE_DATE, PAN, EmpBUSSINESS_EMAILID, EmpPersonal_EMAILID, BUS_PHONE, HOME_PHONE, EMERG_CNTCT, ADDRESS, FATHER_NAME FROM employee_master`;

    con.query(qry1, async (error, result) => {
      if (error) {
        throw error; // Handle error properly
      }

      // Create a new workbook and worksheet
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Employee Data');

      // Define column headers
      const columns = [
        'EMPLID', 'Emp_Name', 'COMPANY', 'Comp_Name', 'Vertical', 'SubVertical', 'POSITION', 'Prefix', 'FIRST_NAME', 'MIDDLE_NAME', 'LAST_NAME', 'PAYROLL_STATUS', 'BUSINESS_UNIT', 'BU_Descr', 'DEPTID', 'Department', 'CostCenterID', 'EMP_FUNCTION', 'BUSINESS', 'PAYGROUP', 'PAYGROUP_DESCR', 'LOCATION_STATE', 'LOCATION', 'LOCATION_DESCR', 'SEX', 'BIRTHDATE', 'QUALIFICATION', 'Prev_Exp', 'Jub_Exp', 'Tot_Exp', 'TERM_DATE', 'HIRE_DATE', 'Designation', 'JOBCODE', 'GRADE', 'Supervisor_PositionID', 'SUPERVISOR_ID', 'SUPERVISOR_NAME', 'Sup_EMAIL_ADDR', 'L2_SUPERVISOR_ID', 'L2_SUPRVISOR_NAME', 'L2_POSITION_NBR', 'L2_EMAIL', 'Previous_EMPLOYER', 'BLOOD_TYPE', 'MAR_STATUS', 'MARRIAGE_DATE', 'PAN', 'EmpBUSSINESS_EMAILID', 'EmpPersonal_EMAILID', 'BUS_PHONE', 'HOME_PHONE', 'EMERG_CNTCT', 'ADDRESS', 'FATHER_NAME'
      ];

      // Add column headers to the worksheet
      worksheet.addRow(columns);

      // Add data to the worksheet
      result.forEach(row => {
        const rowData = [];
        Object.keys(row).forEach(key => {
          rowData.push(row[key]);
        });
        worksheet.addRow(rowData);
      });

      // Set response headers for Excel file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="Employee_Data.xlsx"');

      // Write the workbook to response as Excel file
      await workbook.xlsx.write(res);
      res.end();
    });
  } catch (error) {
    res.render('error_pg', { err: error });
  }
});






// Generate unique filename for PDF
const generateUniqueFilename = () => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  return 'user_details_' + uniqueSuffix + '.pdf';
};




route.post('/generate-pdf', upload.none(), async (req, res) => {
  var rid = req.body.rid

  const emp_id = req.session.emp_id
  const Name = req.session.name
  const fullname = (emp_id + ":" + Name)

  var name = req.body.name;
  var jd_id = req.body.jd_id;
  var level = req.body.level;
  var totalCell = req.body.totalCell;
  var percentageCell = req.body.percentageCell;
  var totalCell1 = req.body.totalCell1;
  var percentageCell1 = req.body.percentageCell1;
  var totalCell2 = req.body.totalCell2;
  var percentageCell2 = req.body.percentageCell2;


  var score1 = req.body.score1;
  var score2 = req.body.score2;
  var score3 = req.body.score3;
  var score4 = req.body.score4;
  var score5 = req.body.score5;
  var score6 = req.body.score6;
  var score8 = req.body.score8;
  var score9 = req.body.score9;
  var score10 = req.body.score10;
  var score11 = req.body.score11;
  var remarks1 = req.body.remarks1;


  var score_1 = req.body.score_1;
  var score_2 = req.body.score_2;
  var score_3 = req.body.score_3;
  var score_4 = req.body.score_4;
  var score_5 = req.body.score_5;
  var score_6 = req.body.score_6;
  var score_8 = req.body.score_8;
  var score_9 = req.body.score_9;
  var score_10 = req.body.score_10;
  var score_11 = req.body.score_11;



  var score01 = req.body.score01;
  var score02 = req.body.score02;
  var score03 = req.body.score03;
  var score04 = req.body.score04;
  var score05 = req.body.score05;
  var score06 = req.body.score06;
  var score08 = req.body.score08;
  var score09 = req.body.score09;
  var score010 = req.body.score010;
  var score011 = req.body.score011;




  var date_time = req.body.date_time;
  var remarks = req.body.remarks;
  var date_time1 = req.body.date_time1;
  var remarks1 = req.body.remarks1;
  var date_time2 = req.body.date_time2;
  var remarks2 = req.body.remarks2;







  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const date_time5 = currentDate + ' ' + currentTime;


  const conn = await connection();

  if (level == "Interviewer-1") {


    const insertSql = `INSERT INTO interview_score (
   r_id, levels, jd_id, S_1, S_2, S_3, S_4, S_5, S_6, S_7, S_8, S_9, S_10,score_by,score_dt,total_score,percentage,manager_remarks) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSql, [
      rid, level, jd_id, score1, score2, score3, score4, score5, score6, score8, score9, score10, score11, fullname, date_time5, totalCell, percentageCell, remarks
    ], (error, results, fields) => {
      if (error) {
        console.error('Insert Error: ', error);
        throw error;
      }

      console.log('11')

      // Update query
      const updateSql = `UPDATE assign_interview SET score = ? WHERE r_id = ? AND level = ? AND jdid = ?`;
      conn.query(updateSql, [totalCell, rid, level, jd_id], (err, result2) => {
        if (err) {
          console.error('Update Error: ', err);
          throw err;
        }

        res.send("success");
      });
    });

  } else if (level == "Interviewer-2") {
    // Insert data into database
    const insertSql = `INSERT INTO interview_score (
   r_id, levels, jd_id, S_1, S_2, S_3, S_4, S_5, S_6, S_7, S_8, S_9, S_10, score_by, score_dt, total_score, percentage, manager_remarks
 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSql, [
      rid, level, jd_id, score_1, score_2, score_3, score_4, score_5, score_6, score_8, score_9, score_10, score_11, fullname, date_time1, totalCell1, percentageCell1, remarks1
    ], (error, results, fields) => {
      if (error) {
        console.error('Insert Error: ', error);
        throw error;
      }

      console.log('22')

      // Update query
      const updateSql = `UPDATE assign_interview SET score = ? WHERE r_id = ? AND level = ? AND jdid = ?`;
      conn.query(updateSql, [totalCell, rid, level, jd_id], (err, result2) => {
        if (err) {
          console.error('Update Error: ', err);
          throw err;
        }

        res.send("success");
      });
    });

  } else if (level == "Interviewer-3") {
    // Insert data into database
    const insertSql = `INSERT INTO interview_score (
   r_id, levels, jd_id, S_1, S_2, S_3, S_4, S_5, S_6, S_7, S_8, S_9, S_10, score_by, score_dt, total_score, percentage, manager_remarks
 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSql, [
      rid, level, jd_id, score01, score02, score03, score04, score05, score06, score08, score09, score010, score011, fullname, date_time2, totalCell2, percentageCell2, remarks2
    ], (error, results, fields) => {
      if (error) {
        console.error('Insert Error: ', error);
        throw error;
      }


      // Update query
      const updateSql = `UPDATE assign_interview SET score = ? WHERE r_id = ? AND level = ? AND jdid = ?`;
      conn.query(updateSql, [totalCell, rid, level, jd_id], (err, result2) => {
        if (err) {
          console.error('Update Error: ', err);
          throw err;
        }

        res.send("success");
      });
    });

  }
});


// // Route to handle PDF download
route.get('/download-pdf', (req, res) => {
  const pdfPath = 'pdfs'; 

  fs.readdir(pdfPath, (err, files) => {
    if (err) {
      console.error('Error reading PDF folder:', err);
      res.status(500).send('Error reading PDF folder');
      return;
    }

    // Select a random PDF file from the list
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];

    // Send the randomly selected PDF file for download
    res.download(path.join(pdfPath, randomFile), randomFile, (err) => {
      if (err) {
        console.log('Error downloading PDF:', err);
        res.status(500).send('Error downloading PDF');
        return;
      }
    });
  });
});



// Route to handle PDF download



// Delete the PDF file after download
// fs.unlink(pdfPath, (err) => {
//   if (err) {
//     console.log('Error deleting PDF file:', err);
//     return;
//   }
//   console.log('PDF file deleted');
// });









route.get("/test", (req, res) => {
  res.render("manager/manager_test")
})


// candidate -------------------section ---------------------start------------------------------------

route.get('/candidate_dashboard', function (req, res) {
  try {
    res.render('candidate/candidate_dashboard', { role: 'candidate', page: "candidate_status" })
  }
  catch (err) {
    console.log(err, 'err')
  }
})

route.get('/candidate_documents', redirectCandidate, async (req, res) => {

  res.render('candidate/candidate_requirement_doc', { role: 'Candidate', page: "candidate_documents",c_id:req.session.candidate_id })


})
//

route.get('/candidate_status', function (req, res) {
  try {
    res.render('candidate/candidate_status', { role: 'candidate', page: "candidate_status" })
  }
  catch (err) {
    console.log(err, 'err')
  }
})


// route.get('/candidate_login', function (req, res) {



//   res.render('candidate/candidate_login')
// }
// )




route.get('/candidate_section',redirectCandidate , async (req, res)=> {
var candidate_id= req.session.candidate_id


 var conn = await connection()
sql = `select  * from candidate_personal_details where candidate_id='${candidate_id}'`

conn.query(sql, (err,result) => { 

  if(result.length > 0){
    console.log(result,"eidjlofih")
  }
  else{
    console.log("no data")
  }
  res.render("candidate/candidate_section", {  candidate:result, role: 'candidate', page: "candidate_section" })
})

 
}
)






// route.post('/candidate_login', async (req, res) => {
//   const { candidate_email_mobile, PASSWORD } = req.body;
// console.log(req.body)

//   try {
//     const con = await connection();

//     // Execute query to check if candidate exists
//     let query = 'SELECT * FROM candidate_login WHERE candidate_id = ? AND PASSWORD = ?   AND status = ?';

//     con.query(query, [candidate_email_mobile, PASSWORD, "Short Listed"], async (err, results) => {
//       if (err) {
//         console.error('Error executing SQL query:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }

//       // If user found
//       if (results.length > 0) {
//         // For HR
//         req.session.candidate_id = results[0].candidate_id;
//         req.session.candidate_name = results[0].candidate_name;
//         console.log(req.session.candidate_id, req.session.candidate_name, "candidate status")
//         // Update login dates
//         const currentDate = new Date().toISOString().slice(0, 10);
//         const currentTime = new Date().toLocaleString().slice(10, 18);
//         const loginDateTime = currentDate + ' ' + currentTime;

//         // Assuming you want to redirect to a specific URL after successful login
//         res.send('success');
//         // Example of using SweetAlert for a success message

//       } else {
//         // Candidate not found or incorrect credentials
//         res.send('error');
//         // Example of using SweetAlert for an error message

//       }
//     });
//   } catch (error) {
//     console.error('Error connecting to database:', error);

//   }
// });


// candidate -------------------section ---------------------end-----------------------------------



//  manager ------------------section---------------------------start-------------------------
route.get("/manager_view_score", redirectmanager, async (req, res) => {
  const emp_id = req.session.emp_id
  const role = req.session.role
  const Name = req.session.name

  const fullname = (emp_id + ":" + Name)

  const conn = await connection()
  
  const sql = `SELECT interview_score.id,interview_score.r_id,interview_score.levels,interview_score.jd_id,interview_score.score_by,DATE_FORMAT(score_dt, '%d-%m-%Y %H:%i:%s ') AS score_dt,assign_interview.r_id,assign_interview.level,assign_interview.jdid,assign_interview.Emp_Name,assign_interview.Candidate_Name,recruitment_master.division,
  recruitment_master.location_hq,jd_creation_master.jd_id,jd_creation_master.job_title,pdf_file,total_score,percentage,manager_remarks FROM interview_score JOIN 
  assign_interview ON assign_interview.r_id = interview_score.r_id  JOIN recruitment_master ON assign_interview.r_id = recruitment_master.r_id JOIN jd_creation_master ON recruitment_master.jd_id = jd_creation_master.jd_id WHERE interview_score.score_by = '${fullname}' ORDER BY interview_score.r_id DESC limit 1;`
    conn.query(sql, (err, result) => {
    if (result) {
      console.log("result", result)

    }
    else {
      console.error(err, "error");
    }
    res.render("manager/manager_view_score", { data1: result, role: req.session.role, EMP_CODE: req.session.user_id, page: 'manager_view_score' })
  })
})





// route.post('/your_delete_endpoint', async (req, res) => {
//   // Prevent page refresh


//   let r_id = req.body.r_id;

//   const conn = await connection();

//   const queryString = `DELETE FROM recruitment_master WHERE r_id = ?`;

//   conn.query(queryString, [r_id], (error, results, fields) => {
//     console.log(results, 'results')
//     if (error) {
//       console.error('Error deleting record:', error);
//       res.status(500).send('Error deleting record');
//     } else {
//       console.log('Record deleted successfully');
//       // Send response to client
//       res.status(200).send('Record deleted successfully');
//     }
//   });
// });

//  manager ------------------section---------------------------end-------------------------

route.post('/your_delete_endpoint', async (req, res) => {
  
  let r_id = req.body.r_id; 
  
  const conn = await connection();
  
  const queryString = `DELETE FROM recruitment_master WHERE r_id = ?`;

  conn.query(queryString, [r_id], (error, results, fields) => {
    console.log(results,'results')
    if (error) {
      console.error('Error deleting record:', error);
      res.status(500).send('Error deleting record');
    } else {
      console.log('Record deleted successfully');
      // Send response to client
      res.status(200).send('Record deleted successfully');
    }
  });
});



route.get('/candidate_form', (req, res) => {
  try {
    res.render('candidate/candidate_form')
  }
  catch (err) {
    console.log(err, 'err')
  }
})







// Endpoint to handle form submission
route.post('/candidate_personal_details', upload.single('candidate_image'), async (req, res) => {
  const {
    first_name, middle_name, last_name, communication_addrs, permanent_addrs, pin_code,
    mobile_no, Emergency_no, tel_no, email_id, date_of_birth, age, gender, marital_status,
    spouse_name, occupation, blood_group, relative_name, relative_designation, relative_relationship
  } = req.body;

  const candidate_image = req.file ? req.file.originalname : null;
  const concatenated_names = `${middle_name}${last_name}`;
  const candidate_id = req.session.candidate_id;

  console.log(first_name, candidate_image, candidate_id, relative_relationship, concatenated_names, 'shwkidguix');

  // Parse and format date_of_birth
  let formatted_date_of_birth;
  try {
    const parsedDate = new Date(date_of_birth);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }
    formatted_date_of_birth = parsedDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Invalid date_of_birth:', date_of_birth);
    res.status(400).send('Invalid date_of_birth');
    return;
  }
  const db = await connection();

  // Insert data into MySQL database
  const sql = `INSERT INTO candidate_personal_details (
    candidate_id, candidate_image, candidate_firstname, candidate_lastname, communication_address, permanent_address,
    area_pincode, mobile_no, emergency_mobile_no, telphone_no, email_id, date_of_birth, age, gender, marital_status,
    spouse_name, occupation, blood_group, relative_name, relative_designation, relative_relationship
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    candidate_id, candidate_image, first_name, concatenated_names, communication_addrs, permanent_addrs, pin_code,
    mobile_no, Emergency_no, tel_no, email_id, formatted_date_of_birth, age, gender, marital_status, spouse_name,
    occupation, blood_group, relative_name, relative_designation, relative_relationship
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send('Data successfully submitted');
  });
});



route.post('/education_record_submit', async(req, res)=> {
  let educationData = req.body.educationData;

var candidate_id = req.session.candidate_id
 var conn = await connection()


 const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const updateDateTime = currentDate + ' ' + currentTime;
  // Example query - you should customize it to match your database schema
  let query = "INSERT INTO education_details (candidate_id,examination_passed, university, year_form, year_to, specialization, division, cgpa, update_date) VALUES ?";
  let values = educationData.map(item => [candidate_id,item.examination_passed, item.university, item.year_form, item.year_to, item.specialization, item.division, item.cgpa,updateDateTime]);

  conn.query(query, [values],  (error, results) =>{
      if (error) {
          console.error('Database query error:', error);
          res.status(500).json({ message: 'Database query error', error: error });
          return;
      }

      if (results.affectedRows > 0) {
          res.json('success');
      } else {
          res.json('failure');
      }
  });
});



route.post('/Job_Related_Training_submit', async(req, res)=> {
  let Job_Related_Training = req.body.Job_Related_Training;

var candidate_id = req.session.candidate_id
 var conn = await connection()


 const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const updateDateTime = currentDate + ' ' + currentTime;
  // Example query - you should customize it to match your database schema
  let query = "INSERT INTO job_related_training (candidate_id,name_of_course, duration, year, institute, certificate_awarded,update_date) VALUES ?";
  let values = Job_Related_Training.map(item => [candidate_id,item.Name_of_Course, item.Duration, item.Year, item.Institute, item.award,updateDateTime]);

  conn.query(query, [values],  (error, results) =>{
      if (error) {
          console.error('Database query error:', error);
          res.status(500).json({ message: 'Database query error', error: error });
          return;
      }

      if (results.affectedRows > 0) {
          res.json('success');
      } else {
          res.json('failure');
      }
  });
});



route.post('/employment_submit', async(req, res)=> {
  let employment_data = req.body.employment_data;

var candidate_id = req.session.candidate_id
 var conn = await connection()


 const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const updateDateTime = currentDate + ' ' + currentTime;
  // Example query - you should customize it to match your database schema
  let query = "INSERT INTO Employment_detatils (candidate_id,Name_Organization, Position, From_date, To_date,Tenure,Name_Designation,Annual_CTC,Reason_for_Leaving,joining_date_from,joining_date_to,update_date) VALUES ?";
  let values = employment_data.map(item => [candidate_id,item.Name_Organization, item.Position, item.From, item.To,item.Tenure,item.Name_Designation,item.Annual_CTC,item.Reason_for_Leaving,item.Select_Date_From,item.Select_Date_To,updateDateTime]);

  conn.query(query, [values],  (error, results) =>{
      if (error) {
          console.error('Database query error:', error);
          res.status(500).json({ message: 'Database query error', error: error });
          return;
      }

      if (results.affectedRows > 0) {
          res.json('success');
      } else {
          res.json('failure');
      }
  });
});



route.post('/language_submit_form', async (req, res) => {
  const languages = req.body.languages;
  const candidate_id = req.session.candidate_id;
  var conn = await connection()
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const updateDateTime = currentDate + ' ' + currentTime;

  if (!candidate_id) {
    return res.status(400).json({ status: 'error', message: 'No candidate ID in session' });
  }


  if (languages && languages.length > 0) {
    let query = 'INSERT INTO Candidate_Languages_known (candidate_id, language, speak, `read`, `write`) VALUES ';
    const values = languages.map(lang => {
      return `('${candidate_id}', '${lang.language}', '${lang.speak}', '${lang.read}', '${lang.write}','${updateDateTime}')`;
    }).join(', ');

    query += values;

    conn.query(query, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ status: 'error', message: err.message });
      } else {
        return res.status(200).json({ status: 'success', message: 'Data successfully inserted' });
      }
    });
  } else {
    return res.status(400).json({ status: 'error', message: 'No data received' });
  }
});



route.post('/whom_reference_submit', async (req, res) => {
  const reference_data = req.body.reference_data;
  const candidate_id = req.session.candidate_id;
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleString().slice(10, 18);
  const updateDateTime = currentDate + ' ' + currentTime;
  var conn = await connection()
  if (!candidate_id) {
    return res.status(400).json({ status: 'error', message: 'No candidate ID in session' });
  }

  if (reference_data && reference_data.length > 0) {
    let query = 'INSERT INTO whom_references (candidate_id, s_no, name, `Occupation`, `Contact_No` ,`Address`, update_date) VALUES ';
    const values = reference_data.map(lang => {
      return `('${candidate_id}','${lang.sno}',  '${lang.name}', '${lang.Occupation}', '${lang.Contact_No}', '${lang.Address}', '${updateDateTime}')`;
    }).join(', ');

    query += values;

    conn.query(query, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ status: 'error', message: err.message });
      } else {
        return res.status(200).json({ status: 'success', message: 'Data successfully inserted' });
      }
    });
  } else {
    return res.status(400).json({ status: 'error', message: 'No data received' });
  }
});






route.post("/api/disable/enable/form_data", async (req, res) => {

  let id = req.body.r_id;

  const conn = await connection();
  let conditional_data = [];
  let l1_score = [];
  let l2_score = [];
  let l3_score = [];
  let l1_totalScore = [];
  let l1_percentage = [];
  let l2_totalScore = [];
  let l2_percentage = [];
  let l3_totalScore = [];
  let l3_percentage = [];
  let l1_score_date = [];
  let l1_manager_remarks = [];
  let l2_score_date = [];
  let l2_manager_remarks = [];
  let l3_score_date = [];
  let l3_manager_remarks = [];
  let l1_score_by = [];
  let l2_score_by = [];
  let l3_score_by = [];

  let qry = `SELECT levels,S_1,S_2,S_3,S_4,S_5,S_6,S_7,S_8,S_9,S_10,total_score,percentage,manager_remarks,score_dt,manager_remarks,score_by FROM interview_score WHERE r_id=?`;
  conn.query(qry, [id], (err, result) => {

    if (err) {
      console.error('Insert Error: ', err);
      throw err;
    } else {

      if (result.length > 0) {

        result.forEach(function (userData) {

          if (userData.levels == "Interviewer-1") {
            l1_score.push(userData);
            conditional_data.push("I_1");
            let totalScore = userData.total_score;
            let percentage = userData.percentage;
            let score_date = userData.score_dt;
            let score_by = userData.score_by;
            let formattedScoreDate = moment(score_date).format('DD-MM-YYYY');
            let manager_remarks = userData.manager_remarks;
            l1_totalScore.push(totalScore);
            l1_percentage.push(percentage);
            l1_score_date.push(formattedScoreDate);
            l1_manager_remarks.push(manager_remarks);
            l1_score_by.push(score_by);
          } else if (userData.levels == "Interviewer-2") {
            conditional_data = [];
            conditional_data.push("I_2");
            l2_score.push(userData);
            let totalScore = userData.total_score;
            let percentage = userData.percentage;
            let score_date = userData.score_dt;
            let score_by = userData.score_by;
            let formattedScoreDate = moment(score_date).format('DD-MM-YYYY');
            let manager_remarks = userData.manager_remarks;
            l2_totalScore.push(totalScore);
            l2_percentage.push(percentage);
            l2_score_date.push(formattedScoreDate);
            l2_manager_remarks.push(manager_remarks);
            l2_score_by.push(score_by);

          } else if (userData.levels == "Interviewer-3") {
            conditional_data = [];
            conditional_data.push("I_3");
            l3_score.push(userData);
            let totalScore = userData.total_score;
            let percentage = userData.percentage;
            let score_date = userData.score_dt;
            let score_by = userData.score_by;
            let formattedScoreDate = moment(score_date).format('DD-MM-YYYY');
            let manager_remarks = userData.manager_remarks;
            l3_totalScore.push(totalScore);
            l3_percentage.push(percentage);
            l3_score_date.push(formattedScoreDate);
            l3_manager_remarks.push(manager_remarks);
            l3_score_by.push(score_by);

          } else {
            conditional_data.push("value");
          }


        });


      } else {
        conditional_data;
      }




      res.send({
        res: result,
        main_01: conditional_data,
        l1_score: l1_score,
        l2_score: l2_score,
        l3_score: l3_score,
        l1_totalScore: l1_totalScore,
        l2_totalScore: l2_totalScore,
        l3_totalScore, l3_totalScore,
        l1_percentage: l1_percentage,
        l2_percentage: l2_percentage,
        l3_percentage: l3_percentage,
        l1_score_date: l1_score_date,
        l2_score_date: l2_score_date,
        l3_score_date: l3_score_date,
        l1_manager_remarks: l1_manager_remarks,
        l2_manager_remarks: l2_manager_remarks,
        l3_manager_remarks: l3_manager_remarks,
        l1_score_by: l1_score_by,
        l2_score_by: l2_score_by,
        l3_score_by: l3_score_by
      })
    }
  })

});



route.post("/api/disable/enable/form_data_1", async (req, res) => {
  let id = req.body.r_id;
  let level = req.body.levels;

  const conn = await connection();
  let conditional_data = [];
  let l1_score = [];
  let l2_score = [];
  let l3_score = [];
  let l1_totalScore = [];
  let l1_percentage = [];
  let l2_totalScore = [];
  let l2_percentage = [];
  let l3_totalScore = [];
  let l3_percentage = [];
  let l1_score_date = [];
  let l1_manager_remarks = [];
  let l2_score_date = [];
  let l2_manager_remarks = [];
  let l3_score_date = [];
  let l3_manager_remarks = [];
  let l1_score_by = [];
  let l2_score_by = [];
  let l3_score_by = [];

  // Adjust the query to select the scores for the relevant levels
  let levelsCondition = '';
  if (level === "Interviewer-1") {
    levelsCondition = `levels IN ('Interviewer-1')`;
  } else if (level === "Interviewer-2") {
    levelsCondition = `levels IN ('Interviewer-1', 'Interviewer-2')`;
  } else if (level === "Interviewer-3") {
    levelsCondition = `levels IN ('Interviewer-1', 'Interviewer-2', 'Interviewer-3')`;
  }

  let qry = `SELECT levels, S_1, S_2, S_3, S_4, S_5, S_6, S_7, S_8, S_9, S_10, total_score, percentage, manager_remarks, score_dt, score_by 
             FROM interview_score 
             WHERE r_id=? AND ${levelsCondition}`;

  conn.query(qry, [id], (err, result) => {
    if (err) {
      console.error('Query Error: ', err);
      res.status(500).send({ error: 'Database query error' });
      return;
    }

    if (result.length > 0) {
      result.forEach(function (userData) {
        let formattedScoreDate = moment(userData.score_dt).format('DD-MM-YYYY');

        if (userData.levels === "Interviewer-1") {
          l1_score.push(userData);
          l1_totalScore.push(userData.total_score);
          l1_percentage.push(userData.percentage);
          l1_score_date.push(formattedScoreDate);
          l1_manager_remarks.push(userData.manager_remarks);
          l1_score_by.push(userData.score_by);
          conditional_data.push("I_1");
        } else if (userData.levels === "Interviewer-2") {
          l2_score.push(userData);
          l2_totalScore.push(userData.total_score);
          l2_percentage.push(userData.percentage);
          l2_score_date.push(formattedScoreDate);
          l2_manager_remarks.push(userData.manager_remarks);
          l2_score_by.push(userData.score_by);
          conditional_data.push("I_2");
        } else if (userData.levels === "Interviewer-3") {
          l3_score.push(userData);
          l3_totalScore.push(userData.total_score);
          l3_percentage.push(userData.percentage);
          l3_score_date.push(formattedScoreDate);
          l3_manager_remarks.push(userData.manager_remarks);
          l3_score_by.push(userData.score_by);
          conditional_data.push("I_3");
        }
      });
    }

    res.send({
      res: result,
      main_01: conditional_data,
      l1_score: l1_score,
      l2_score: l2_score,
      l3_score: l3_score,
      l1_totalScore: l1_totalScore,
      l2_totalScore: l2_totalScore,
      l3_totalScore: l3_totalScore,
      l1_percentage: l1_percentage,
      l2_percentage: l2_percentage,
      l3_percentage: l3_percentage,
      l1_score_date: l1_score_date,
      l2_score_date: l2_score_date,
      l3_score_date: l3_score_date,
      l1_manager_remarks: l1_manager_remarks,
      l2_manager_remarks: l2_manager_remarks,
      l3_manager_remarks: l3_manager_remarks,
      l1_score_by: l1_score_by,
      l2_score_by: l2_score_by,
      l3_score_by: l3_score_by,
      level: level
    });
  });
});



route.get("/testing", (req, res) => {
  res.render("candidate/candidate_test")
})


route.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  const pdfFile = req.file;
  if (pdfFile) {
    console.log('PDF uploaded:', pdfFile.originalname);



    res.send('PDF uploaded successfully.');
  } else {
    res.status(400).send('PDF upload failed.');
  }
});




// bhavishya-------------->


route.get('/codeofconduct', redirectCandidate, async (req, res) => {
  try {
    const c_id = req.session.candidate_id;

    const qry = 'SELECT candidate_firstname, candidate_lastname, mobile_no FROM candidate_personal_details WHERE candidate_id = ?';
    const con = await connection();

    con.query(qry, [c_id], (err, results) => {
     
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length === 0) {
        return res.render('candidate/code_of_conduct', {
          role: 'Candidate',
          page: 'candidate_documents',
          candidate: {} 
    
        });
      
      }

      res.render('candidate/code_of_conduct', {
        role: 'Candidate',
        page: 'candidate_documents',
        candidate: results[0] 
      });
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});


route.post("/code_of_conduct", upload.single("signature"), async (req, res) => {
  try {
    let c_id = req.session.candidate_id;

    let dateParts = req.body.date.split("-");
    let formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

    let currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    let query = `INSERT INTO code_of_conduct (candidate_id, first_name, last_name, mobile_no, date, signature, update_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let values = [
      c_id,
      req.body.firstName,
      req.body.lastName,
      req.body.employeeNo,
      formattedDate,
      req.file.originalname,
      currentDate,
    ];

    var con = await connection();
    con.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error occurred");
      } else {
        console.log(result);
        res.send("success");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});


route.post("/code_of_conduct_onload", async (req, res) => {
  try {
    const c_id = req.session.candidate_id;
    const qry = 'SELECT candidate_firstname, candidate_lastname, mobile_no FROM candidate_personal_details WHERE candidate_id = ?';
    const con = await connection();

    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.send({
        candidate: results[0] 
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});



route.get("/arn_template", redirectCandidate, (req, res) => {
  res.render("candidate/arn_template", {
    role: "Candidate",
    page: "candidate_documents",
    c_id:req.session.candidate_id
  });
});

route.post("/arn_template", file.single("signature"), async (req, res) => {
  try {
    let c_id = req.session.candidate_id;
    let dateParts = req.body.date.split("-");
    let formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  
  


    let currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    let query = `INSERT INTO arn_template (candidate_id,name,date,place, signature, update_date) VALUES (?, ?, ?, ?, ?,?)`;
    let values = [
      c_id,
      req.body.name,
      formattedDate,
      req.body.place,
      req.file.filename,
      currentDate,
    ];

    var con = await connection();
    con.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error occurred");
      } else {
        console.log(result);
        res.send("success");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});


route.get('/new_joining_form',(req,res)=>{
  try {
    res.render('candidate/new_joining_form', {
      role: "Candidate",
      page: "candidate_documents",})
  } catch (error) {
    
  }
})

// kapil------------------------------------------->



route.get('/candidate_new_form', (req, res) => {
  try{
    res.render('candidate/candidate_new_form');
    }
    catch(err){
      console.log(err,'err')
    }
});


route.get('/candidate_new_form_1', (req, res) => {
  try{
    res.render('candidate/candidate_new_form_1');
    }
    catch(err){
      console.log(err,'err')
    }
});


route.get('/nomination_form', (req, res) => {
  try{
    res.render('candidate/nomination_form',{role: req.session.role});
    }
    catch(err){
      console.log(err,'err')
    }
});


route.get('/nomination_form_1', (req, res) => {
  try{
    res.render('candidate/nomination_form_1',{role: req.session.role});
    }
    catch(err){
      console.log(err,'err')
    }
});


route.get('/candidate_documents_pdf/:c_id', redirectCandidate, async (req, res) => {
  try {
    let c_id = req.params.c_id;
    var con = await connection();

    let personal_d = `SELECT * FROM candidate_personal_details WHERE candidate_id=?`;
    let lang_d = `SELECT DISTINCT Language, Speak, \`Read\`, \`Write\` FROM Candidate_Languages_known WHERE candidate_id=?`;
    let fam_d = `SELECT DISTINCT name,date_of_birth,relationship,occupation FROM family_details WHERE candidate_id=?`;
    let ed_d = `SELECT DISTINCT examination_passed,university,year_form,year_to,specialization,division,CGPA FROM education_details WHERE candidate_id=?`;
    let job_d = `SELECT DISTINCT name_of_course,duration,year,institute,certificate_awarded FROM job_related_training WHERE candidate_id=?`;
    let emp_d = `SELECT DISTINCT Name_Organization,Position,From_date,To_date,Tenure,Name_Designation,Annual_CTC,Reason_for_Leaving FROM Employment_detatils WHERE candidate_id=?`;
    let whom_d = `SELECT DISTINCT name,Occupation,Address,Contact_No FROM whom_references WHERE candidate_id=?`;

    con.query(personal_d, [c_id], (error, personal_dresult) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error occurred");
      }

      con.query(lang_d, [c_id], (error, lresults) => {
        if (error) {
          console.error(error);
          lresults = [];
        }

        con.query(fam_d, [c_id], (error, fresults) => {
          if (error) {
            console.error(error);
            fresults = [];
          }

          con.query(ed_d, [c_id], (error, edresults) => {
            if (error) {
              console.error(error);
              edresults = [];
            }

            con.query(job_d, [c_id], (error, jobresults) => {
              if (error) {
                console.error(error);
                jobresults = [];
              }

              con.query(emp_d, [c_id], (error, empresults) => {
                if (error) {
                  console.error(error);
                  empresults = [];
                }

                con.query(whom_d, [c_id], (error, whomresults) => {
                  if (error) {
                    console.error(error);
                    whomresults = [];
                  }

                  console.log(whomresults);
                  con.end()
                  res.render('candidate/candidate_documents_pdf', {
                    role: "Candidate",
                    page: "candidate_documents",
                    candidate: personal_dresult[0],
                    lang: lresults,
                    fam_d: fresults,
                    education: edresults,
                    courses: jobresults,
                    employment: empresults,
                    whom: whomresults
                  });
                });
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error occurred");
  }
});




route.post('/candidate_documents_pdf', file.single('pdf'),async (req, res) => {
  try {
    // console.log(req.file); 
    let c_id = req.session.candidate_id;


let qry = `UPDATE candidate_personal_details SET PDF=? WHERE candidate_id=?`;
    const con = await connection();

    con.query(qry, [req.file.filename,c_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.send({
        success:{message:'success'}
      });
    });

  } catch (error) {
    console.log(error);
  }
});


route.get('/candidate_pf_form11',redirectCandidate, async (req,res)=>{
  try{

    const conn = await connection();
    
    let cand_id=req.session.candidate_id
console.log(cand_id,'cand_id')
    let query1=`    
      SELECT
        candidate_id,
        candidate_firstname,
        candidate_lastname,
        spouse_name,
        DATE_FORMAT(date_of_birth, '%d-%m-%Y') AS formatted_date_of_birth, 
        gender,
        marital_status,
        email_id,
        mobile_no
      FROM
        candidate_personal_details
      WHERE
      candidate_id=?
       `

      conn.query(query1,[cand_id],function(err,result){
        if(err) throw err;
        console.log(result,'result')
        res.render('candidate/candidate_pf_form11',{role: 'Candidate', page :"candidate_pf_form11",data1:result})
      })

  }
  catch(err){
    console.log(err,'err')
  }
})

const multi_images = [
  { name: 'member_sign_input', maxCount: 1 },
  { name: 'employer_sign_input', maxCount: 1 }
];

route.post('/candidate_pf_form11',file.fields(multi_images),async function(req,res){
  try{
    const conn = await connection();


    // const {candidate_id, emp_code, company, candidate_name, father_spouse_name, candidate_DOB, candidate_gender, candidate_marital_status, candidate_email_id, candidate_mobile_no, member_of_epfs_1952, member_of_eps_1995, uan_no, pre_pf_acc_no, date_of_exit_from_prev, scheme_certificate_no, pension_payment_order_no, international_worker, country_name, passport_no, passport_issue_date, passport_expiry_date, bank_acc_no, ifs_code, aaddhar_no, pan_no, undertaking_date, undertaking_place, candidate_joining_date, alloted_pf_no, alloted_uan_no, declaration_date }=req.body
    
    let {candidate_id, emp_code, company, candidate_name, father_spouse_name, candidate_DOB,candidate_gender, candidate_marital_status, candidate_email_id, candidate_mobile_no, member_of_epfs_1952, member_of_eps_1995, uan_no, pre_pf_acc_no, date_of_exit_from_prev, scheme_certificate_no, pension_payment_order_no, international_worker, country_name, passport_no, passport_issue_date, passport_expiry_date, bank_acc_no, ifs_code, aaddhar_no, pan_no, undertaking_date, undertaking_place, candidate_joining_date, alloted_pf_no, alloted_uan_no, declaration_date, declaration_b_checkbox, declaration_c_checkbox }=req.body


    
    let candidate_DOB1=moment(candidate_DOB,'DD-MM-YYYY').format('YYYY-MM-DD')
    let date_of_exit_from_prev1=moment(date_of_exit_from_prev,'DD-MM-YYYY').format('YYYY-MM-DD')
    let undertaking_date1=moment(undertaking_date,'DD-MM-YYYY').format('YYYY-MM-DD')
    let candidate_joining_date1=moment(candidate_joining_date,'DD-MM-YYYY').format('YYYY-MM-DD')
    let declaration_date1=moment(declaration_date,'DD-MM-YYYY').format('YYYY-MM-DD')
  
    let passport_issue_date1=''
    let passport_expiry_date1=''
    
    if(!passport_issue_date==''){
        let passport_issue_date2=moment(passport_issue_date,'DD-MM-YYYY').format('YYYY-MM-DD')
        passport_issue_date1=passport_issue_date2
      }
    if(!passport_expiry_date==''){
        let passport_expiry_date2=moment(passport_expiry_date,'DD-MM-YYYY').format('YYYY-MM-DD')
        passport_expiry_date1=passport_expiry_date2
      }





    console.log(
      candidate_id, emp_code, company, candidate_name, father_spouse_name, candidate_DOB1, candidate_gender, candidate_marital_status, candidate_email_id, candidate_mobile_no, member_of_epfs_1952, member_of_eps_1995, uan_no, pre_pf_acc_no, date_of_exit_from_prev1, scheme_certificate_no, pension_payment_order_no, international_worker, country_name, passport_no, passport_issue_date1, passport_expiry_date1, bank_acc_no, ifs_code, aaddhar_no, pan_no, undertaking_date1, undertaking_place, candidate_joining_date1, alloted_pf_no, alloted_uan_no, declaration_date1, declaration_b_checkbox, declaration_c_checkbox ,'api_cadidate_data'
    )
    
    let member_sign_input = req.files.member_sign_input ? req.files.member_sign_input[0].filename : null;
    let employer_sign_input = req.files.employer_sign_input ? req.files.employer_sign_input[0].filename : null;

    console.log(req.files.member_sign_input[0],'sssssss1111')
    console.log(req.files.employer_sign_input[0],'sssssss2222')
    console.log(member_sign_input,'member_sign_input')
    console.log(employer_sign_input,'employer_sign_input')
    
    
    if(international_worker=='No'){
      console.log('No_no')
      let query1=`
      INSERT INTO candidate_pf_form11         
        ( candidate_id, 
          emp_code, 
          company, 
          candidate_name, 
          father_spouse_name, 
          candidate_DOB, 
          candidate_gender, 
          candidate_marital_status, 
          candidate_email_id, 
          candidate_mobile_no, 
          member_of_epfs_1952, 
          member_of_eps_1995, 
          uan_no, 
          pre_pf_acc_no, 
          date_of_exit_from_prev_employment, 
          scheme_certificate_no, 
          pension_payment_order_no, 
          international_worker,            
          bank_acc_no, 
          ifs_code, 
          aaddhar_no, 
          pan_no, 
          undertaking_date, 
          undertaking_place, 
          candidate_joining_date, 
          alloted_pf_no, 
          alloted_uan_no, 
          declaration_date,
          member_sign_img,
          employer_sign_img,
          declaration_b_checkbox,
          declaration_c_checkbox
        ) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        let data=[candidate_id, emp_code, company, candidate_name, father_spouse_name, candidate_DOB1,  candidate_gender, candidate_marital_status, candidate_email_id, candidate_mobile_no,   member_of_epfs_1952, member_of_eps_1995, uan_no, pre_pf_acc_no, date_of_exit_from_prev1,  scheme_certificate_no, pension_payment_order_no, international_worker, bank_acc_no, ifs_code, aaddhar_no, pan_no,  undertaking_date1, undertaking_place, candidate_joining_date1, alloted_pf_no, alloted_uan_no,  declaration_date1, member_sign_input, employer_sign_input, declaration_b_checkbox, declaration_c_checkbox]
        conn.query(query1,data,function(err,result){
        if(err) throw err;
        res.send('success')
        })

    }

    else {
      console.log('yes_yes')
      let query1=`
      INSERT INTO candidate_pf_form11         
        ( candidate_id, 
          emp_code, 
          company, 
          candidate_name, 
          father_spouse_name, 
          candidate_DOB, 
          candidate_gender, 
          candidate_marital_status, 
          candidate_email_id, 
          candidate_mobile_no, 
          member_of_epfs_1952, 
          member_of_eps_1995, 
          uan_no, 
          pre_pf_acc_no, 
          date_of_exit_from_prev_employment, 
          scheme_certificate_no, 
          pension_payment_order_no, 
          international_worker, 
          country_name, 
          passport_no, 
          passport_issue_date, 
          passport_expiry_date, 
          bank_acc_no, 
          ifs_code, 
          aaddhar_no, 
          pan_no, 
          undertaking_date, 
          undertaking_place, 
          candidate_joining_date, 
          alloted_pf_no, 
          alloted_uan_no, 
          declaration_date,
          member_sign_img,
          employer_sign_img,
          declaration_b_checkbox,
          declaration_c_checkbox
        ) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        let data=[candidate_id, emp_code, company, candidate_name, father_spouse_name, candidate_DOB1,  candidate_gender, candidate_marital_status, candidate_email_id, candidate_mobile_no,   member_of_epfs_1952, member_of_eps_1995, uan_no, pre_pf_acc_no, date_of_exit_from_prev1,  scheme_certificate_no, pension_payment_order_no, international_worker, country_name, passport_no,  passport_issue_date1, passport_expiry_date1, bank_acc_no, ifs_code, aaddhar_no, pan_no,  undertaking_date1, undertaking_place, candidate_joining_date1, alloted_pf_no, alloted_uan_no,  declaration_date1, member_sign_input, employer_sign_input, declaration_b_checkbox, declaration_c_checkbox]
        conn.query(query1,data,function(err,result){
        if(err) throw err;
        res.send('success')
        })

    }

  }
  catch(err){
    console.log(err)
  }
})






route.get('/candidate_pf_form11_pdf',redirectCandidate, async (req,res)=>{
  try{

    const conn = await connection();
    
    let cand_id=req.session.candidate_id
console.log(cand_id,'cand_id')
    let query1=`    
      SELECT        
          candidate_id, 
          emp_code, 
          company, 
          candidate_name, 
          father_spouse_name,
          DATE_FORMAT(candidate_DOB, '%d-%m-%Y') AS candidate_DOB_formated,
          candidate_gender, 
          candidate_marital_status, 
          candidate_email_id, 
          candidate_mobile_no, 
          member_of_epfs_1952, 
          member_of_eps_1995, 
          uan_no, 
          pre_pf_acc_no, 
          DATE_FORMAT(date_of_exit_from_prev_employment, '%d-%m-%Y') AS date_of_exit_from_prev_employment_formated,
          scheme_certificate_no, 
          pension_payment_order_no, 
          international_worker, 
          country_name, 
          passport_no, 
          DATE_FORMAT(passport_issue_date, '%d-%m-%Y') AS passport_issue_date_formated,
          DATE_FORMAT(passport_expiry_date, '%d-%m-%Y') AS passport_expiry_date_formated,
          bank_acc_no, 
          ifs_code, 
          aaddhar_no, 
          pan_no,
          DATE_FORMAT(undertaking_date, '%d-%m-%Y') AS undertaking_date_formated,
          undertaking_place,
          DATE_FORMAT(candidate_joining_date, '%d-%m-%Y') AS candidate_joining_date_formated,
          alloted_pf_no, 
          alloted_uan_no, 
          DATE_FORMAT(declaration_date, '%d-%m-%Y') AS declaration_date_formated,
          member_sign_img,
          employer_sign_img,
          declaration_b_checkbox,
          declaration_c_checkbox
      FROM
        candidate_pf_form11
      WHERE
        candidate_id=?
       `

      conn.query(query1,[cand_id],function(err,result){
        if(err) throw err;
        console.log(result,'result')
        res.render('candidate/candidate_pf_form11_pdf',{role: 'Candidate', page :"candidate_pf_form11_pdf",data1:result})
      })

  }
  catch(err){
    console.log(err,'err')
  }
})


route.post('/candidate_pf_form11_pdf',file.single('pdf'),async function(req,res){
  try{
    console.log('enter_1')
    const conn = await connection();

    let cand_id=req.session.candidate_id
    let pdf= req.file ? req.file.filename : null;

    console.log(pdf,'pdf_1111')
    

    let query=`UPDATE candidate_pf_form11 SET pdf=? WHERE candidate_id=?`
    conn.query(query,[pdf,cand_id],function(err,result){
      if(err) throw err;
      res.send('success')
    })
  }
  catch(err){
    console.log(err,'err')
  }
})


route.get("/health_checkup",redirectCandidate,(req,res)=>{
  res.render('candidate/candidate_health_checkup' ,{role: 'Candidate', page :"candidate_health_checkup"})
})



// Handle form submission
route.post('/insert_health_checkup', file.fields([
  { name: 'blood_count' },
  { name: 'urine' },
  { name: 'abc_grouping' },
  { name: 'xray_chest' },
  { name: 'diabetes_panel' },
  { name: 'cardiac_risk_profile' },
  { name: 'fitness_certificate' },
  { name: 'general_physical_exam' }
]), async (req, res) => {
  const files = req.files;
  const data = req.body;
  const conn = await connection();
  
  // Construct query for inserting data into MySQL
  const sql = 'INSERT INTO health_checkups (blood_count, urine, abc_grouping, xray_chest, diabetes_panel, cardiac_risk_profile, fitness_certificate, general_physical_exam) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  // Extract original file names
  const originalFileNames = [
    files['blood_count'] ? files['blood_count'][0].originalname : null,
    files['urine'] ? files['urine'][0].originalname : null,
    files['abc_grouping'] ? files['abc_grouping'][0].originalname : null,
    files['xray_chest'] ? files['xray_chest'][0].originalname : null,
    files['diabetes_panel'] ? files['diabetes_panel'][0].originalname : null,
    files['cardiac_risk_profile'] ? files['cardiac_risk_profile'][0].originalname : null,
    files['fitness_certificate'] ? files['fitness_certificate'][0].originalname : null,
    files['general_physical_exam'] ? files['general_physical_exam'][0].originalname : null
  ];

  // Extract file paths
  const filePaths = [
    files['blood_count'] ? files['blood_count'][0].path : null,
    files['urine'] ? files['urine'][0].path : null,
    files['abc_grouping'] ? files['abc_grouping'][0].path : null,
    files['xray_chest'] ? files['xray_chest'][0].path : null,
    files['diabetes_panel'] ? files['diabetes_panel'][0].path : null,
    files['cardiac_risk_profile'] ? files['cardiac_risk_profile'][0].path : null,
    files['fitness_certificate'] ? files['fitness_certificate'][0].path : null,
    files['general_physical_exam'] ? files['general_physical_exam'][0].path : null
  ];

  const values = originalFileNames;

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into database');
    } else {
      res.send('Form submitted successfully');
    }
  });
});




route.get('/arn_template_pdf/:c_id', redirectCandidate, async (req, res) => {
  try {
    let c_id = req.params.c_id;
    const con = await connection();

    let qry = `SELECT name, date, place, signature FROM arn_template WHERE candidate_id = ?`;
    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('candidate/arn_template_pdf', {
          role: "Candidate",
          page: "candidate_documents",
          arn: results.length > 0 ? results[0] : {},
          c_id:c_id
        });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

route.post('/arn_template_pdf', file.single('pdf'),async (req, res) => {
  try {
    // console.log(req.file); 
    let c_id = req.session.candidate_id;


let qry = `UPDATE arn_template SET PDF=? WHERE candidate_id=?`;
    const con = await connection();

    con.query(qry, [req.file.filename,c_id], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.send({
        success:{message:'success'}
      });
    });

  } catch (error) {
    console.log(error);
  }
});



route.post('/offer_letter_template_email',file.single('pdf'), async (req, res) => {
  
  let pdf = req.file.filename;
     var conn = await connection()
    let mail = req.body.pre;
    var candidate_email= req.body.candidate_email2
    var admin_id= req.session.user_id


    var query= `select EMP_Email_ID from hrm_user_login where EMP_CODE = ${admin_id}`

    conn.query(query,(error ,admin_email)=>{
       if(admin_email.length > 0 ){
           console.log("success full send",admin_email)
           
           sendEmail(admin_email,candidate_email,mail,pdf)
       }

       else{
           console.log("not success full send" ,error)
       }
       

       
      })

    
   

    

  

   

    let accpt_url = `https://jubilanthrm.chatbotsapp.in/offer_letter_template_email_accept/vishal.manthanitsolutions@gmail.com`;
    let reject_url = `https://jubilanthrm.chatbotsapp.in/offer_letter_template_email_reject/vishal.manthanitsolutions@gmail.com`;

    function  sendEmail(admin_email ,candidate_email,mail,pdf) {

      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'hrm@manthanitsolutions.in',
            pass: 'Manthan@4321#'
        },
        debug: true
    });

    var    admin_email1= admin_email[0].EMP_Email_ID

    console.log(admin_email1,candidate_email,mail,"111111111111")
    let mailOptions = {
      from: 'hrm@manthanitsolutions.in',
      to: candidate_email  ,
      cc: admin_email1,
      subject: 'Offer of Appointment',
      html: `
        <pre>${mail}</pre>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px; background-color: #1F7F4C;">
              <a rel="noopener" target="_blank" href="${accpt_url}" style="font-size: 13px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 5px; padding: 8px 15px; border: 1px solid white; display: inline-block;">Approve</a>
            </td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td align="center" style="border-radius: 5px; background-color: #cc0001;">
              <a rel="noopener" target="_blank" href="${reject_url}" style="font-size: 13px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 5px; padding: 8px 15px; border: 1px solid #cc0001; display: inline-block;">Reject</a>
            </td>
          </tr>
        </table>
      `,
      attachments: [
        {
            filename: req.file.originalname,
            path: req.file.path
        }
    ]
    };

    console.log(admin_email,candidate_email,mail,"11112222222222222222222222222222211111111")
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error);
        res.send("error")
      } else {
        console.log('Email sent: ' + info.response);
        res.send("success")
      }
    });
  } 

})



route.get('/offer_letter_template_email_accept/:hr_id',async(req,res)=>{
  try {
    let hr_id=req.params.hr_id
 let receiver1='bhavishya.manthanitsolutions@gmail.com'

    let toAddresses = `${receiver1}`;

    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
          user: hr_id,
          pass: 'yjal dkyp ncld juil'
      },
        debug: true
    });

    let mailOptions = {
        from: hr_id,
        to: toAddresses,
        // cc: ccAddresses,
        subject: 'Accepted Letter',
        html: `Accepted the offer letter
       
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        // res.json({ message: `Accepted` });
        res.redirect('http://192.168.0.156:6600/accepted')
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        logger.error(error + ' in nodemailer')
        throw error;
    }  } catch (error) {
    console.log(error)
  }
})

route.get('/offer_letter_template_email_reject/:hr_id',async(req,res)=>{
  try {
    let hr_id=req.params.hr_id
 let receiver1='bhavishya.manthanitsolutions@gmail.com'

    let toAddresses = `${receiver1}`;

    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
          user: hr_id,
          pass: 'yjal dkyp ncld juil'
      },
        debug: true
    });

    let mailOptions = {
        from: hr_id,
        to: toAddresses,
        // cc: ccAddresses,
        subject: 'Rejected Letter',
        html: `Rejected the offer letter
       
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        // res.json({ message: `Rejected` });
        res.redirect('http://192.168.0.156:6600/rejected')
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        logger.error(error + ' in nodemailer')
        throw error;
    }  } catch (error) {
    console.log(error)
  }
})

route.get('/accepted',(req,res)=>{
  res.render('admin/Accept_design')
})
route.get('/rejected',(req,res)=>{
  res.render('admin/Reject_design')
})

// kapil api marge 3 june

route.get('/candidate_new_form', redirectCandidate,async (req, res) => {
  try {
    var candidate_id = req.session.candidate_id;
    const conn = await connection();
    var sql = `
        SELECT 
          candidate_name, 
          father_name, 
          date_of_birth, 
          gender,          
          marital_status, 
          addres
        FROM 
          pf_form_2
        WHERE 
          candidate_id=?`;

    conn.query(sql, [candidate_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {

        const candidate = [];

        results.forEach(row => {
          candidate.push({
            candidate_name: row.candidate_name,
            father_name: row.father_name,
            date_of_birth: row.date_of_birth,
            gender: row.gender,
            marital_status: row.marital_status,
            addres: row.addres
          });


          var sql1 = `SELECT 
          
          nominee_name,
          address,
          nominee_relationship,
          date_of_birth,
          total_amount,
          nominee_is_a_minor_and_relationship,
          image
        FROM 
            pf_form_part_a
        WHERE 
          candidate_id=?`;

          conn.query(sql1, [candidate_id], (err, results1) => {
            if (err) {
              console.log(err);
            } else {

              console.log(results1,)
              const nominees = [];

              results1.forEach(row => {
                nominees.push({
                  nominee_name: row.nominee_name,
                  address: row.address,
                  nominee_relationship: row.nominee_relationship,
                  date_of_birth: row.date_of_birth,
                  total_amount: row.total_amount,
                  nominee_is_a_minor_and_relationship: row.nominee_is_a_minor_and_relationship,
                  image: row.image
                })
              });


          var sql2 = `SELECT 
            nominee_name,
            address,
            date_of_birth,
            relationship_with_member
          FROM 
            pf_form_part_b
          WHERE 
            candidate_id=?`;

              conn.query(sql2, [candidate_id], (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  const member = [];

                  results.forEach(row => {
                    member.push({
                      nominee_name: row.nominee_name,
                      address: row.address,
                      date_of_birth: row.date_of_birth,
                      relationship_with_member: row.relationship_with_member
                    });
                  });


              var sql2 = `SELECT 
                name_and_address,
                date_of_birth,
                relationship_with_member,
                image
              FROM
                 pf_form_part_c
              WHERE 
                 candidate_id=?`;

                  conn.query(sql2, [candidate_id], (err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const employees = [];

                      results.forEach(row => {
                        employees.push({
                          name_and_address: row.name_and_address,
                          date_of_birth: row.date_of_birth,
                          relationship_with_member: row.relationship_with_member,
                          image: row.image
                        });
                      });

                 var sql3 = `SELECT 
                    dob,
                    certificate_by_emp,
                    place,
                    place_1,
                    destination,
                    dob_1,
                    image
                  FROM
                     pf_form_part_d
                  WHERE 
                     candidate_id=?`;
  
                      conn.query(sql3, [candidate_id], (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          const certificate = [];

                          results.forEach(row => {
                            certificate.push({
                              dob: row.dob,
                              certificate_by_emp: row.certificate_by_emp,
                              place: row.place,
                              place_1: row.place_1,
                              destination: row.destination,
                              dob_1: row.dob_1,
                              image: row.image
                            });
                          });



                          console.log(nominees), 'nominees'

                          res.render('candidate/candidate_new_form', { role: req.session.role, candidate_id: candidate_id, candidate: candidate, nominees: nominees, member: member, employees: employees, certificate: certificate });
                        }
                      });

                    }
                  });
                }
              });
            }
          });
        })
      }

    })


  } catch (err) {
    console.log(err, 'err')
  }
});

route.get('/candidate_new_form_1', async (req, res) => {
  try {
    var candidate_id = req.session.candidate_id;
    const conn = await connection();
    var sql = `
        SELECT 
          candidate_name, 
          father_name, 
          date_of_birth, 
          gender,          
          marital_status, 
          addres
        FROM 
          pf_form_2
        WHERE 
          candidate_id=?`;

    conn.query(sql, [candidate_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {

        const candidate = [];

        results.forEach(row => {
          candidate.push({
            candidate_name: row.candidate_name,
            father_name: row.father_name,
            date_of_birth: row.date_of_birth,
            gender: row.gender,
            marital_status: row.marital_status,
            addres: row.addres
          });


          var sql1 = `SELECT 
          
          nominee_name,
          address,
          nominee_relationship,
          date_of_birth,
          total_amount,
          nominee_is_a_minor_and_relationship,
          image
        FROM 
            pf_form_part_a
        WHERE 
          candidate_id=?`;

          conn.query(sql1, [candidate_id], (err, results1) => {
            if (err) {
              console.log(err);
            } else {

              console.log(results1,)
              const nominees = [];

              results1.forEach(row => {
                nominees.push({
                  nominee_name: row.nominee_name,
                  address: row.address,
                  nominee_relationship: row.nominee_relationship,
                  date_of_birth: row.date_of_birth,
                  total_amount: row.total_amount,
                  nominee_is_a_minor_and_relationship: row.nominee_is_a_minor_and_relationship,
                  image: row.image
                })
              });


          var sql2 = `SELECT 
            nominee_name,
            address,
            date_of_birth,
            relationship_with_member
          FROM 
            pf_form_part_b
          WHERE 
            candidate_id=?`;

              conn.query(sql2, [candidate_id], (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  const member = [];

                  results.forEach(row => {
                    member.push({
                      nominee_name: row.nominee_name,
                      address: row.address,
                      date_of_birth: row.date_of_birth,
                      relationship_with_member: row.relationship_with_member
                    });
                  });


              var sql2 = `SELECT 
                name_and_address,
                date_of_birth,
                relationship_with_member,
                image
              FROM
                 pf_form_part_c
              WHERE 
                 candidate_id=?`;

                  conn.query(sql2, [candidate_id], (err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const employees = [];

                      results.forEach(row => {
                        employees.push({
                          name_and_address: row.name_and_address,
                          date_of_birth: row.date_of_birth,
                          relationship_with_member: row.relationship_with_member,
                          image: row.image
                        });
                      });

                 var sql3 = `SELECT 
                    dob,
                    certificate_by_emp,
                    place,
                    place_1,
                    destination,
                    dob_1,
                    image
                  FROM
                     pf_form_part_d
                  WHERE 
                     candidate_id=?`;
  
                      conn.query(sql3, [candidate_id], (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          const certificate = [];

                          results.forEach(row => {
                            certificate.push({
                              dob: row.dob,
                              certificate_by_emp: row.certificate_by_emp,
                              place: row.place,
                              place_1: row.place_1,
                              destination: row.destination,
                              dob_1: row.dob_1,
                              image: row.image
                            });
                          });



                          console.log(nominees), 'nominees'

                          res.render('candidate/candidate_new_form_1', { role: req.session.role, candidate_id: candidate_id, candidate: candidate, nominees: nominees, member: member, employees: employees, certificate: certificate });
                        }
                      });

                    }
                  });
                }
              });
            }
          });
        })
      }

    })


  } catch (err) {
    console.log(err, 'err')
  }

});

route.get('/nomination_form', redirectCandidate,async (req, res) => {
  try {

    const conn = await connection();
    var candidate_id = req.session.candidate_id;
    var sql = `SELECT 
        nomi_name, 
        name_of_nomi, 
        employee, 
        dob_nomi, 
        settlement 
      FROM 
        nominee_details
      WHERE 
        candidate_id=?`;

    conn.query(sql, [candidate_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        // Create an empty array to store the results
        const nominee = [];

        // Loop through the results and push each row into the candidates array
        results.forEach(row => {
          nominee.push({
            nomi_name: row.nomi_name,
            name_of_nomi: row.name_of_nomi,
            employee: row.employee,
            dob_nomi: row.dob_nomi,
            settlement: row.settlement
          });
        });


      var sql = `SELECT 
        employee_name, 
        sex_1, 
        Religion_1, 
        marital_status, 
        department,
        Designation,
        dob_appointment,
        permanent_address,
        present_add,
        Place_1,
        date_1,
        image 
      FROM 
        settlement
      WHERE 
        candidate_id=?`;

        conn.query(sql, [candidate_id], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            // Create an empty array to store the results
            const settlement = [];

            // Loop through the results and push each row into the candidates array
            results.forEach(row => {
              settlement.push({
                employee_name: row.employee_name,
                sex_1: row.sex_1,
                Religion_1: row.Religion_1,
                marital_status: row.marital_status,
                department: row.department,
                Designation: row.Designation,
                dob_appointment: row.dob_appointment,
                permanent_address: row.permanent_address,
                present_add: row.present_add,
                Place_1: row.Place_1,
                date_1: row.date_1,
                image: row.image

              });
            });


            res.render('candidate/nomination_form', { role: req.session.role, candidate_id: candidate_id, nominee: nominee, settlement: settlement });

          }
        });
      }
    });
  } catch (err) {
    console.log(err, 'err');
    // Handle error, send response or render error page
    res.status(500).send("An error occurred.");
  }
});

route.get('/nomination_form_1', redirectCandidate, async (req, res) => {
  try {

    const conn = await connection();
    var candidate_id = req.session.candidate_id;
    var sql = `SELECT nomi_name,name_of_nomi,employee,dob_nomi,settlement FROM nominee_details WHERE candidate_id=?`;
    conn.query(sql, [candidate_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        const nominee = [];
        results.forEach(row => {
          nominee.push({
            nomi_name: row.nomi_name,
            name_of_nomi: row.name_of_nomi,
            employee: row.employee,
            dob_nomi: row.dob_nomi,
            settlement: row.settlement
          });
        });


      var sql = `SELECT 
        employee_name, 
        sex_1, 
        Religion_1, 
        marital_status, 
        department,
        Designation,
        dob_appointment,
        permanent_address,
        present_add,
        Place_1,
        date_1,
        image 
      FROM 
        settlement
      WHERE 
        candidate_id=?`;

        conn.query(sql, [candidate_id], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            const settlement = [];
            results.forEach(row => {
              settlement.push({
                employee_name: row.employee_name,
                sex_1: row.sex_1,
                Religion_1: row.Religion_1,
                marital_status: row.marital_status,
                department: row.department,
                Designation: row.Designation,
                dob_appointment: row.dob_appointment,
                permanent_address: row.permanent_address,
                present_add: row.present_add,
                Place_1: row.Place_1,
                date_1: row.date_1,
                image: row.image

              });
            });


            res.render('candidate/nomination_form_1', { role: req.session.role, candidate_id: candidate_id, nominee: nominee, settlement: settlement });

          }
        });
      }
    });
  } catch (err) {
    console.log(err, 'err');
    // Handle error, send response or render error page
    res.status(500).send("An error occurred.");
  }

});

route.post('/nominee_api_a', file.fields([
  { name: 'emp_sign_input', maxCount: 1 },
  { name: 'emp_sign_input2', maxCount: 1 },
  { name: 'employer_sign_input', maxCount: 1 }

]), async (req, res) => {
  try {
    const conn = await connection();
    console.log(req.body);
    console.log(req.files)
    var candidate_id = req.session.candidate_id;
    var id_1 = req.body.name;
    var id_2 = req.body.Father_name;
    var id_3 = req.body.dob;
    let dateParts = id_3.split("-");
    let formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    var id_4 = req.body.sex_1;
    var id_5 = req.body.marital_status;
    var id_6 = req.body.account_no;
    var id_7 = req.body.address;
    var id_8 = req.body.dob_joining;
    let dateParts1 = id_8.split("-");
    let formattedDate1 = dateParts1[2] + "-" + dateParts1[1] + "-" + dateParts1[0];
    // var emp_sign_input = req.files.emp_sign_input;

    var nomineeName = req.body.name_1;
    var address = req.body.name_2;
    var relationship = req.body.name_3;
    var dob = req.body.name_4;
    let dateParts2 = dob.split("-");
    let formattedDate2 = dateParts2[2] + "-" + dateParts2[1] + "-" + dateParts2[0];
    var totalAmount = req.body.name_5;
    var minorNominee = req.body.name_6;
    var emp_sign_input = req.files.emp_sign_input[0].filename

    var name1 = req.body.name_and_address;
    var address2 = req.body.relationship;
    var d_o_b = req.body.dob_1;
    let dateParts3 = d_o_b.split("-");
    let formattedDate3 = dateParts3[2] + "-" + dateParts3[1] + "-" + dateParts3[0];
    var relationship1 = req.body.Address_1;

    var nomineeName_1 = req.body.name_a;
    var address_1 = req.body.name_b;
    var dob_1 = req.body.name_c;
    let dateParts4 = dob_1.split("-");
    let formattedDate4 = dateParts4[2] + "-" + dateParts4[1] + "-" + dateParts4[0];
    var emp_sign_input2 = req.files.emp_sign_input2[0].filename


    var date0 = req.body.date_1;
    var Certificate = req.body.Certificate;
    var place = req.body.place;
    var place1 = req.body.place_1;
    var Destination1 = req.body.Destination_1;
    var date2 = req.body.date_2;
    let dateParts5 = date2.split("-");
    let formattedDate5 = dateParts5[2] + "-" + dateParts5[1] + "-" + dateParts5[0];
    var employer_sign_input = req.files.employer_sign_input[0].filename;

  var sql = 'INSERT INTO pf_form_2(candidate_id, candidate_name, father_name, date_of_birth, gender,marital_status, account_no, addres, date_of_joining) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conn.query(sql, [candidate_id, id_1, id_2, formattedDate, id_4, id_5, id_6, id_7, formattedDate1], (err, result) => {
      if (err) {
        console.log(err);

      } else {
        res.send(result);
        console.log(result)

  var sql = 'INSERT INTO pf_form_part_a (candidate_id, nominee_name, address, nominee_relationship, date_of_birth, total_amount, nominee_is_a_minor_and_relationship, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        conn.query(sql, [candidate_id, nomineeName, address, relationship, formattedDate2, totalAmount, minorNominee, emp_sign_input], (err, result) => {
          if (err) {
            console.log(err);

          } else {
            res.send(result);

          }
        });

  var sql = 'INSERT INTO pf_form_part_b (candidate_id, nominee_name, address, date_of_birth, relationship_with_member) VALUES (?, ?, ?, ?, ?)';
        conn.query(sql, [candidate_id, name1, address2, formattedDate3, relationship1], (err, result) => {
          if (err) {
            console.log(err);

          } else {
            console.log(result);
            res.send(result);
          }

        });

  var sql = 'INSERT INTO pf_form_part_c (candidate_id, name_and_address, date_of_birth, relationship_with_member, image) VALUES (?, ?, ?, ?, ?)';
        conn.query(sql, [candidate_id, nomineeName_1, address_1, formattedDate4, emp_sign_input2], (err, result) => {
          if (err) {
            console.log(err);

          } else {
            console.log(result);
            res.send(result);
          }
        });

  var sql = 'INSERT INTO pf_form_part_d (candidate_id, dob, certificate_by_emp, place, place_1, destination, dob_1, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        conn.query(sql, [candidate_id, date0, Certificate, place, place1, Destination1, formattedDate5, employer_sign_input], (err, result) => {
          if (err) {
            console.log(err);

          } else {
            res.send(result);
          }
        });

      }
    });

  } catch (err) {
    console.log(err, 'err');


  }

});

route.post('/nominee_api', file.single('emp_sign_input_1'), async (req, res) => {
  try {
    const conn = await connection();
    console.log(req.body);

    var candidate_id = req.session.candidate_id;
    var emp_name = req.body.emp_name;
    var nominee_name = req.body.nominee_name;
    var nomi_relationship = req.body.nomi_relationship;
    var dob_nimonee = req.body.dob_nimonee;
    let dateParts = dob_nimonee.split("-");
    let formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    var settlement = req.body.settlement;

    var employee_name = req.body.employee_name;
    var sex_1 = req.body.sex_1;
    var Religion_1 = req.body.Religion_1;
    var marital_status = req.body.marital_status;
    var Department = req.body.Department;
    var Designation = req.body.Designation;
    var dob_appointment = req.body.dob_appointment;
    let dateParts1 = dob_appointment.split("-");
    let formattedDate1 = dateParts1[2] + "-" + dateParts1[1] + "-" + dateParts1[0];
    var permanent_address = req.body.permanent_address;
    var present_add = req.body.present_add;
    var Place_1 = req.body.Place_1;
    var date_1 = req.body.date_1;
    var emp_sign_input_1 = req.file.filename


    var sql = 'INSERT INTO nominee_details(candidate_id, nomi_name, name_of_nomi, employee, dob_nomi, settlement) VALUES (?, ?, ?, ?, ?,?)';
    conn.query(sql, [candidate_id, emp_name, nominee_name, nomi_relationship, formattedDate, settlement], (err, result) => {
      if (err) {
        console.log(err);

      } else {
        res.send(result);

        var sql = 'INSERT INTO settlement(candidate_id, employee_name, sex_1, Religion_1, marital_status,Department,Designation,dob_appointment,permanent_address,present_add,Place_1,date_1, image) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)';
        conn.query(sql, [candidate_id, employee_name, sex_1, Religion_1, marital_status, Department, Designation, formattedDate1, permanent_address, present_add, Place_1, date_1, emp_sign_input_1], (err, result) => {
          if (err) {
            console.log(err);

          } else {
            res.send(result);
          }
        });
      }
    });

  } catch (err) {
    console.log(err, 'err');

  }
});

route.post('/candidate_new_form_1_pdf', file.single('pdf'), async function (req, res) {
  try {
    console.log('enter_1')
    const conn = await connection();

    let cand_id = req.session.candidate_id
    let pdf = req.file ? req.file.filename : null;
    console.log(pdf, 'pdf_1111')


    let query = `UPDATE pf_form_2 SET pdf=? WHERE candidate_id=?`
    conn.query(query, [pdf, cand_id], function (err, result) {
      if (err) throw err;
      res.send('success')
    })
  }
  catch (err) {
    console.log(err,'err')
  }
})

route.post('/nomination_form_1_pdf', file.single('pdf'), async function (req, res) {
  try {
    console.log('enter_1')
    const conn = await connection();

    let cand_id = req.session.candidate_id
    let pdf = req.file ? req.file.filename : null;

    console.log(pdf, 'pdf_1111')


    let query = `UPDATE nominee_details SET pdf=? WHERE candidate_id=?`
    conn.query(query, [pdf, cand_id], function (err, result) {
      if (err) throw err;
      res.send('success')
    })
  }
  catch (err) {
    console.log(err, 'err')
  }
})





route.get('/manage_request',redirectCandidate,async(req,res)=>{
  try {
    
    let c_id = req.session.candidate_id;
    let con=await connection();

    let qry=`SELECT rep_manager_name,rep_manager_email FROM candidate_login WHERE candidate_id=?`
    con.query(qry,[c_id],(err,result)=>{
      if(err)throw err;
      con.end()
      res.render('candidate/manage_request' ,{ role: 'Candidate', page: "candidate_documents",c_id:req.session.candidate_id,data:result[0] })
    })
  } catch (error) {
    
  }
})


route.post("/", file.single("attachment"), async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let con = await connection();
    let c_id = req.session.candidate_id;
    let c_name = req.session.candidate_name;
    let c_email = req.session.candidate_email;

    let from_date = req.body.datefrom ? moment(req.body.datefrom, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_from_date = from_date ? moment(from_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    let to_date = req.body.dateto ? moment(req.body.dateto, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_to_date = to_date ? moment(to_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;

    let from_dates_input = req.body.datesfrom ? req.body.datesfrom.split(', ') : [];
    let from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      let formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return `${formattedDate}:${dayType.trim()}`;
    });

    let formatted_from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      return `${dateString.trim()} (${dayType.trim()})`;
    });

    let attachment = req.file ? req.file.filename : null;
    let currentDate = getCurrentDateTime();

    let no_of_days = from_dates.length > 0 && !from_date ? from_dates.length : req.body.no_of_days;

    let mailContent;
    if (from_dates.length > 0 && !from_date) {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          I would like to request leave on the following dates:<br>
          ${formatted_from_dates.join('<br>')}<br><br>
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    } else {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          ${formatted_from_date === formatted_to_date ? `
            I would like to request a ${req.body.day_type === 'Half day' ? `${req.body.half_day_type} half day ` : 'full day'} leave on ${formatted_from_date}.<br><br>
          ` : `
            I would like to request a leave from ${formatted_from_date} to ${formatted_to_date}.<br><br>
          `}
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    }

    console.log("From dates:", from_dates); 

    con.query(`INSERT INTO leave_request (candidate_id, candidate_name,candidate_mail, from_date, to_date, multi_date, no_of_days, leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave, status, leave_req_sent_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      c_id,
      c_name,
      c_email,
      from_date,
      to_date,
      from_dates.join(','), 
      no_of_days,
      req.body.leave_type,
      req.body.day_type,
      req.body.half_day_type,
      req.body.mail_to,
      req.body.mailCC,
      attachment,
      req.body.reason,
      'pending',
      currentDate
    ],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).send("Error occurred");
        return;
      }

      con.query(`SELECT request_id FROM leave_request ORDER BY request_id DESC LIMIT 1`, (err, idResult) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send("Error occurred");
          return;
        }

        let latestId = idResult[0].request_id;

        console.log(req.body.mailCC)

        let transporter = nodemailer.createTransport({
          host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'hrm@manthanitsolutions.in',
              pass: 'Manthan@4321#'
          },
          debug: true
      });

        let mailOptions = {
          from: 'hrm@manthanitsolutions.in',
          to: req.body.mail_to,
          subject: `Leave Request : ${req.body.leave_type}`,
          html: mailContent,
          attachments: []
        };

        if (req.body.mailCC) {
          mailOptions.cc = req.body.mailCC;
      }
        if (req.file) {
          mailOptions.attachments.push({
            filename: req.file.originalname,
            path: req.file.path
          });
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email: ', error);
            res.status(500).send("Error occurred");
            return;
          }

          console.log('Email sent: ' + info.response);
          res.json({ success: latestId });
        });
      });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send("Error occurred");
  }
});










route.get('/view_request',redirectCandidate, async (req, res) => {
  try {
    let c_id = req.session.candidate_id;
    let con = await connection();

    let qry = `SELECT request_id, from_date, to_date, multi_date, no_of_days, leave_type, 
                      leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by 
               FROM leave_request WHERE candidate_id=${c_id}`;

    con.query(qry, (err, results) => {
      if (err) throw err;

      // Format dates and multi_date
      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      console.log(results);


      con.end()
      res.render('candidate/view_request', { 
        role: 'Candidate', 
        page: 'candidate_documents',
        c_id: req.session.candidate_id,
        data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});

// Helper functions
function formatDate(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear().toString().slice(2);
  return `${day}-${month}-${year}`;
}

function formatDateTime(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear().toString().slice(2);
  const hours = formattedDate.getHours().toString().padStart(2, '0');
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function formatMultiDate(multiDate) {
  if (!multiDate) return 'N/A';

  const dates = multiDate.split(',');
  const formattedDates = dates.map(date => {
    const [dt, type] = date.trim().split(':');
    const formattedDate = formatDate(dt);
    return `${formattedDate}[${type}]`;
  });

  return formattedDates.join(', ');
}




route.get('/view_ar_request',redirectmanager, async (req, res) => {
  try {
    let con = await connection();

    let qry = `SELECT request_id, candidate_id, candidate_name, from_date, to_date, multi_date, no_of_days, 
       leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave,
       leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by
FROM leave_request;
`;

    con.query(qry, (err, results) => {
      if (err) throw err;

      // Format dates and multi_date
      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      console.log(results);

      res.render('manager/view_ar_request', { 
        role: req.session.role, 
        page: 'view_ar_request',
        EMP_CODE: req.session.user_id,
        mg_data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});

route.get('/assigned_assets', redirectmanager, async (req, res) => {
  try {
    let con = await connection();

    let qry = `SELECT * FROM manage_assets WHERE type='assigned';`;

    con.query(qry, (err, results) => {
      if (err) throw err;
console.log(results)

con.end()
      res.render('manager/assigned_assets', { 
        role: req.session.role, 
        page: 'to_do_list_view',
        EMP_CODE: req.session.user_id,
        data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});

route.get('/unassigned_assets', redirectmanager, async (req, res) => {
  try {
    let con = await connection();

    let qry = `SELECT * FROM manage_assets WHERE type='unassigned';`;

    con.query(qry, (err, results) => {
      if (err) throw err;
console.log(results)

con.end()
      res.render('manager/unassigned_assets', { 
        role: req.session.role, 
        page: 'to_do_list_view',
        EMP_CODE: req.session.user_id,
        data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});



// Manager Yogesh --------------------------------------------------------->


route.get('/to_do_list', redirectmanager, async function(req, res) {
  try {
    let man_id = req.session.manager_mail_id.trim();
    console.log(man_id, 'man_id');

    let con = await connection();

    let sql = `
      SELECT
        request_id,
        candidate_id,
        leave_type,
        no_of_days,
        candidate_name
      FROM
        leave_request
      WHERE
        status = ?
        AND (
          mail_cc LIKE CONCAT('%', ?, '%')
          OR mail_to LIKE CONCAT('%', ?, '%')
        )
    `;

    console.log('SQL Query:', sql);
    console.log('Query Parameters:', ['pending']);

    con.query(sql, ['pending', man_id, man_id], function(err, result) {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      console.log(result, 'result');

      if (result.length === 0) {
        console.log('No matching records found.');
      }


      con.end()
      res.render('manager/to_do_list', { 
        role: req.session.role, 
        EMP_CODE: req.session.user_id, 
        page: 'to_do_list', 
        data1: result 
      });
    });
  } catch (err) {
    console.error('Error in /to_do_list route:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/to_do_list_view/:candidate_id/:request_id',redirectmanager,async function(req,res){
  try{

    let m_name=req.session.name
    console.log(m_name,'mname')

    let con=await connection()
    let candidate_id=req.params.candidate_id
    console.log(candidate_id,'candidate_id')
    
    let request_id=req.params.request_id
    console.log(request_id,'request_id')
    
    let sql=`
      SELECT
        request_id,
        candidate_id,
        DATE_FORMAT(from_date,'%d-%m-%Y') AS from_date_formated,
        DATE_FORMAT(to_date, '%d-%m-%Y') AS to_date_formated,
        multi_date,
        no_of_days,
        leave_type,
        day_type,
        half_day_type,
        mail_to,
        mail_cc,
        attachment,
        reason_for_leave,
        status,
        candidate_name,
        candidate_mail as candidate_email
      FROM
        leave_request
      WHERE
        request_id = ? 
      `

      con.query(sql,[request_id],function(err,result){
        if(err) throw err;
        console.log(result,'result_23233')
        
      res.render('manager/to_do_list_view',{role: req.session.role, EMP_CODE: req.session.user_id, page:'to_do_list_view', data1:result})
      })


  }
  catch(err){
    console.log(err,'err')
  }
})




route.post('/reject_id_status_update', async function(req, res) {
  try {
    let con = await connection();
    let date = getCurrentDateTime();

    let m_name=req.session.name
    let { candidate_id, request_id, remarks, cand_email, candidate_name } = req.body;

    console.log(candidate_id, 'candidate_id');
    console.log(request_id, 'request_id');
    console.log(remarks, 'remarks');

    let mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear ${candidate_name},<br><br>
          Your leave request with Request ID: ${request_id} has been rejected.<br><br>
          Remarks: ${remarks}<br><br>
          Thank you.<br><br>
          Regards,<br>
          ${m_name}
        </p>
      `;

    let sql = `UPDATE leave_request SET accept_reject_date=?, remarks=?, status=?,accept_reject_by=? WHERE request_id=?`;

    con.query(sql, [date, remarks, 'rejected',m_name,request_id], function(err, result) {
      if (err) throw err;

      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'hrm@manthanitsolutions.in',
            pass: 'Manthan@4321#'
        },
        debug: true
    });

      let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: cand_email,
        subject: `Leave Request Rejected - Request ID: ${request_id}`,
        html: mailContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          res.status(500).send('Error occurred');
          return;
        }

        console.log('Email sent: ' + info.response);
        res.send('success');
      });
    });
  } catch (err) {
    console.log(err, 'err');
    res.status(500).send('Error occurred');
  }
});



route.post('/approved_status_update', async function(req, res) {
  try {
    let con = await connection();
    let date = getCurrentDateTime();

    let m_name=req.session.name

    let { candidate_id, request_id, remarks, cand_email, candidate_name } = req.body;

    console.log(candidate_id, 'candidate_id');
    console.log(request_id, 'request_id');
    console.log(remarks, 'remarks');

    let mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear ${candidate_name},<br><br>
          Your leave request with Request ID: ${request_id} has been approved.<br><br>
          Remarks: ${remarks}<br><br>
          Thank you.<br><br>
          Regards,<br>
          ${m_name}
        </p>
      `;

    let sql = `UPDATE leave_request SET accept_reject_date=?, remarks=?, status=?,accept_reject_by=? WHERE request_id=?`;

    con.query(sql, [date, remarks, 'approved',m_name, request_id], function(err, result) {
      if (err) throw err;

      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'hrm@manthanitsolutions.in',
            pass: 'Manthan@4321#'
        },
        tls: {
          rejectUnauthorized: false }
        // debug: true
    });

      let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: cand_email,
        subject: `Leave Request Approved - Request ID: ${request_id}`,
        html: mailContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          res.status(500).send('Error occurred');
          return;
        }

        console.log('Email sent: ' + info.response);
        res.send('success');
      });
    });
  } catch (err) {
    console.log(err, 'err');
    res.status(500).send('Error occurred');
  }
});




// Manager Yogesh ---------------------------------------------------------/>











// Naveet & Kapil ------------------------------------------------------->


route.post('/assignasset', file.array('image', 5), async function(req, res) {
  try {
      console.log(req.body, "req.body");
      console.log(req.files, "req.files");

      let con = await connection();
      var cdate = getCurrentDateTime();
      var candidate_id = req.body.candidate_id;
      var asset_type = req.body.asset_type;
      var asset_brand = req.body.asset_brand;
      var asset_serial_no = req.body.asset_serial_no;
      var condition = req.body.condition;
      var assigned_by = req.body.assigned_by;

      // Store filenames in their respective variables
      var img1 = req.files[0] ? req.files[0].filename : null;
      var img2 = req.files[1] ? req.files[1].filename : null;
      var img3 = req.files[2] ? req.files[2].filename : null;
      var img4 = req.files[3] ? req.files[3].filename : null;
      var img5 = req.files[4] ? req.files[4].filename : null;

      var query = 'INSERT INTO manage_assets(candidate_id, asset_type, asset_brand, asset_serial_no, condition_at_assingnment, assigned_by, assigned_date, img_1, img_2, img_3, img_4, img_5,type,status) VALUES ?';
      var values = [[candidate_id, asset_type, asset_brand, asset_serial_no, condition, assigned_by, cdate, img1, img2, img3, img4, img5,'assigned','default']];

      con.query(query, [values], (error, result) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ success: false, message: "Failed to assign asset" });
          }
          console.log(result, 'resultasset');
          if (result.affectedRows > 0) {
              const jdid = result.insertId;
              console.log(jdid, "dgdusgdiueudgi");
              return res.json({ success: true, jdid: jdid });
          } else {
              return res.status(500).json({ success: false, message: "Failed to assign asset" });
          }
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

route.get('/manage_assets', redirectCandidate, async function(req, res) {
  try {
    let c_id = req.session.candidate_id;
    let con = await connection();

    let sql = `SELECT asset_id, asset_type, asset_brand, asset_serial_no, condition_at_assingnment, assigned_by, assigned_date, img_1, img_2, img_3, img_4, img_5, status FROM manage_assets WHERE candidate_id=${c_id} AND type='assigned'`;
    con.query(sql, (err, result) => {
      if (err) throw err;

      console.log(result);

      let assetsArray = [];
      result.forEach(row => {
        // Formatting assigned_date
        let assignedDate = new Date(row.assigned_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        let asset = {
          asset_id: row.asset_id,
          asset_type: row.asset_type,
          asset_brand: row.asset_brand,
          asset_serial_no: row.asset_serial_no,
          condition_at_assingnment: row.condition_at_assingnment,
          assigned_by: row.assigned_by,
          assigned_date: assignedDate, // Assigning formatted date
          img_1: row.img_1,
          img_2: row.img_2,
          img_3: row.img_3,
          img_4: row.img_4,
          img_5: row.img_5,
          status: row.status // Add status here
        };
        assetsArray.push(asset);
      });

      console.log("Assets Array:", assetsArray);
      res.render('candidate/manage_assets', {c_id:req.session.candidate_id, role: req.session.role, asset: assetsArray });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


route.get('/assign_assets',redirectmanager,async function(req,res){
  try{
      res.render('manager/assign_assets',{role: req.session.role, EMP_CODE: req.session.user_id, page:'manage_assets'})    
    }
  catch(err){
    console.log(err,'err')
  }
})

route.post('/create_report', file.single('file_image'), async (req, res) => {
  try {
    const conn = await connection();
    console.log(req.file);

    let can_id = req.body.candidate_id || req.session.candidate_id;
    let c_name=req.session.candidate_name
    let ass_id = req.body.asset_id1;
    let currentDate = getCurrentDateTime();
    let problem1 = req.body.problem1;
    let exp_problem1 = req.body.exp_problem1;


    
    let mailContent = `
    <p style="color: black; font-size: 13px;">
        Dear Sir,<br><br>
        We are writing to inform you of an issue regarding asset ID: ${ass_id}.<br><br>
        <strong>Candidate Details:</strong><br>
        Candidate ID: ${can_id}<br>
        Candidate Name: ${c_name}<br><br>
        <strong>Issue Details:</strong><br>
        Reported Problem: ${problem1}<br>
        Exp Problem: ${exp_problem1}<br><br>
        Date Reported: ${currentDate}<br><br>
        Thank you.<br><br>
        Regards,<br>
        ${c_name}
    </p>
`;



    var sql = 'INSERT INTO asset_report (candidate_id, asset_serial_no, `current_date_time`, problem, exp_problem, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conn.query(sql, [can_id, ass_id, currentDate, problem1, exp_problem1, req.file ? req.file.filename : null, 'processing'], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database');
      } else {
        var sql2 = 'UPDATE manage_assets SET status = ? WHERE candidate_id = ? AND asset_serial_no = ?';
        conn.query(sql2, ['processing', can_id, ass_id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error updating data in database');
          } else {


            let transporter = nodemailer.createTransport({
              host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
              port: 465,
              secure: true,
              auth: {
                  user: 'hrm@manthanitsolutions.in',
                  pass: 'Manthan@4321#'
              },
              debug: true
          });
      
            let mailOptions = {
              from: 'hrm@manthanitsolutions.in',
              to: 'vinay@manthanitsolutions.in',
              cc:'sunanda@manthanitsolutions.in',
              subject: `Asset Issue`,
              html: mailContent
            };
      
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email: ', error);
                res.status(500).send('Error occurred');
                return;
              }
      
              console.log('Email sent: ' + info.response);
              res.send(result);
              conn.end()
            });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});




route.get('/manage_report',redirectmanager,async function(req,res){
  try{

    var query = "SELECT report_id,candidate_id, report_id , asset_serial_no, current_date_time, problem, exp_problem, image,status FROM asset_report WHERE status != 'problem resolved'";
    var con = await connection();
    con.query(query, (error, result) => {
      if (error) throw error;
      else {
        console.log(result)
        con.end()
        res.render('manager/manage_report',{ mg_data: result, role: req.session.role, EMP_CODE: req.session.user_id, page:'manage_report'})
      }
    });
         
    }
  catch(err){
    console.log(err,'err')
  }
})


route.post('/take_back_asset', async (req, res) => {
  try {
    let con = await connection();
    let candidateId = req.body.candidate_id;
    let assetSerialNo = req.body.asset_serial_no;
    let report_id=req.body.report_id

    console.log(req.body,'xhvuij')

    let updateManageAssetsQuery = `
      UPDATE manage_assets 
      SET status = 'taken back' 
      WHERE candidate_id = ? AND asset_serial_no = ?`;

      con.query(updateManageAssetsQuery,[candidateId,assetSerialNo],(err,result)=>{
        if(err) throw err;


        let updateAssetReportQuery = `
      UPDATE asset_report 
      SET status = 'taken back' 
      WHERE candidate_id = ? AND asset_serial_no = ? AND report_id=?`;

      con.query(updateAssetReportQuery,[candidateId,assetSerialNo,report_id],(err,result2)=>{
        if (err) throw err;

        console.log(result2)
        con.end()
        res.status(200).send({ message: 'Asset status updated successfully' });
      })

      })
    
    




  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: 'Error updating asset status' });
  }
});

route.post('/confirm_asset_submit', async (req, res) => {
  try {
    let con = await connection();
    let assetSerialNo = req.body.asset_serial_no;

    let updateManageAssetsQuery = `
      UPDATE manage_assets 
      SET status = 'submitted' 
      WHERE asset_serial_no = ?`;

    con.query(updateManageAssetsQuery, [assetSerialNo], (err, result) => {
      if (err) throw err;

      let updateAssetReportQuery = `
        UPDATE asset_report 
        SET status = 'submitted' 
        WHERE asset_serial_no = ? 
        AND report_id = (
          SELECT report_id 
          FROM asset_report 
          WHERE asset_serial_no = ? 
          ORDER BY current_date_time DESC 
          LIMIT 1
        )`;

      con.query(updateAssetReportQuery, [assetSerialNo, assetSerialNo], (err, result2) => {
        if (err) throw err;

        console.log(result2);
        con.end();
        res.status(200).send({ message: 'Asset status updated successfully' });
      });
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: 'Error updating asset status' });
  }
});



route.post('/confirm_asset_receive', async (req, res) => {
  try {
    let con = await connection();
    let { candidate_id, asset_serial_no, report_id } = req.body;
    console.log(report_id);

    let updateManageAssetsQuery = `
      UPDATE manage_assets 
      SET status = 'received',
          type = 'unassigned'
      WHERE candidate_id = ? AND asset_serial_no = ?`;

    con.query(updateManageAssetsQuery, [candidate_id, asset_serial_no], (err, result) => {
      if (err) throw err;

      let updateAssetReportQuery = `
        UPDATE asset_report 
        SET status = 'received' 
        WHERE candidate_id = ? AND asset_serial_no = ? AND report_id = ?`;

      con.query(updateAssetReportQuery, [candidate_id, asset_serial_no, report_id], (err, result2) => {
        if (err) throw err;

        console.log(result2);
        con.end();
        res.status(200).send({ message: 'Asset status updated successfully' });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: 'Error updating asset status' });
  }
});

route.post('/resolve_problem', async (req, res) => {
  try {
    const con = await connection();
    const { candidate_id, asset_serial_no, report_id } = req.body;

    const updateManageAssetsQuery = `
      UPDATE manage_assets 
      SET status = 'problem resolved',
        condition_at_assingnment='repaired'
      WHERE candidate_id = ? AND asset_serial_no = ?`;

    con.query(updateManageAssetsQuery, [candidate_id, asset_serial_no], (err, result) => {
      if (err) throw err;

      const updateAssetReportQuery = `
        UPDATE asset_report 
        SET status = 'problem resolved' 
        WHERE candidate_id = ? AND asset_serial_no = ? AND report_id=?`;

      con.query(updateAssetReportQuery, [candidate_id, asset_serial_no, report_id], (err, result2) => {
        if (err) throw err;

        console.log(result2);
        con.end();
        res.status(200).send({ message: 'Asset status updated to problem resolved' });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: 'Error updating asset status' });
  }
});


route.post('/assign_assets_candidate_details', async (req, res) => {
  try {
    let con = await connection();
    let c_id = req.body.c_id;

    let qry = `SELECT candidate_name FROM candidate_login WHERE candidate_id = ?`;
    con.query(qry, [c_id], (err, results) => {
      if (err) throw err;

      con.end()
      if (results.length > 0) {
        res.json({ candidate_name: results[0].candidate_name });
      } else {
        res.json({ candidate_name: '' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving candidate details' });
  }
});
route.post('/check_asset_serial_no', async (req, res) => {
  try {
    const con = await connection();
    const asset_no = req.body.asset_no;

    const qry = 'SELECT * FROM manage_assets WHERE asset_serial_no = ? AND type = ?';
    con.query(qry, [asset_no, 'assigned'], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database query error');
      }

      con.end()
      
      if (result.length > 0) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

route.post('/mail_cc', async (req, res) => {
  try {
    const con = await connection();
    const c_id = req.session.candidate_id;

    const qry = 'SELECT rep_senior_1_email, rep_senior_2_email, rep_senior_3_email, rep_senior_4_email FROM candidate_login WHERE candidate_id = ?';
    con.query(qry, [c_id], (err, result) => {
      if (err) throw err;

      const emails = result[0];
      const emailArray = Object.values(emails).filter(email => email !== null);

      con.end()
      res.json(emailArray);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});




route.post('/reassign_assets', async (req, res) => {
  try {
    let { asset_brand, asset_serial_no, candidate_id} = req.body;
    var cdate = getCurrentDateTime();

    let con = await connection();

    let qry = `
      UPDATE manage_assets 
      SET candidate_id = ?, 
          assigned_date = ?, 
          type = ?, 
          status = ? 
      WHERE asset_brand = ? AND 
            asset_serial_no = ?
    `;

    con.query(qry, [candidate_id, cdate, 'assigned','default', asset_brand, asset_serial_no],(err,results)=>{
      if(err)throw err;
      con.end()
      res.status(200).send({ message: 'Asset reassigned successfully' });
    });


  
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'An error occurred while reassigning the asset' });
  }
});



route.get('/change_pss', redirectCandidate, async (req, res) => {
  try {
    let c_id = req.session.candidate_id;
    let con=await connection()
    let qry = 'SELECT password FROM candidate_login WHERE candidate_id = ?';

    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching password');
        return;
      }


      con.end()
      res.render('candidate/change_pss', { role: 'Candidate', page: 'candidate_documents', c_id: req.session.candidate_id,pass:results });
    });

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});



route.post('/change_pss', async (req, res) => {
  try {
    let c_id = req.session.candidate_id;
    let c_pass = req.body.c_pass;

    let con = await connection();

    let qry = `UPDATE candidate_login SET password = ? WHERE candidate_id = ?`;

    con.query(qry, [c_pass, c_id], (err, results) => {
      if (err) {
        console.error('Error updating password:', err);
        return;
      }

      res.send({ success: true });
      con.end()
    });


  } catch (error) {
    console.error('Error', error);
  }
});




route.get('/candidate_forgot_password',(req,res)=>{
  try {
    res.render('candidate_forgot_password')
    
  } catch (error) {
    
  }
})


const crypto = require('crypto');

function generateOTP() {
  return crypto.randomInt(1000, 10000).toString(); 
}



route.post('/candidate_forgot_pass', async (req, res) => {
  const { emp_code } = req.body;

  try {
    const con = await connection();
    let qry;

    // Query 1: Admin Master
    qry = 'SELECT EMP_Email_ID, EMP_NUMBER FROM hrm_user_login WHERE EMP_CODE = ?';
    con.query(qry, [emp_code], async (err, results) => {
      if (err) {
        console.error('Error executing SQL query in hrm_user_login:', err);
        return res.json({ message: 'Error in hrm_user_login' });
      }

      if (results && results.length > 0) {
        let email = results[0].EMP_Email_ID;
        let candidate_mobile = results[0].EMP_NUMBER;
        let role = 'hrm_user_login';

        try {
          await sendEmail(email, emp_code);
          return res.json({ message: 'OTP sent successfully', role: role, email: email, candidate_mobile: candidate_mobile });
        } catch (emailErr) {
          console.error('Error sending email in hrm_user_login:', emailErr);
          return res.json({ message: 'Error sending email in hrm_user_login' });
        }
      }

      // Query 2: Employee Master
      qry = 'SELECT emp_email, HOME_PHONE FROM employee_master WHERE EMPLID = ?';
      con.query(qry, [emp_code], async (err, results) => {
        if (err) {
          console.error('Error executing SQL query in employee_master:', err);
          return res.json({ message: 'Error in employee_master' });
        }


        if (results && results.length > 0) {
          let email = results[0].emp_email;
          let candidate_mobile = results[0].HOME_PHONE;
          let role = 'employee_master';

          try {
            await sendEmail(email, emp_code);
            return res.json({ message: 'OTP sent successfully', role: role, email: email, candidate_mobile: candidate_mobile });
          } catch (emailErr) {
            console.error('Error sending email in employee_master:', emailErr);
            return res.json({ message: 'Error sending email in employee_master' });
          }
        }

        // Query 3: Candidate Login
        qry = 'SELECT candidate_email, candidate_mobile FROM candidate_login WHERE candidate_id = ?';
        con.query(qry, [emp_code], async (err, results) => {
          if (err) {
            console.error('Error executing SQL query in candidate_login:', err);
            return res.json({ message: 'Error in candidate_login' });
          }

          if (results && results.length > 0) {
            let email = results[0].candidate_email;
            let candidate_mobile = results[0].candidate_mobile;
            let role = 'candidate_login';

            try {
              await sendEmail(email, emp_code);
              return res.json({ message: 'OTP sent successfully', role: role, email: email, candidate_mobile: candidate_mobile });
            } catch (emailErr) {
              console.error('Error sending email in candidate_login:', emailErr);
              return res.json({ message: 'Error sending email in candidate_login' });
            }
          }

          // If no user found in any table
          con.end()
          return res.json({ emp_check: 'User not found' });
        });
      });
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.json({ message: 'Catch Error' });
  }
});

// Function to send email with OTP
async function sendEmail(email, emp_code) {
  const otp = generateOTP();
  const expirationTime = moment().add(1, 'minute').format('YYYY-MM-DD HH:mm:ss');

  try {
    const con = await connection();
    const insertQry = 'INSERT INTO forgot_candidate_pass (candidate_id, otp, expiration_time) VALUES (?, ?, ?)';
    await con.query(insertQry, [emp_code, otp, expirationTime]);

    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'hrm@manthanitsolutions.in',
        pass: 'Manthan@4321#'
      },
      debug: true
    });

    let mailOptions = {
      from: 'hrm@manthanitsolutions.in',
      to: email,
      subject: `Reset Password`,
      html: `
        <p>Dear Candidate,</p>
        <p>Your OTP to reset your password is <strong>${otp}</strong>. Please use this OTP within 1 minute.</p>
        <p>Thank you,</p>
        <p>Manthan IT Solutions</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate error back to caller
  }
}




route.post('/verify_otp', async (req, res) => {
  const { emp_code, otp } = req.body;
  try {
    const con = await connection();

    const otpCheckQry = 'SELECT otp, expiration_time FROM forgot_candidate_pass WHERE candidate_id = ? ORDER BY id DESC LIMIT 1';
    con.query(otpCheckQry, [emp_code], (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      const { otp: storedOtp, expiration_time } = results[0];

      if (moment().isAfter(expiration_time)) {
        return res.status(400).json({ message: 'OTP has expired' });
      }

      if (otp !== storedOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      // OTP is valid, proceed to delete it from the table
      const deleteQry = 'DELETE FROM forgot_candidate_pass WHERE candidate_id = ?';
      con.query(deleteQry, [emp_code], (deleteErr, deleteResults) => {
        if (deleteErr) throw deleteErr;
        
        con.end()
        res.json({ message: 'OTP verified successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




route.get('/create_new_pass/:emp_code/:role',async(req,res)=>{
try {
let emp_code=req.params.emp_code
let role=req.params.role

  res.render('candidate_new_pss',{emp_code:emp_code,role:role})
  
} catch (error) {
  
}
})


route.post('/change_password_candidate', async (req, res) => {
  const { emp_code, new_password, role } = req.body;

  try {
    const con = await connection();
    let updatePasswordQry;

    if (role === 'hrm_user_login') {
      updatePasswordQry = 'UPDATE hrm_user_login SET PASSWORD = ? WHERE EMP_CODE = ?';
    } else if (role === 'employee_master') {
      updatePasswordQry = 'UPDATE employee_master SET Password = ? WHERE EMPLID = ?';
    } else if (role === 'candidate_login') {
      updatePasswordQry = 'UPDATE candidate_login SET password = ? WHERE candidate_id = ?';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    con.query(updatePasswordQry, [new_password, emp_code], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }


      con.end()
      res.json({ message: 'Password changed successfully' });
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/request_assets', redirectCandidate, async function(req, res) {
  try {

    let c_id=req.session.candidate_id

      res.render('candidate/request_assets', { role: req.session.role,c_id:c_id});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});








route.get('/today_emp_on_leave', redirectLogin, async (req, res) => {
  try {
    const con = await connection(); 
    let today_date1 = today_date_1(); 
    let today_date2 = today_date_2(); 
    let status="approved";

    console.log(today_date2, 'today_date2');
    console.log(today_date1, 'today_date1');

    let sql = `
      SELECT
        request_id,
        candidate_id,
        candidate_name,
        leave_type,
        from_date,
        to_date,
        multi_date,
        day_type
      FROM
        leave_request
      WHERE 
      (
        (from_date IS NOT NULL AND to_date IS NOT NULL AND
          ? BETWEEN from_date AND to_date)
        OR
        (
          (from_date IS NULL OR from_date = '') AND 
          (to_date IS NULL OR to_date = '') AND 
          multi_date LIKE CONCAT('%', ?, '%')
        )
      )
        AND status=?
    `;

    con.query(sql, [today_date1, today_date1,status], function(err, results) {
      if (err) throw err;
      console.log()

      results.forEach(row => {
                   
        if (row.multi_date && row.multi_date.trim() !== "") { 
          let multiDates = row.multi_date.split(','); 
          multiDates.forEach(entry => {
            let [date, type] = entry.split(':').map(item => item.trim()); 
            if (date === today_date1) {
              row.day_type = type; 
            }
          });
          // console.log(row.request_id,'1')
        }

        if (!row.day_type || row.day_type.trim() === "") {
          // console.log(row.request_id,'2')
          row.day_type = "Full Day";
        }
        
      });

      

      console.log(results, 'result_111');

      // Render the result to the view
      con.end()
      res.render('admin/today_emp_on_leave', {
        EMP_CODE: req.session.user_id,
        role: req.session.role,
        page: 'today_emp_on_leave',
        data1: results,
        today_date2: today_date2
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});










route.get('/manager_leave_request', redirectmanager, async (req, res) => {
  try {
    let man_id = req.session.manager_mail_id;
    console.log(man_id);

    let con = await connection();
    let qry = 'SELECT Sup_EMAIL_ADDR FROM employee_master WHERE EMP_Email = ?';

    con.query(qry, [man_id], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      console.log(results);
      con.end()
        res.render('manager/manager_leave_request', {
          role: req.session.role,
          EMP_CODE: req.session.user_id,
          page: 'to_do_list',
          supervisorEmail:results[0].Sup_EMAIL_ADDR
        });
     
    });

  } catch (error) {
    console.error('Error in /manager_leave_request route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


route.post('/manager_mail_cc', async (req, res) => {
  try {
    const con = await connection();
    let man_id = req.session.manager_mail_id;

    const qry = 'SELECT Sup_EMAIL_Id_1, Sup_EMAIL_Id_2, Sup_EMAIL_Id_3, Sup_EMAIL_Id_4 FROM employee_master WHERE EMP_Email = ?';
    con.query(qry, [man_id], (err, result) => {
      if (err) throw err;

      const emails = result[0];
      const emailArray = Object.values(emails).filter(email => email !== null);

      res.json(emailArray);
      con.end()
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});



route.post("/manager_leave_request", file.single("attachment"), async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let con = await connection();
    let c_id = req.session.emp_id;
    let c_name = req.session.name;
    let m_email = req.session.manager_mail_id

    let from_date = req.body.datefrom ? moment(req.body.datefrom, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_from_date = from_date ? moment(from_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    let to_date = req.body.dateto ? moment(req.body.dateto, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_to_date = to_date ? moment(to_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;

    let from_dates_input = req.body.datesfrom ? req.body.datesfrom.split(', ') : [];
    let from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      let formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return `${formattedDate}:${dayType.trim()}`;
    });

    let formatted_from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      return `${dateString.trim()} (${dayType.trim()})`;
    });

    let attachment = req.file ? req.file.filename : null;
    let currentDate = getCurrentDateTime();

    let no_of_days = from_dates.length > 0 && !from_date ? from_dates.length : req.body.no_of_days;

    let mailContent;
    if (from_dates.length > 0 && !from_date) {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          I would like to request leave on the following dates:<br>
          ${formatted_from_dates.join('<br>')}<br><br>
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    } else {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          ${formatted_from_date === formatted_to_date ? `
            I would like to request a ${req.body.day_type === 'Half day' ? `${req.body.half_day_type} half day ` : 'full day'} leave on ${formatted_from_date}.<br><br>
          ` : `
            I would like to request a leave from ${formatted_from_date} to ${formatted_to_date}.<br><br>
          `}
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    }

    console.log("From dates:", from_dates); 

    con.query(`INSERT INTO leave_request (candidate_id, candidate_name,candidate_mail, from_date, to_date, multi_date, no_of_days, leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave, status, leave_req_sent_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      c_id,
      c_name,
      m_email,
      from_date,
      to_date,
      from_dates.join(','), 
      no_of_days,
      req.body.leave_type,
      req.body.day_type,
      req.body.half_day_type,
      req.body.mail_to,
      req.body.mailCC,
      attachment,
      req.body.reason,
      'pending',
      currentDate
    ],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).send("Error occurred");
        return;
      }

      con.query(`SELECT request_id FROM leave_request ORDER BY request_id DESC LIMIT 1`, (err, idResult) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send("Error occurred");
          return;
        }

        let latestId = idResult[0].request_id;

        console.log(req.body.mailCC)

        let transporter = nodemailer.createTransport({
          host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'hrm@manthanitsolutions.in',
              pass: 'Manthan@4321#'
          },
          debug: true
      });

        let mailOptions = {
          from: 'hrm@manthanitsolutions.in',
          to: req.body.mail_to,
          subject: `Leave Request : ${req.body.leave_type}`,
          html: mailContent,
          attachments: []
        };

        if (req.body.mailCC) {
          mailOptions.cc = req.body.mailCC;
      }
        if (req.file) {
          mailOptions.attachments.push({
            filename: req.file.originalname,
            path: req.file.path
          });
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email: ', error);
            res.status(500).send("Error occurred");
            return;
          }

          console.log('Email sent: ' + info.response);
          res.json({ success: latestId });
          con.end()
        });
      });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send("Error occurred");
  }
});


route.get('/manager_view_request', redirectmanager, async (req, res) => {
  try {
    let c_id = req.session.emp_id;
    let con = await connection();

    let qry = `SELECT request_id, from_date, to_date, multi_date, no_of_days, leave_type, 
                      leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by 
               FROM leave_request WHERE candidate_id = ?`;

    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      console.log(results);
con.end()
      res.render('manager/manager_view_request', { 
        role: req.session.role,
        EMP_CODE: req.session.user_id,
        page: 'to_do_list',
        data: results 
      });
    });

  } catch (error) {
    console.error('Error in /manager_view_request route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


route.get('/admin_to_do_list', redirectLogin, async function(req, res) {
  try {
    let man_id = req.session.admin_mail?.trim();

    console.log(man_id, 'ddf');

    let con = await connection();

    let sql = `
      SELECT
    *
      FROM
        leave_request
      WHERE
        leave_request.status = ?
    `;


    con.query(sql, ['pending'], function(err, result) {
      if (err) {
        console.error('SQL query error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (result.length === 0) {
        console.log('No matching records found.');
      } else {
        // console.log(result, 'result_23233');
      }


      con.end()
      res.render('admin/admin_to_do_list', {
        EMP_CODE: req.session.user_id,
        role: req.session.role,
        page: 'today_emp_on_leave',
        data1: result
      });
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/admin_to_do_list_view/:candidate_id/:request_id', redirectLogin, async function(req, res) {
  try {
    let m_name = req.session.name;
    console.log(m_name, 'mname');

    let con = await connection();
    let candidate_id = req.params.candidate_id;
    console.log(candidate_id, 'candidate_id');

    let request_id = req.params.request_id;
    console.log(request_id, 'request_id');

    let sql = `
      SELECT
        request_id,
        candidate_id,
        DATE_FORMAT(from_date, '%d-%m-%Y') AS from_date_formated,
        DATE_FORMAT(to_date, '%d-%m-%Y') AS to_date_formated,
        multi_date,
        no_of_days,
        leave_type,
        day_type,
        half_day_type,
        mail_to,
        mail_cc,
        attachment,
        reason_for_leave,
        status,
        candidate_name,  
        candidate_mail AS candidate_email
      FROM
        leave_request
      WHERE
        request_id = ? AND candidate_id = ?
    `;

    con.query(sql, [request_id, candidate_id], function(err, result) {
      if (err) throw err;
      // console.log(result, 'result_23233');


      con.end()
      res.render('admin/admin_to_do_list_view', {
        EMP_CODE: req.session.user_id,
        role: req.session.role,
        page: 'today_emp_on_leave',
        data1: result
      });
    });
  } catch (err) {
    console.log(err, 'err');
  }
});




route.get('/admin_view_ar_request',redirectLogin, async (req, res) => {
  try {
    let con = await connection();

    let qry = `SELECT request_id, candidate_id, candidate_name, from_date, to_date, multi_date, no_of_days, 
       leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave,
       leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by
FROM leave_request;
`;

    con.query(qry, (err, results) => {
      if (err) throw err;

      // Format dates and multi_date
      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      // console.log(results);
con.end()
      res.render('admin/admin_view_ar_request', { 
        role: req.session.role, 
        page: 'admin_view_ar_request',
        EMP_CODE: req.session.user_id,
        mg_data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});



route.post('/cancel_request', async (req, res) => {
  try {
    const con = await connection();
    const requestId = req.body.requestId;

    const qry = `UPDATE leave_request SET status = ? WHERE request_id = ?`;

    con.query(qry, ['cancelled', requestId], (err, result) => {
      if (err) {
        console.error('SQL query error:', err);
        
      }


      res.json({ success: true, message: 'Request cancelled successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


route.post("/manage_leave", file.single("attachment"), async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let con = await connection();
    let c_id = req.session.candidate_id;
    let c_name = req.session.candidate_name;
    let c_email = req.session.candidate_email;

    let from_date = req.body.datefrom ? moment(req.body.datefrom, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_from_date = from_date ? moment(from_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    let to_date = req.body.dateto ? moment(req.body.dateto, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_to_date = to_date ? moment(to_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;

    let from_dates_input = req.body.datesfrom ? req.body.datesfrom.split(', ') : [];
    let from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      let formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return `${formattedDate}:${dayType.trim()}`;
    });

    let formatted_from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      return `${dateString.trim()} (${dayType.trim()})`;
    });

    let attachment = req.file ? req.file.filename : null;
    let currentDate = getCurrentDateTime();

    let no_of_days = from_dates.length > 0 && !from_date ? from_dates.length : req.body.no_of_days;

    let mailContent;
    if (from_dates.length > 0 && !from_date) {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          I would like to request leave on the following dates:<br>
          ${formatted_from_dates.join('<br>')}<br><br>
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    } else {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          ${formatted_from_date === formatted_to_date ? `
            I would like to request a ${req.body.day_type === 'Half day' ? `${req.body.half_day_type} half day ` : 'full day'} leave on ${formatted_from_date}.<br><br>
          ` : `
            I would like to request a leave from ${formatted_from_date} to ${formatted_to_date}.<br><br>
          `}
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    }

    console.log("From dates:", from_dates); 

    con.query(`INSERT INTO leave_request (candidate_id, candidate_name,candidate_mail, from_date, to_date, multi_date, no_of_days, leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave, status, leave_req_sent_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      c_id,
      c_name,
      c_email,
      from_date,
      to_date,
      from_dates.join(','), 
      no_of_days,
      req.body.leave_type,
      req.body.day_type,
      req.body.half_day_type,
      req.body.mail_to,
      req.body.mailCC,
      attachment,
      req.body.reason,
      'pending',
      currentDate
    ],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).send("Error occurred");
        return;
      }

      con.query(`SELECT request_id FROM leave_request ORDER BY request_id DESC LIMIT 1`, (err, idResult) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send("Error occurred");
          return;
        }

        let latestId = idResult[0].request_id;

        console.log(req.body.mailCC)

        let transporter = nodemailer.createTransport({
          host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'hrm@manthanitsolutions.in',
              pass: 'Manthan@4321#'
          },
          tls: {
            rejectUnauthorized: false }
          // debug: true
      });

        let mailOptions = {
          from: 'hrm@manthanitsolutions.in',
          to: req.body.mail_to,
          subject: `Leave Request : ${req.body.leave_type}`,
          html: mailContent,
          attachments: []
        };

        if (req.body.mailCC) {
          mailOptions.cc = req.body.mailCC;
      }
        if (req.file) {
          mailOptions.attachments.push({
            filename: req.file.originalname,
            path: req.file.path
          });
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email: ', error);
            res.status(500).send("Error occurred");
            return;
          }

          console.log('Email sent: ' + info.response);
          res.json({ success: latestId });
          con.end()
        });
      });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send("Error occurred");
  }
});








route.get('/cand_leave_dashboard', redirectCandidate, async (req, res) => {
  try {
    let con = await connection();
    let c_id = req.session.candidate_id;
    let c_name = req.session.candidate_name;
    

    res.render('candidate/cand_leave_dashboard', {
      role: 'Candidate',
      page: 'candidate_documents',
      c_id: c_id,
      c_name: c_name,
      
    });

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});


route.post('/candidate_leave_count', redirectCandidate, async (req, res) => {
  try {
    let con = await connection();
    let c_id = req.session.candidate_id;
    let c_name = req.session.candidate_name;
    

    let { startDate, endDate } = getCurrentMonthRange();

    let total_leave_qry = `
      SELECT multi_date 
      FROM leave_request
      WHERE candidate_id = ? AND status = ? `;

    con.query(total_leave_qry, [c_id,"approved"], function(err, results) {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      let total_multi_full_day_leave = 0;
      let total_multi_half_day_leave = 0;

      results.forEach(row => {
        let leaveEntries = row.multi_date.split(',');

        leaveEntries.forEach(entry => {
          if(entry!==''){
            let leaveDate = entry.split(':')[0].trim();
            // console.log(leaveDate,'leaveDate')
            let leave_type_date = entry.split(':')[1].trim();
            if(leave_type_date=="Half day"){
              if (leaveDate >= startDate && leaveDate <= endDate) {
                total_multi_half_day_leave++;
              }
            }
            else{
              if (leaveDate >= startDate && leaveDate <= endDate) {
                total_multi_full_day_leave++;
              }
            }


          }

        });
      });


      // console.log(total_multi_full_day_leave,'total_multi_full_day_leave')
      // console.log(total_multi_half_day_leave,'total_multi_half_day_leave')

      let from_to_all_leave_qry=
      ` SELECT 
          from_date, to_date, day_type
        FROM 
          leave_request
        WHERE 
          candidate_id = ? AND
          status = ? AND
          (from_date IS NOT NULL OR from_date ='') AND
          (to_date IS NOT NULL OR to_date ='')`;
          
          con.query(from_to_all_leave_qry, [c_id,  "approved"], function(err2, results2) {      
            if(err2) throw err2

            // console.log(results2,'results2_results2')

            let total_from_to_full_day=0
            let total_from_to_half_day=0

            results2.forEach(row => {
              // console.log(row,'row_row_row')

              if(row.day_type=='Half day'){

              let date_list=getDateRange(row.from_date, row.to_date)
              // console.log(date_list,'date_list55')

              for(let i=0; i<date_list.length; i++){
                if (date_list[i] >= startDate && date_list[i] <= endDate) {
                  total_from_to_half_day++;
                }
              }
            
              }
              else{
               
              let date_list=getDateRange(row.from_date, row.to_date)
              // console.log(date_list,'date_list55')

              for(let i=0; i<date_list.length; i++){
                if (date_list[i] >= startDate && date_list[i] <= endDate) {
                  total_from_to_full_day++;
                }
              }

              }

            });
      
          // console.log(total_from_to_full_day,'total_from_to_full_day')
          // console.log(total_from_to_half_day,'total_from_to_half_day')



            let total_full_day_leaves= total_from_to_full_day + total_multi_full_day_leave
            let total_half_day_leaves= total_from_to_half_day + total_multi_half_day_leave
            let total_leaves=total_full_day_leaves + total_half_day_leaves

              console.log(total_full_day_leaves,'total_full_day_leaves')
              console.log(total_half_day_leaves,'total_half_day_leaves')
              console.log(total_leaves,'total_leaves')

            res.send( {              
              total_full_day_leaves:total_full_day_leaves,
              total_half_day_leaves:total_half_day_leaves,
              total_leaves:total_leaves
            });
      

          
            
        })
      

      
    });
  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});




// // Example usage
// let toDate = '2024-06-27';
// let fromDate = '2024-07-05';

// let datesBetween = getDateRange(toDate, fromDate);
// console.log(datesBetween);





// route.get('/cand_leave_dashboard', redirectCandidate, async (req, res) => {
//   try {
//     let con = await connection();
//     let c_id = req.session.candidate_id;
//     let c_name = req.session.candidate_name;
//     let status = "approved";

//     // Get current month start and end dates
//     let { startDate, endDate } = getCurrentMonthRange();

//     let total_leave_qry = `
//       SELECT COUNT(request_id) AS total_leave
//       FROM leave_request
//       WHERE 
//         status = ?
//         AND candidate_id = ?
//         AND (
//           (from_date IS NOT NULL AND to_date IS NOT NULL AND from_date <= ? AND to_date >= ?)
//           OR
//           ((from_date IS NULL OR from_date = '') AND (to_date IS NULL OR to_date = '') AND multi_date LIKE CONCAT('%', ?, '%'))
//         )`;

//     console.log('SQL Query:', total_leave_qry);
//     console.log('Query Parameters:', [status, c_id, endDate, startDate, endDate]);

//     con.query(total_leave_qry, [status, c_id, endDate, startDate, endDate], function(err, results) {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }

//       // Since COUNT() always returns a result (even if 0), results will contain total_leave
//       let total_leave_count = results[0].total_leave || 0;

//       console.log('Total leaves taken by candidate this month:', total_leave_count);

//       res.render('candidate/cand_leave_dashboard', {
//         role: 'Candidate',
//         page: 'candidate_documents',
//         c_id: req.session.candidate_id,
//         c_name: c_name,
//         total_leave_count: total_leave_count // Pass the count to the rendered view
//       });
//     });
//   } catch (error) {
//     console.error('Caught an error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }); 




// route.get('/cand_leave_dashboard', redirectCandidate, async (req, res) => {
//   try {
//     let con=await connection()
//     let c_id = req.session.candidate_id;
//     let c_name=req.session.candidate_name
//     // let today_date1=today_date_1()
//     let status="approved"

//     let startDate=getCurrentMonthRange().startDate
//     let endDate=getCurrentMonthRange().endDate

//     let total_leave_qry=
//     `SELECT         
//         COUNT(candidate_id) AS total_emp_on_leave
//       FROM
//         leave_request
//       WHERE 
//         (
//           (from_date IS NOT NULL AND to_date IS NOT NULL AND
//             ? BETWEEN from_date AND to_date)
//           OR
//           (
//             (from_date IS NULL OR from_date = '') AND 
//             (to_date IS NULL OR to_date = '') AND 
//             multi_date LIKE CONCAT('%', ?, '%')
//           )
//         )    
//         AND
//           status=?
//         AND 
//           candidate_id=? 
          
//         `

//         con.query(total_leave_qry, [endDate, endDate,status,c_id], function(err, total_leave_count){

//           if(err) throw err;
//           console.log(total_leave_count,'total_leave_count')
          
//           res.render('candidate/cand_leave_dashboard', { role: 'Candidate', page: 'candidate_documents', c_id: req.session.candidate_id,c_name:c_name});

//         })

  

//   } catch (error) {
//     console.error('Caught an error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });




route.get('/mang_leave_dashboard', redirectmanager, async (req, res) => {
  try {
    let c_name=req.session.name


      res.render('manager/mang_leave_dashboard', { role: req.session.role, page: 'mang_leave_dashboard', EMP_CODE: req.session.emp_id,c_name:c_name});
  

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});

////////////////////work///////////////////////////////
////////////////////work///////////////////////////////
////////////////////work///////////////////////////////
////////////////////work///////////////////////////////

route.post('/request_assets', async (req, res) => {
  try {
    const con = await connection();
    const cand_id = req.session.candidate_id;
    const cand_name=req.session.candidate_name
    let {asset_type,mail_to,remarks,mail_cc_join}=req.body

    console.log(asset_type,mail_to,remarks,mail_cc_join,'asset_type,mail_to,remarks,mail_cc_join')

    let query=`INSERT INTO request_assets (candidate_id, candidate_name,asset_type, mail_to, mail_cc , req_remarks, status) VALUES (?,?,?,?,?,?,?)`
    con.query(query,[cand_id, cand_name,asset_type, mail_to, mail_cc_join, remarks, "Open"],function(err,result){
      if(err) throw err;

      res.send({status:"success", assets_req_id :result.insertId})
      // send mail
      request_assets_mail(result.insertId, cand_id, cand_name,asset_type, mail_to, mail_cc_join, remarks)
    })
  

  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});



async function request_assets_mail(assets_req_id,cand_id, cand_name,asset_type, mail_to, mail_cc_join, remarks) {

  
    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'hrm@manthanitsolutions.in',
        pass: 'Manthan@4321#'
      },
      debug: true
    });

  //   let transporter = nodemailer.createTransport({
  //     service:'gmail',
  //     auth: {
  //         user: 'vishal.manthanitsolutions@gmail.com',
  //         pass: 'yjal dkyp ncld juil'
  //     },
  //     tls: {
  //       rejectUnauthorized: false 
  //   }
      
  // });


    let mailOptions = {
      from: 'hrm@manthanitsolutions.in',
      to: mail_to,
      cc:mail_cc_join,
      subject: `${cand_id}:${cand_name}- Assets request`,
      html: `
      
      <div style="font-size: 13px; color:black;" >
      
        <div style="margin-bottom:10px;  color:black;"> 
          <span style="font-weight:bold;">${cand_name} </span> raised a request for assets.
        </div>

        <div style="font-weight: bold;"> Request ID - ${assets_req_id}</div>

        <div> 
          <span style="font-weight: bold;"> Assets Type </span>- ${asset_type}
        </div>
        
        <div > 
          <span style="font-weight: bold;"> Remarks </span>- ${remarks}
        </div>

      </div>

      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  
}
// async function request_assets_mail(assets_req_id,cand_id, cand_name,asset_type, mail_to, mail_cc_join, remarks) {

  


route.get('/request_assets_view',redirectmanager,async function(req,res){
  try{
    let con=await connection()
    let mail_id = req.session.manager_mail_id.trim();

    let query=`
    SELECT
      assets_req_id,
      candidate_id,
      candidate_name,
      asset_type,
      mail_to,
      mail_cc,
      req_remarks,
      DATE_FORMAT(req_date, '%d-%m-%Y %h:%i:%s %p') AS formated_req_date,
      reject_remarks,
      CASE 
        WHEN reject_remarks='' THEN '-'
        WHEN reject_remarks=NULL THEN '-'
        ELSE reject_remarks
      END AS reject_remarks,

      CASE 
        WHEN req_resolved_date = '0000-00-00 00:00:00' THEN '-' 
        ELSE DATE_FORMAT(req_resolved_date, '%d-%m-%Y %h:%i:%s %p') 
      END AS formated_req_resolved_date, 
      status
    FROM 
      request_assets
    WHERE 
      (
          mail_cc LIKE CONCAT('%', ?, '%')
          OR mail_to LIKE CONCAT('%', ?, '%')
        )  

    `
    con.query(query,[mail_id,mail_id],function(err,result){
      if(err) throw err;

      console.log(result,'result')

      res.render('manager/request_assets_view',{role: req.session.role, EMP_CODE: req.session.user_id, page:'manage_assets', data1:result })

    })

  }
  catch(err){
    console.log(err,'err')
  }
})




// assets_req_accecpt
route.post('/assets_req_accecpt', file.array('images', 5), async function(req, res) {
  try {
      console.log(req.body, "req.body");
      console.log(req.files, "req.files");

      let con = await connection();
      var cdate = getCurrentDateTime();
      var candidate_id = req.body.candidate_id;
      var asset_type = req.body.asset_type;
      var asset_brand = req.body.asset_brand;
      var asset_serial_no = req.body.asset_serial_no;
      var condition = req.body.condition;
      var assigned_by = req.body.assigned_by;
      var assets_req_id = req.body.assets_req_id;

      var img1 = req.files[0] ? req.files[0].filename : null;
      var img2 = req.files[1] ? req.files[1].filename : null;
      var img3 = req.files[2] ? req.files[2].filename : null;
      var img4 = req.files[3] ? req.files[3].filename : null;
      var img5 = req.files[4] ? req.files[4].filename : null;

      var query = 'INSERT INTO manage_assets(candidate_id, asset_type, asset_brand, asset_serial_no, condition_at_assingnment, assigned_by, assigned_date, img_1, img_2, img_3, img_4, img_5,type,status) VALUES ?';
      var values = [[candidate_id, asset_type, asset_brand, asset_serial_no, condition, assigned_by, cdate, img1, img2, img3, img4, img5,'assigned','default']];

      con.query(query, [values], (err, result) => {
          if(err) throw err;
          console.log(result.insertId,'result.insertId')

          let query2=`
            UPDATE request_assets SET 
              assets_id=?, status=?, req_resolved_date=?
            WHERE
              assets_req_id=?
          `

          con.query(query2,[result.insertId, 'Resolved',cdate,assets_req_id],function(err2,result2){
            if(err) throw err;
            res.send({status:"success"})

          })

      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


route.post('/assets_req_reject', async function(req, res) {
  try {
      
      let con = await connection();
      var cdate = getCurrentDateTime();
      let assets_req_id=req.body.assets_req_id
      let cadidate_id=req.body.cadidate_id
      let candidate_name=req.body.candidate_name
      let reason_for_rej=req.body.reason_for_rej
      let status="Rejected"

      let query=`
        UPDATE request_assets SET
          reject_remarks=?,
          status=?,
          req_resolved_date=?
        WHERE 
          assets_req_id=?	
      `

      con.query(query,[reason_for_rej,status,cdate,assets_req_id],function(err,result){
        if(err) throw err;
        // console.log('updated')
        res.send({status:"success"})        
      })
      
  } catch (err) {
      console.error(err);
  }
});






route.get('/view_request_assets', redirectCandidate, async function(req, res) {
  

    try {
        
      let con=await connection();
      let c_id = req.session.candidate_id;
  
      let qry=`
        SELECT
          assets_req_id,
          candidate_id,
          candidate_name,
          asset_type,
          mail_to,
          mail_cc,
          req_remarks,
          DATE_FORMAT(req_date, '%d-%m-%Y %H:%i:%s ') AS req_date,
          status,

          CASE 
            WHEN reject_remarks='' THEN '-'
            WHEN reject_remarks=NULL THEN '-'
            ELSE reject_remarks
          END AS reject_remarks,

          CASE 
            WHEN req_resolved_date = '0000-00-00 00:00:00' THEN '-' 
            ELSE DATE_FORMAT(req_resolved_date, '%d-%m-%Y %h:%i:%s %p') 
          END AS req_resolved_date 
          
        FROM 
          request_assets
        WHERE 
          candidate_id=?          
          `
      con.query(qry,[c_id],(err,result)=>{
        if(err)throw err;
        console.log(result,'dddd')
        res.render('candidate/view_request_assets' ,{  role:'CANDIDATE' ,   page: "candidate_documents",c_id:req.session.candidate_id, data1:result })
      })
    } catch (error) {
      console.error("Error:", error);
      
    }
  
});


route.post('/mail_cc', async (req, res) => {
  try {
    const con = await connection();
    const c_id = req.session.candidate_id;

    const qry = 'SELECT rep_senior_1_email, rep_senior_2_email, rep_senior_3_email, rep_senior_4_email FROM candidate_login WHERE candidate_id = ?';
    con.query(qry, [c_id], (err, result) => {
      if (err) throw err;

      const emails = result[0];
      const emailArray = Object.values(emails).filter(email => email !== null);

      res.json(emailArray);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});




////////////////////work///////////////////////////////
////////////////////work^^^^^^^^^^^^^////////////////
////////////////////work///////////////////////////////

function getCurrentDayMonth() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

route.post('/celebration_bday', async (req, res) => {
  try {
    const currentDayMonth = getCurrentDayMonth();
    const con = await connection();

    let qry = `
      SELECT candidate_name, date_of_birth AS birthdate
      FROM candidate_login
      WHERE DATE_FORMAT(date_of_birth, '%m-%d') = ?
      UNION
      SELECT Emp_Name AS candidate_name, BIRTHDATE AS birthdate
      FROM employee_master
      WHERE DATE_FORMAT(BIRTHDATE, '%m-%d') = ?
      UNION
      SELECT EMP_NAME AS candidate_name, date_of_birth AS birthdate
      FROM hrm_user_login
      WHERE DATE_FORMAT(date_of_birth, '%m-%d') = ?`;

    con.query(qry, [currentDayMonth, currentDayMonth, currentDayMonth], (err, result) => {
      con.end();

      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Query execution error');
      }

      if (result.length > 0) {
        const formattedResult = result.map(row => {
          return {
            candidate_name: row.candidate_name,
            day: moment(row.birthdate).format('DD'),
            month: moment(row.birthdate).format('MMM')
          };
        });
        res.status(200).json(formattedResult);
        console.log(formattedResult);
      } else {
        res.status(404).send('No records found');
      }
    });

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});



route.post('/celebration_anniversary', async (req, res) => {
  try {
    const currentDayMonth = getCurrentDayMonth();
    const con = await connection();

    let qry = `
      SELECT candidate_name, date_of_joining AS joining_date
      FROM candidate_login
      WHERE DATE_FORMAT(date_of_joining, '%m-%d') = ?
      UNION
      SELECT EMP_NAME AS candidate_name, date_of_joining AS joining_date
      FROM hrm_user_login
      WHERE DATE_FORMAT(date_of_joining, '%m-%d') = ?
      UNION
      SELECT Emp_Name AS candidate_name, joining_date
      FROM employee_master
      WHERE DATE_FORMAT(joining_date, '%m-%d') = ?`;

    con.query(qry, [currentDayMonth, currentDayMonth, currentDayMonth], (err, result) => {
      con.end();

      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Query execution error');
      }

      if (result.length > 0) {
        const formattedResult = result.map(row => {
          return {
            candidate_name: row.candidate_name,
            day: moment(row.joining_date).format('DD'),
            month: moment(row.joining_date).format('MMM')
          };
        });
        res.status(200).json(formattedResult);
        console.log(formattedResult);
      } else {
        res.status(404).send('No records found');
      }
    });

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});




// Ramkesh Resignation--------------------------------------------------->





route.get('/admin_resignation', redirectLogin, async (req, res) => {

  var  role= req.session.role
   try {
 
     // Establishing connection
     const con = await connection();
 
 
     const sql = `
     SELECT 
         resignation_id, 
         candidate_id, 
         candidate_name,
         candidate_mail, 
         candidate_reason, 
         candidate_attachment,
         status,
         DATE_FORMAT(resignation_date, '%Y-%m-%d %H:%i:%s') AS resignation_date,
         DATE_FORMAT(accept_reject_date, '%Y-%m-%d %H:%i:%s') AS accept_reject_date,
         accept_reject_by 
     FROM 
         resignation 
   
 `;
 
 
 
       // Executing the second query to fetch resignation details
       con.query(sql, (error, result) => {
         if (error) {
           console.error('Error executing query:', error);
           con.end(); // Close connection on error
           return res.status(500).send('Internal Server Error');
         }
 
         // If resignation details are fetched successfully
         const resignationData = result; 
         // Assuming there's only one resignation row
         console.log(resignationData,"resignationDataiuigsdfsduy")
 
         // Render the EJS template with fetched data
         res.render('admin/admin_resignation', {
           page:'admin_resignation',
           role: req.session.role,
            EMP_CODE: req.session.user_id,
            resignationData:resignationData
      
         });
 
         // Close connection after rendering
         con.end();
       });
     }
 
    catch (error) {
     console.error('Caught an error:', error);
     res.status(500).send('Internal Server Error');
   }
 })
 
 
 
 
 route.get('/manager_resignation', redirectmanager, async (req, res) => {
 
   var  role= req.session.role
    try {
  
      // Establishing connection
      const con = await connection();
  
  
      const sql = `
      SELECT 
          resignation_id, 
          candidate_id, 
          candidate_name, 
          candidate_mail,
          candidate_reason, 
          candidate_attachment,
          status,
          DATE_FORMAT(resignation_date, '%Y-%m-%d %H:%i:%s') AS resignation_date,
          DATE_FORMAT(accept_reject_date, '%Y-%m-%d %H:%i:%s') AS accept_reject_date,
          accept_reject_by 
      FROM 
          resignation 
    
  `;
  
  
  
        // Executing the second query to fetch resignation details
        con.query(sql, (error, result) => {
          if (error) {
            console.error('Error executing query:', error);
            con.end(); // Close connection on error
            return res.status(500).send('Internal Server Error');
          }
  
          // If resignation details are fetched successfully
          const resignationData = result; 
          // Assuming there's only one resignation row
          console.log(resignationData,"resignationDataiuigsdfsduy")
  
          // Render the EJS template with fetched data
          res.render('manager/manager_resignation', {
           page:'manager_resignation',
            role: req.session.role,
             EMP_CODE: req.session.user_id,
             resignationData:resignationData
       
          });
  
          // Close connection after rendering
          con.end();
        });
      }
  
     catch (error) {
      console.error('Caught an error:', error);
      res.status(500).send('Internal Server Error');
    }
  })
 
 
 
  route.post('/accept' ,async (req,res)=>{
   const { resignation_id,candidate_id, candidate_name, candidate_reason,candidate_mail } = req.body;
   console.log('accpettttt')
 let id
 let full_name
 
   if( req.session.role=='MANAGER' ){
     var manager_id= req.session.emp_id
     var manager_name= req.session.name
 
 console.log('dikeuguifg')
     id=manager_id    
     name_1=manager_name
     
     full_name=name_1
 
   }
   else{
     var admin_id= req.session.user_id
     var admin_name= req.session.name
 
   console.log('lastgdidfbu')
     id=admin_id   
     name_1=admin_name
     
     full_name=name_1
   }
 
   console.log(id,'id_id')
   console.log(full_name,'full_name')
 
   var conn= await  connection()
 
 
 
 
 
   const sql = `
   UPDATE resignation 
   SET status = ?, 
       accept_reject_date = ?, 
       accept_reject_by = ? 
   WHERE resignation_id = ?
 `;
 
 
 const currentDate = new Date().toISOString().slice(0, 10);
 const currentTime = new Date().toLocaleString().slice(10, 18);
 const acceptRejectDateTime = currentDate + ' ' + currentTime;
 
 conn.query(sql,["Approved",currentDate,full_name,resignation_id], (error, result)=>{
   if(error){
     console.log(error,'error')
     res.send('error')
   }
   else{


    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'hrm@manthanitsolutions.in',
        pass: 'Manthan@4321#'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Create dynamic email template
    let mailOptions = {
      from: 'hrm@manthanitsolutions.in',
      to: candidate_mail,
      subject: `Resignation Letter Accepted`,
      html: `
<p>Dear ${candidate_name}</p>
    <p>Your resignation request id:${resignation_id} has been accepted</p>

    <p>Thank you,</p>
    <p>${full_name}</p>
      `,
    };



    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
        res.status(500).send("Error occurred");
        return;
      }

      console.log('Email sent: ' + info.response);
      res.send("success")
      con.end();
    });



   }
 
 })
 
 
 
  })
 
 
  route.post('/reject' ,async (req,res)=>{
   const { resignation_id,candidate_id, candidate_name, candidate_reason,candidate_mail } = req.body;
   console.log('hitttt')
 let id
 let full_name
 
   if( req.session.role=='MANAGER' ){
     var manager_id= req.session.emp_id
     var manager_name= req.session.name
 
 console.log('dikeuguifg')
     id=manager_id    
     name_1=manager_name
     
     full_name=name_1
 
   }
   else{
     var admin_id= req.session.user_id
     var admin_name= req.session.name
 
   console.log('lastgdidfbu')
     id=admin_id   
     name_1=admin_name
     
     full_name=name_1
   }
 
   console.log(id,'id_id')
   console.log(full_name,'full_name')
 
   var conn= await  connection()
 
 
 
 
 
   const sql = `
   UPDATE resignation 
   SET status = ?, 
       accept_reject_date = ?, 
       accept_reject_by = ? 
   WHERE resignation_id = ?
 `;
 
 
 const currentDate = new Date().toISOString().slice(0, 10);
 const currentTime = new Date().toLocaleString().slice(10, 18);
 const acceptRejectDateTime = currentDate + ' ' + currentTime;
 
 conn.query(sql,["Reject",currentDate,full_name,resignation_id], (error, result)=>{
   if(error){
     console.log(error,'error')
     res.send('error')
   }
   else{


    let transporter = nodemailer.createTransport({
      host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'hrm@manthanitsolutions.in',
        pass: 'Manthan@4321#'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Create dynamic email template
    let mailOptions = {
      from: 'hrm@manthanitsolutions.in',
      to: candidate_mail,
      subject: `Resignation Letter Rejected`,
      html: `
<p>Dear ${candidate_name}</p>
    <p>Your resignation request id:${resignation_id} has been rejected</p>

    <p>Thank you,</p>
    <p>${full_name}</p>
      `,
    };



    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
        res.status(500).send("Error occurred");
        return;
      }

      console.log('Email sent: ' + info.response);
      res.send("success")
      con.end();
    });



   }
 
 })
 
 
 
  })
 
 
 
  route.post('/resignation', upload.single('candidate_attachment'), async (req, res) => {
    const { candidate_id, candidate_name, candidate_reason, rep_manager_email, rep_sr_email } = req.body;
    const candidate_attachment = req.file;
    const candidate_mail=req.session.candidate_email
  
    console.log(rep_sr_email, 'rep_sr_email');
    console.log(rep_manager_email, 'rep_manager_email');
  
    var con = await connection();
    if (!candidate_id || !candidate_name || !candidate_reason) {
      return res.status(400).send('All fields are required.');
    }
  
    // Insert into MySQL database
    const candidateAttachmentFilename = candidate_attachment ? candidate_attachment.filename : null;
    const query = 'INSERT INTO resignation(candidate_id, candidate_name,candidate_mail, candidate_reason, candidate_attachment) VALUES (?, ?, ?, ?,?)';
    con.query(query, [candidate_id, candidate_name,candidate_mail, candidate_reason, candidateAttachmentFilename], (error, results, fields) => {
      if (error) {
        console.error('Error inserting into database:', error);
        return res.status(500).send('error');
      }
  
      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: 'hrm@manthanitsolutions.in',
          pass: 'Manthan@4321#'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
  
      // Create dynamic email template
      let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: rep_manager_email,
        subject: `Resignation Letter from ${candidate_name}`,
        html: `
 <p>Dear Sir/Mam,</p>
      <p>I would like to inform you that I, ${candidate_name} (ID: ${candidate_id}), have decided to resign from my position at ManthanIT Solutions for the following reason:</p>
      <p><strong>Reason:</strong> ${candidate_reason}</p>
      <p>Thank you,</p>
      <p>${candidate_name}</p>
        `,
        attachments: []
      };
  
      if (req.file) {
        mailOptions.attachments.push({
          filename: req.file.originalname,
          path: req.file.path
        });
      }
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          res.status(500).send("Error occurred");
          return;
        }
  
        console.log('Email sent: ' + info.response);
        res.status(200).send('success');
        con.end();
      });
    });
  });
 


 route.get('/resignation', redirectCandidate, async (req, res) => {
  try {
    const c_id = req.session.candidate_id;

    // Establishing connection
    const con = await connection();

    // Query to fetch candidate details
    const qry = 'SELECT candidate_id, candidate_name,rep_manager_email,rep_senior_1_email,rep_senior_2_email,rep_senior_3_email,rep_senior_4_email FROM candidate_login WHERE candidate_id = ?';

    // Query to fetch resignation details
    const sql = `
    SELECT 
        resignation_id, 
        candidate_id, 
        candidate_name, 
        candidate_reason, 
        candidate_attachment,
        status,
        DATE_FORMAT(resignation_date, '%Y-%m-%d %H:%i:%s') AS resignation_date,
        DATE_FORMAT(accept_reject_date, '%Y-%m-%d %H:%i:%s') AS accept_reject_date,
        accept_reject_by 
    FROM 
        resignation 
    WHERE 
        candidate_id = ?
`;


  
    // Executing the first query to fetch candidate details
    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        con.end(); // Close connection on error
        return res.status(500).send('Internal Server Error');
      }

      // If candidate details are fetched successfully
      const candidateData = results[0]; // Assuming there's only one candidate row
console.log(candidateData)
      // Executing the second query to fetch resignation details
      con.query(sql, [c_id], (error, result) => {
        if (error) {
          console.error('Error executing query:', error);
          con.end(); // Close connection on error
          return res.status(500).send('Internal Server Error');
        }

        // If resignation details are fetched successfully
        const resignationData = result; 
        // Assuming there's only one resignation row
        // console.log(resignationData,"resignationDataiuigsdfsduy")

        // Render the EJS template with fetched data
        res.render('candidate/resignation', {
          role: 'Candidate',
          page: 'candidate_documents',
          c_id: req.session.candidate_id,
          data: candidateData,
          resignationData: resignationData
        });

        // Close connection after rendering
        con.end();
      });
    });

  } catch (error) {
    console.error('Caught an error:', error);
    res.status(500).send('Internal Server Error');
  }
});









// Ramkesh Resignation---------------------------------------------------/>






route.get('/annoucement_add',redirectLogin,async(req,res)=>{
  try {


    let con=await connection()

    let qry=`SELECT * FROM announcement`
    con.query(qry,(err,result)=>{
      if(err)throw err;
      res.render('admin/annoucement_add', {
        page:'annoucement_add',
        role: req.session.role,
         EMP_CODE: req.session.user_id,
         data:result
   
      });
    })



    
  } catch (error) {
    console.log(error);
  }
})


route.post('/annoucement_add', async (req, res) => {
  try {
    let con = await connection();
    let { from_date, to_date, annoucement } = req.body;
let cuurentDatetime=getCurrentDateTime()
    console.log(req.body);

    let qry = `INSERT INTO announcement(from_date, to_date, announcement,date_of_add) VALUES (?, ?, ?,?)`;
    con.query(qry, [from_date, to_date, annoucement,cuurentDatetime], (err, result) => {
      if (err) throw err;
      res.json({ success:'Announcement added successfully'});
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});


route.delete('/announcement_delete', async (req, res) => {
  try {
      let { announcement_id } = req.body;
      let con = await connection();

      let qry = 'DELETE FROM announcement WHERE announcement_id = ?';
      con.query(qry, [announcement_id], (err, result) => {
          if (err) {
              console.error('Error deleting announcement:', err);
          }
          res.json({success: 'Announcement deleted successfully'});
        con.end();
      });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
});


route.post('/announcement_view', async (req, res) => {
  try {
    let con = await connection();
    let currentDate = getCurrentDateTime();
    
    let datePart = currentDate.split(' ')[0];
    console.log('Date:', datePart);

    let qry = `
      SELECT * 
      FROM announcement 
      WHERE ? BETWEEN from_date AND to_date
      OR from_date = ?
      AND to_date = ?
    `;

    con.query(qry, [datePart, datePart, datePart], async (err, results) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
      con.end();
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});












route.get('/admin_leave_dashboard', redirectLogin, (req, res) => {
  try {
    let user_name=req.session.name

    res.render('admin/admin_leave_dashboard', { EMP_CODE: req.session.user_id, role: req.session.role, page: 'employee_master', user_name:user_name })

  } catch (error) {
    console.log(error)
  }
})


route.get('/wfh_request',redirectCandidate,async(req,res)=>{
  try {
    
    let c_id = req.session.candidate_id;
    let con=await connection();

    let qry=`SELECT rep_manager_name,rep_manager_email FROM candidate_login WHERE candidate_id=?`
    con.query(qry,[c_id],(err,result)=>{
      if(err)throw err;
      con.end()
      res.render('candidate/wfh_request' ,{ role: 'Candidate', page: "candidate_documents",c_id:req.session.candidate_id,data:result[0] })
    })
  } catch (error) {
    
  }
})




route.post("/wfh_request", file.single("attachment"), async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let con = await connection();
    let c_id = req.session.candidate_id;
    let c_name = req.session.candidate_name;
    let c_email = req.session.candidate_email;

    let from_date = req.body.datefrom ? moment(req.body.datefrom, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_from_date = from_date ? moment(from_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    let to_date = req.body.dateto ? moment(req.body.dateto, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_to_date = to_date ? moment(to_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;

    let from_dates_input = req.body.datesfrom ? req.body.datesfrom.split(', ') : [];
    let from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      let formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return `${formattedDate}:${dayType.trim()}`;
    });

    let formatted_from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      return `${dateString.trim()} (${dayType.trim()})`;
    });

    let attachment = req.file ? req.file.filename : null;
    let currentDate = getCurrentDateTime();

    let no_of_days = from_dates.length > 0 && !from_date ? from_dates.length : req.body.no_of_days;

    let mailContent;
    if (from_dates.length > 0 && !from_date) {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          I would like to request work from home on the following dates:<br>
          ${formatted_from_dates.join('<br>')}<br><br>
          Reason : ${req.body.reason}<br><br>
          Please review and approve my work from home request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    } else {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          ${formatted_from_date === formatted_to_date ? `
            I would like to request a ${req.body.day_type === 'Half day' ? `${req.body.half_day_type} half day ` : 'full day'} work from home request on ${formatted_from_date}.<br><br>
          ` : `
            I would like to request a work from home from ${formatted_from_date} to ${formatted_to_date}.<br><br>
          `}
          Reason: ${req.body.reason}<br><br>
          Please review and approve my work from home request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    }

    console.log("From dates:", from_dates); 

    con.query(`INSERT INTO work_from_home_request (candidate_id, candidate_name,candidate_mail, from_date, to_date, multi_date, no_of_days, leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave, status, leave_req_sent_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      c_id,
      c_name,
      c_email,
      from_date,
      to_date,
      from_dates.join(','), 
      no_of_days,
      req.body.leave_type,
      req.body.day_type,
      req.body.half_day_type,
      req.body.mail_to,
      req.body.mailCC,
      attachment,
      req.body.reason,
      'pending',
      currentDate
    ],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).send("Error occurred");
        return;
      }

      con.query(`SELECT request_id FROM work_from_home_request ORDER BY request_id DESC LIMIT 1`, (err, idResult) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send("Error occurred");
          return;
        }

        let latestId = idResult[0].request_id;

        console.log(req.body.mailCC)

        let transporter = nodemailer.createTransport({
          host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'hrm@manthanitsolutions.in',
              pass: 'Manthan@4321#'
          },
          tls: {
            rejectUnauthorized: false }
          // debug: true
      });

        let mailOptions = {
          from: 'hrm@manthanitsolutions.in',
          to: req.body.mail_to,
          subject: `Work From Home Request : ${req.body.leave_type}`,
          html: mailContent,
          attachments: []
        };

        if (req.body.mailCC) {
          mailOptions.cc = req.body.mailCC;
      }
        if (req.file) {
          mailOptions.attachments.push({
            filename: req.file.originalname,
            path: req.file.path
          });
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email: ', error);
            res.status(500).send("Error occurred");
            return;
          }

          console.log('Email sent: ' + info.response);
          res.json({ success: latestId });
          con.end()
        });
      });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send("Error occurred");
  }
});




route.get('/wfh_request_view',redirectCandidate, async (req, res) => {
  try {
    let c_id = req.session.candidate_id;
    let con = await connection();

    let qry = `SELECT request_id, from_date, to_date, multi_date, no_of_days, leave_type, 
                      leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by 
               FROM work_from_home_request WHERE candidate_id=${c_id}`;

    con.query(qry, (err, results) => {
      if (err) throw err;

      // Format dates and multi_date
      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      console.log(results);


      con.end()
      res.render('candidate/wfh_request_view', { 
        role: 'Candidate', 
        page: 'candidate_documents',
        c_id: req.session.candidate_id,
        data: results 
      });
    });

  } catch (error) {
    console.log(error);
    // Handle error appropriately
  }
});

route.post('/cancel_wfh_request', async (req, res) => {
  try {
    const con = await connection();
    const requestId = req.body.requestId;

    const qry = `UPDATE work_from_home_request SET status = ? WHERE request_id = ?`;

    con.query(qry, ['cancelled', requestId], (err, result) => {
      if (err) {
        console.error('SQL query error:', err);
        
      }


      res.json({ success: true, message: 'Request cancelled successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



route.get('/manager_wfh_request', redirectmanager, async (req, res) => {
  try {
    let man_id = req.session.manager_mail_id;
    console.log(man_id);

    let con = await connection();
    let qry = 'SELECT Sup_EMAIL_ADDR FROM employee_master WHERE EMP_Email = ?';

    con.query(qry, [man_id], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      console.log(results);
      con.end()
        res.render('manager/manager_wfh_request', {
          role: req.session.role,
          EMP_CODE: req.session.user_id,
          page: 'to_do_list',
          supervisorEmail:results[0].Sup_EMAIL_ADDR
        });
     
    });

  } catch (error) {
    console.error('Error in /manager_wfh_request route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.post("/manager_wfh_request", file.single("attachment"), async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let con = await connection();
    let c_id = req.session.emp_id;
    let c_name = req.session.name;
    let m_email = req.session.manager_mail_id

    let from_date = req.body.datefrom ? moment(req.body.datefrom, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_from_date = from_date ? moment(from_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;
    let to_date = req.body.dateto ? moment(req.body.dateto, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;
    let formatted_to_date = to_date ? moment(to_date, 'YYYY-MM-DD').format('DD-MM-YYYY') : null;

    let from_dates_input = req.body.datesfrom ? req.body.datesfrom.split(', ') : [];
    let from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      let formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
      return `${formattedDate}:${dayType.trim()}`;
    });

    let formatted_from_dates = from_dates_input.map(date => {
      let [dateString, dayType] = date.split(':');
      return `${dateString.trim()} (${dayType.trim()})`;
    });

    let attachment = req.file ? req.file.filename : null;
    let currentDate = getCurrentDateTime();

    let no_of_days = from_dates.length > 0 && !from_date ? from_dates.length : req.body.no_of_days;

    let mailContent;
    if (from_dates.length > 0 && !from_date) {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          I would like to request work from home  on the following dates:<br>
          ${formatted_from_dates.join('<br>')}<br><br>
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my work from home  request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    } else {
      mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear Sir/Mam,<br><br>
          ${formatted_from_date === formatted_to_date ? `
            I would like to request a ${req.body.day_type === 'Half day' ? `${req.body.half_day_type} half day ` : 'full day'} work from home request on ${formatted_from_date}.<br><br>
          ` : `
            I would like to request a work from home from ${formatted_from_date} to ${formatted_to_date}.<br><br>
          `}
          Reason for leave: ${req.body.reason}<br><br>
          Please review and approve my leave request.
          Thank you.<br><br>
          Regards,<br>
          ${c_name}<br>
          Emp Code: ${c_id}<br><br>
        </p>
      `;
    }

    console.log("From dates:", from_dates); 

    con.query(`INSERT INTO work_from_home_request (candidate_id, candidate_name,candidate_mail, from_date, to_date, multi_date, no_of_days, leave_type, day_type, half_day_type, mail_to, mail_cc, attachment, reason_for_leave, status, leave_req_sent_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      c_id,
      c_name,
      m_email,
      from_date,
      to_date,
      from_dates.join(','), 
      no_of_days,
      req.body.leave_type,
      req.body.day_type,
      req.body.half_day_type,
      req.body.mail_to,
      req.body.mailCC,
      attachment,
      req.body.reason,
      'pending',
      currentDate
    ],
    (error, result) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).send("Error occurred");
        return;
      }

      con.query(`SELECT request_id FROM work_from_home_request ORDER BY request_id DESC LIMIT 1`, (err, idResult) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send("Error occurred");
          return;
        }

        let latestId = idResult[0].request_id;

        console.log(req.body.mailCC)

        let transporter = nodemailer.createTransport({
          host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'hrm@manthanitsolutions.in',
              pass: 'Manthan@4321#'
          },
          debug: true
      });

        let mailOptions = {
          from: 'hrm@manthanitsolutions.in',
          to: req.body.mail_to,
          subject: `Work From Home Request : ${req.body.leave_type}`,
          html: mailContent,
          attachments: []
        };

        if (req.body.mailCC) {
          mailOptions.cc = req.body.mailCC;
      }
        if (req.file) {
          mailOptions.attachments.push({
            filename: req.file.originalname,
            path: req.file.path
          });
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email: ', error);
            res.status(500).send("Error occurred");
            return;
          }

          console.log('Email sent: ' + info.response);
          res.json({ success: latestId });
          con.end()
        });
      });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).send("Error occurred");
  }
});



route.get('/manager_wfh_request_view', redirectmanager, async (req, res) => {
  try {
    let c_id = req.session.emp_id;
    let con = await connection();

    let qry = `SELECT request_id, from_date, to_date, multi_date, no_of_days, leave_type, 
                      leave_req_sent_date, status, accept_reject_date, remarks, accept_reject_by 
               FROM work_from_home_request WHERE candidate_id = ?`;

    con.query(qry, [c_id], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      results = results.map(result => ({
        ...result,
        from_date: result.from_date ? formatDate(result.from_date) : 'N/A',
        to_date: result.to_date ? formatDate(result.to_date) : 'N/A',
        leave_req_sent_date: result.leave_req_sent_date ? formatDateTime(result.leave_req_sent_date) : 'N/A',
        accept_reject_date: result.accept_reject_date ? formatDateTime(result.accept_reject_date) : 'N/A',
        multi_date: formatMultiDate(result.multi_date)
      }));

      console.log(results);
con.end()
      res.render('manager/manager_wfh_request_view', { 
        role: req.session.role,
        EMP_CODE: req.session.user_id,
        page: 'to_do_list',
        data: results 
      });
    });

  } catch (error) {
    console.error('Error in /manager_wfh_request_view route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






route.get('/manage_wfh_req', redirectmanager, async function(req, res) {
  try {
    let man_id = req.session.manager_mail_id.trim();
    console.log(man_id, 'man_id');

    let con = await connection();

    let sql = `
      SELECT
        request_id,
        candidate_id,
        leave_type,
        no_of_days,
        candidate_name
      FROM
        work_from_home_request
      WHERE
        status = ?
        AND (
          mail_cc LIKE CONCAT('%', ?, '%')
          OR mail_to LIKE CONCAT('%', ?, '%')
        )
    `;

    console.log('SQL Query:', sql);
    console.log('Query Parameters:', ['pending']);

    con.query(sql, ['pending', man_id, man_id], function(err, result) {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      console.log(result, 'result');

      if (result.length === 0) {
        console.log('No matching records found.');
      }


      con.end()
      res.render('manager/manage_wfh_req', { 
        role: req.session.role, 
        EMP_CODE: req.session.user_id, 
        page: 'to_do_list', 
        data1: result 
      });
    });
  } catch (err) {
    console.error('Error in /manage_wfh_req route:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/manage_wfh_req_view/:candidate_id/:request_id',redirectmanager,async function(req,res){
  try{

    let m_name=req.session.name
    console.log(m_name,'mname')

    let con=await connection()
    let candidate_id=req.params.candidate_id
    console.log(candidate_id,'candidate_id')
    
    let request_id=req.params.request_id
    console.log(request_id,'request_id')
    
    let sql=`
      SELECT
        request_id,
        candidate_id,
        DATE_FORMAT(from_date,'%d-%m-%Y') AS from_date_formated,
        DATE_FORMAT(to_date, '%d-%m-%Y') AS to_date_formated,
        multi_date,
        no_of_days,
        leave_type,
        day_type,
        half_day_type,
        mail_to,
        mail_cc,
        attachment,
        reason_for_leave,
        status,
        candidate_name,
        candidate_mail as candidate_email
      FROM
        leave_request
      WHERE
        request_id = ? 
      `

      con.query(sql,[request_id],function(err,result){
        if(err) throw err;
        console.log(result,'result_23233')
        
      res.render('manager/manage_wfh_req_view',{role: req.session.role, EMP_CODE: req.session.user_id, page:'to_do_list_view', data1:result})
      })


  }
  catch(err){
    console.log(err,'err')
  }
})




route.post('/reject_wfh_id_status_update', async function(req, res) {
  try {
    let con = await connection();
    let date = getCurrentDateTime();

    let m_name=req.session.name
    let { candidate_id, request_id, remarks, cand_email, candidate_name } = req.body;

    console.log(candidate_id, 'candidate_id');
    console.log(request_id, 'request_id');
    console.log(remarks, 'remarks');

    let mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear ${candidate_name},<br><br>
          Your work from home request with Request ID: ${request_id} has been rejected.<br><br>
          Remarks: ${remarks}<br><br>
          Thank you.<br><br>
          Regards,<br>
          ${m_name}
        </p>
      `;

    let sql = `UPDATE work_from_home_request SET accept_reject_date=?, remarks=?, status=?,accept_reject_by=? WHERE request_id=?`;

    con.query(sql, [date, remarks, 'rejected',m_name,request_id], function(err, result) {
      if (err) throw err;

      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'hrm@manthanitsolutions.in',
            pass: 'Manthan@4321#'
        },
        debug: true
    });

      let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: cand_email,
        subject: `Work From Home Request Rejected - Request ID: ${request_id}`,
        html: mailContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          res.status(500).send('Error occurred');
          return;
        }

        console.log('Email sent: ' + info.response);
        res.send('success');
      });
    });
  } catch (err) {
    console.log(err, 'err');
    res.status(500).send('Error occurred');
  }
});



route.post('/approved_wfh_status_update', async function(req, res) {
  try {
    let con = await connection();
    let date = getCurrentDateTime();

    let m_name=req.session.name

    let { candidate_id, request_id, remarks, cand_email, candidate_name } = req.body;

    console.log(candidate_id, 'candidate_id');
    console.log(request_id, 'request_id');
    console.log(remarks, 'remarks');

    let mailContent = `
        <p style="color: black; font-size: 13px;">
          Dear ${candidate_name},<br><br>
          Your work from home request with Request ID: ${request_id} has been approved.<br><br>
          Remarks: ${remarks}<br><br>
          Thank you.<br><br>
          Regards,<br>
          ${m_name}
        </p>
      `;

    let sql = `UPDATE work_from_home_request SET accept_reject_date=?, remarks=?, status=?,accept_reject_by=? WHERE request_id=?`;

    con.query(sql, [date, remarks, 'approved',m_name, request_id], function(err, result) {
      if (err) throw err;

      let transporter = nodemailer.createTransport({
        host: 'sg2plcpnl0069.prod.sin2.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: 'hrm@manthanitsolutions.in',
            pass: 'Manthan@4321#'
        },
        tls: {
          rejectUnauthorized: false }
        // debug: true
    });

      let mailOptions = {
        from: 'hrm@manthanitsolutions.in',
        to: cand_email,
        subject: `Work From Home Request Approved - Request ID: ${request_id}`,
        html: mailContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          res.status(500).send('Error occurred');
          return;
        }

        console.log('Email sent: ' + info.response);
        res.send('success');
      });
    });
  } catch (err) {
    console.log(err, 'err');
    res.status(500).send('Error occurred');
  }
});




route.get('/admin_manage_wfh', redirectLogin, async function(req, res) {
  try {
    let man_id = req.session.admin_mail?.trim();

    console.log(man_id, 'ddf');

    let con = await connection();

    let sql = `
      SELECT
    *
      FROM
        work_from_home_request
      WHERE
        status = ?
    `;


    con.query(sql, ['pending'], function(err, result) {
      if (err) {
        console.error('SQL query error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (result.length === 0) {
        console.log('No matching records found.');
      } else {
        // console.log(result, 'result_23233');
      }


      con.end()
      res.render('admin/admin_manage_wfh', {
        EMP_CODE: req.session.user_id,
        role: req.session.role,
        page: 'today_emp_on_leave',
        data1: result
      });
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/admin_manage_wfh_view/:candidate_id/:request_id', redirectLogin, async function(req, res) {
  try {
    let m_name = req.session.name;
    console.log(m_name, 'mname');

    let con = await connection();
    let candidate_id = req.params.candidate_id;
    console.log(candidate_id, 'candidate_id');

    let request_id = req.params.request_id;
    console.log(request_id, 'request_id');

    let sql = `
      SELECT
        request_id,
        candidate_id,
        DATE_FORMAT(from_date, '%d-%m-%Y') AS from_date_formated,
        DATE_FORMAT(to_date, '%d-%m-%Y') AS to_date_formated,
        multi_date,
        no_of_days,
        leave_type,
        day_type,
        half_day_type,
        mail_to,
        mail_cc,
        attachment,
        reason_for_leave,
        status,
        candidate_name,  
        candidate_mail AS candidate_email
      FROM
        work_from_home_request
      WHERE
        request_id = ? AND candidate_id = ?
    `;

    con.query(sql, [request_id, candidate_id], function(err, result) {
      if (err) throw err;
      // console.log(result, 'result_23233');


      con.end()
      res.render('admin/admin_manage_wfh_view', {
        EMP_CODE: req.session.user_id,
        role: req.session.role,
        page: 'today_emp_on_leave',
        data1: result
      });
    });
  } catch (err) {
    console.log(err, 'err');
  }
});












module.exports = route;