
$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
        dateFormat: "dd-mm-yy",
    });
});


$(document).on("focus", ".datepicker2", function () {
    $(this).datepicker({
        dateFormat: "yy",
    });
});


$(document).on('click','#candidate_image',function(){
    $('#candidate_image_input').click()

    
})




// ---------------------candidate_image js start--------------------- 
// ---------------------candidate_image js start--------------------- 
$(document).on('change','#candidate_image_input',function(){
    let candidate_image=$('#candidate_image_input')[0].files[0]
        
    let reader=new FileReader()
        reader.onload=function(e){
            $('#candidate_image').removeClass('p-3')
            $('#candidate_image').attr('src','')
            $('#candidate_image').attr('src',e.target.result)            
        }
        reader.readAsDataURL(candidate_image)
    
})
// ---------------------candidate_image js end--------------------- 
// ---------------------candidate_image js end--------------------- 





// ------------family_detl_tbl js start---------------
// ------------family_detl_tbl js start---------------


function updateSerialNumbers() {
    $("#family_detl_tbl tbody tr").each(function(index) {
        $(this).find('td').eq(0).text(index + 1);
    });
}

$(document).on("click", "#family_detl_btn", function () {
    let lastIndex = $("#family_detl_tbl tbody tr").length;
    let newIndex = lastIndex + 1;
    $("#family_detl_tbl tbody").append(
        `
        <tr>
            <td>${newIndex}</td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Name....">
            </td>
            <td>
                <input type="date" class="f_13 datepicker1" placeholder="Enter Date Of Birth....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Relationship....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Occupation....">
            </td>
            <td>
                <i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i>
            </td>
        </tr>
        `
    );
});


function formatDate(dateString) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
}

 // Submit form
 $(document).on("click", "#familyForm", function () {
    let familyData = [];
    $("#family_detl_tbl tbody tr").each(function () {
        let row = $(this);
        let rowData = {
            name: row.find("input[placeholder='Enter Name....']").val(),
            dob: formatDate(row.find("input[placeholder='Enter Date Of Birth....']").val()),
            relationship: row.find("input[placeholder='Enter Relationship....']").val(),
            occupation: row.find("input[placeholder='Enter Occupation....']").val()
        };
        console.log(familyData,'sugdugsudg')
        familyData.push(rowData);
    });

    $.ajax({
        url: '/submit-family-details',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ familyData: familyData }),
        success: function (res) {
            if (res == "success") {
                Swal.fire({
                    title: "Successful!",
                    text: "Data Successfully Inserted",
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Data Insertion Failed",
                    icon: "error"
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Error",
                text: "An error occurred during the request",
                icon: "error"
            });
        }
    })})

$(document).on("click", "#family_detl_tbl tbody tr td:nth-child(6) #delete_btn", function(){
    $(this).closest('tr').remove();
    updateSerialNumbers(); 
});

// ------------family_detl_tbl js end---------------
// ------------family_detl_tbl js end---------------




// ------------academic_record_tbl js start---------------
// ------------academic_record_tbl js start---------------


$(document).on('click','#academic_record_btn',function(){
    $('#academic_record_tbl tbody ').append(
        `<tr>
            <td>
                <input type="text" class="f_13" datepicker2 placeholder="Enter Examination Passed....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Board/ University ....">
            </td>
            <td >
                <input type="text" class="f_13 datepicker2" id="academic_from" placeholder="Enter From....">
            </td>
            <td >
                <input type="text" class="f_13 datepicker2" id="academic_to" placeholder="Enter To....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Specialization....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Division....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Age/CGPA....">
            </td>
            <td>
                <i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i>
            </td>
        </tr>
    `)    
})


$(document).on("click", "#education_record_submit", function () {
    let educationData = [];
    $("#academic_record_tbl tbody tr").each(function () {
        let row = $(this);
        let rowData = {
            examination_passed: row.find("input[placeholder='Enter Examination Passed....']").val(),
            university: row.find("input[placeholder='Enter Board/ University ....']").val(),
           year_form: row.find("input[placeholder='Enter From....']").val(),
           year_to: row.find("input[placeholder='Enter To....']").val(),
            specialization: row.find("input[placeholder='Enter Specialization....']").val(),
            division: row.find("input[placeholder='Enter Division....']").val(),
            cgpa: row.find("input[placeholder='Enter Age/CGPA....']").val()
        };
        console.log(educationData,'sugdugsudg')
        educationData.push(rowData);
    });

    $.ajax({
        url: '/education_record_submit',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ educationData: educationData }),
        success: function (res) {
            if (res == "success") {
                Swal.fire({
                    title: "Successful!",
                    text: "Data Successfully Inserted",
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Data Insertion Failed",
                    icon: "error"
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Error",
                text: "An error occurred during the request",
                icon: "error"
            });
        }
    })})

$(document).on("click", "#academic_record_tbl tbody tr td:nth-child(8) #delete_btn", function(){
    $(this).closest('tr').remove();
});

// ------------academic_record_tbl js end---------------
// ------------academic_record_tbl js end---------------




// ------------job_related_tbl js start---------------


$(document).on("click", "#Job_Related_Training_submit", function () {
    let Job_Related_Training = [];
    $("#job_related_tbl tbody tr").each(function () {
        let row = $(this);
        let rowData = {
            Name_of_Course: row.find("input[placeholder='Enter Name of the Course....']").val(),
            Duration: row.find("input[placeholder='Enter Duration ....']").val(),
            Year: row.find("input[placeholder='Enter Year....']").val(),
            Institute: row.find("input[placeholder='Enter Institute/ Organization....']").val(),
            award: row.find("select#award").val()
         
        };
        console.log(Job_Related_Training,'sugdugsudg')
        Job_Related_Training.push(rowData);
    });

    $.ajax({
        url: '/Job_Related_Training_submit',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ Job_Related_Training: Job_Related_Training }),
        success: function (res) {
            if (res == "success") {
                Swal.fire({
                    title: "Successful!",
                    text: "Data Successfully Inserted",
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Data Insertion Failed",
                    icon: "error"
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Error",
                text: "An error occurred during the request",
                icon: "error"
            });
        }
    })})


// ------------job_related_tbl js start---------------

$(document).on('click','#job_related_btn',function(){
    $('#job_related_tbl tbody ').append(
        `<tr>
            <td>
                <input type="text" class="f_13" placeholder="Enter Name of the Course....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Duration ....">
            </td>
            <td >
                <input type="text" class="f_13 datepicker2"  placeholder="Enter Year....">
            </td>
            <td >
                <input type="text" class="f_13" placeholder="Enter Institute/ Organization....">
            </td>                                    
            <td>
                <select name="" id="award" placeholder="Certificate Awarded" class="select_style f_13">
                    <option value="none">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </td>
            <td>
                <i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i>
            </td>

        </tr>
    `)    
})

$(document).on("click", "#job_related_tbl tbody tr td:nth-child(6) #delete_btn", function(){
    console.log(this,'this_djfjdl')
    $(this).closest('tr').remove();
});

// ------------job_related_tbl js end---------------
// ------------job_related_tbl js end---------------



// ------------employment_detl_tbl js start---------------
// ------------employment_detl_tbl js start---------------




$(document).on('click','#employment_detl_btn',function(){
    $('#employment_detl_tbl tbody ').append(
        `<tr>
            <td>
                <input type="text" class="f_13" placeholder="Enter Organization Name  ....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Position ....">
            </td>
            <td >
                <input type="text" class="f_13 datepicker1" id="employment_detl_from" placeholder="From....">
            </td>
            <td >
                <input type="text" class="f_13 datepicker1" id="employment_detl_to" placeholder="To....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Tenure....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Designation Name....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Annual CTC....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Reason for Leaving....">
            </td>

            <td>
                <i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i>
            </td>

        </tr>
    `)    
})

$(document).on("click", "#employment_submit", function () {
    let employment_data = [];
    $("#employment_detl_tbl tbody tr").each(function () {
        let row = $(this);
        let rowData = {
            Name_Organization: row.find("input[placeholder='Enter Organization Name  ....']").val(),
            Position: row.find("input[placeholder='Enter Position ....']").val(),
            From: formatDate(row.find("input[placeholder='From....']").val()),
            To: formatDate(row.find("input[placeholder='To....']").val()),
            Tenure: row.find("input[placeholder='Enter Tenure....']").val(),
            Name_Designation: row.find("input[placeholder='Enter Designation Name....']").val(),
            Annual_CTC: row.find("input[placeholder='Enter Annual CTC....']").val(), 
            Reason_for_Leaving: row.find("input[ placeholder='Enter Reason for Leaving....']").val(),
            // Achievements: row.find("input[   placeholder='Achievements...']").val(),
            Select_Date_From: formatDate($('#accecpted_join_date_form').val()),
            Select_Date_To: formatDate($('#accecpted_join_date_to').val()),
        };
        console.log(employment_data,'sugdugsudg')
        employment_data.push(rowData);
    });

    $.ajax({
        url: '/employment_submit',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ employment_data: employment_data }),
        success: function (res) {
            if (res == "success") {
                Swal.fire({
                    title: "Successful!",
                    text: "Data Successfully Inserted",
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Data Insertion Failed",
                    icon: "error"
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Error",
                text: "An error occurred during the request",
                icon: "error"
            });
        }
    })})



$(document).on("click", "#employment_detl_tbl tbody tr td:nth-child(9) #delete_btn", function(){
    // console.log(this,'this_djfjdl')
    $(this).closest('tr').remove();
});

// ------------employment_detl_tbl js end---------------
// ------------employment_detl_tbl js end---------------



// ------------job_related_tbl js start---------------
// ------------job_related_tbl js start---------------




$(document).on('click','#language_tbl_btn',function(){
    $('#language_tbl tbody ').append(
        `<tr >
            <td>
                <input type="text" class="f_13 input_style" placeholder="Enter Language Name....">        
            </td>
            <td >
                <select name="" id="" class="select_style f_13">
                    <option value="none">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </td>
            <td >
                <select name="" id="" class="select_style f_13">
                    <option value="none">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </td>
            <td >
                <select name="" id="" class="select_style f_13">
                    <option value="none">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </td>
            <td>
                <i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i>
            </td>
        </tr>
            `)    
})





  // Function to delete a row
  $(document).on('click', '#delete_btn', function() {
    $(this).closest('tr').remove();
  });

  // Function to submit the form data

  $('#language_submit_form').click(function() {
    var languages = [];

    // Collect data from predefined rows
    $('#language_tbl tbody tr').each(function() {
      var language = $(this).find('td').eq(0).text().trim() || $(this).find('input').val().trim();
      var speak = $(this).find('select').eq(0).val();
      var read = $(this).find('select').eq(1).val();
      var write = $(this).find('select').eq(2).val();
      if (language) {
        languages.push({
          language: language,
          speak: speak,
          read: read,
          write: write
        });
      }
      console.log(languages)
    });

    // Send data to the server using AJAX
    $.ajax({
      url: '/language_submit_form',
      type: 'POST',
      data: { languages: languages },
      success: function(res) {
        // Handle success with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data successfully submitted'
        });
      },
      error: function(xhr, status, error) {
        // Handle error with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while submitting the data'
        });
      }
    });
  });





$(document).on("click", "#language_tbl tbody tr td:nth-child(5) #delete_btn", function(){
    console.log(this,'this_djfjdl')
    $(this).closest('tr').remove();
});

// ------------job_related_tbl js end---------------
// ------------job_related_tbl js end---------------


$(document).on('click','#address_same_as',function(){
    let checkbox_status=$(this).prop('checked')
    console.log(checkbox_status,'checkbox_status')
    if(checkbox_status==true){
        let communication_addrs=$('#communication_addrs').val()
        console.log(communication_addrs,'communication_addrs')
        let permanent_addrs=$('#permanent_addrs')
        permanent_addrs.val(communication_addrs).attr('disabled',true)
        console.log($('#permanent_addrs').val(),'qqqqqqqqqqqqqqqq')
    }
    else{        
        let permanent_addrs=$('#permanent_addrs')
        permanent_addrs.val('').removeAttr('disabled')
    }
    
     
})



$('#whom_reference_submit ').click(function() {
    var reference_data = [];


    // Collect data from predefined rows
    $('#person_refer_tbl tbody tr').each(function() {
      var sno = $(this).find('td').eq(0).text().trim()
      var name = $(this).find('#name').eq(0).val();
      var Occupation = $(this).find('#Occupation').val();
      var Contact_No = $(this).find('#Contact_No').val();
      var Address = $(this).find('#Address').val();
      if (reference_data) {
        reference_data.push({
            sno: sno,
            name: name,
            Occupation: Occupation,
          Contact_No: Contact_No,
          Address:Address

        });
      }
      console.log(reference_data)
    });


    // Send data to the server using AJAX
    $.ajax({
      url: '/whom_reference_submit',
      type: 'POST',
      data: { reference_data: reference_data },
      success: function(res) {
        // Handle success with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data successfully submitted'
        });
      },
      error: function(xhr, status, error) {
        // Handle error with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while submitting the data'
        });
      }
    });
  });


$(document).ready(function () {
    var currentSection = 0;
    var totalSections = $(".form-section").length;

    function showSection(index) {
        $(".form-section").removeClass("current").eq(index).addClass("current");
    }

    $(".next").click(function () {
        if (currentSection < totalSections - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    $(".previous").click(function () {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    $("#employmentForm").submit(function (event) {
        event.preventDefault();
        alert("Form submitted!");
    });

    showSection(currentSection);
})





$(document).on('input','#communication_addrs',function(){
    let checkbox_status=$('#address_same_as').prop('checked')
    if(checkbox_status==true){
        let communication_addrs=$('#communication_addrs').val()
        let permanent_addrs=$('#permanent_addrs')
        permanent_addrs.val(communication_addrs)
        
    }
})


$(document).ready(function() {
    $('#submit_form').click(function() {
        // Collect form data
        let formData = new FormData();
        formData.append('candidate_image', $('#candidate_image_input')[0].files[0]);
        formData.append('candidate_image', $('#candidate_image').val());
        formData.append('first_name', $('#first_name').val());
        formData.append('middle_name', $('#middle_name').val());
        formData.append('last_name', $('#last_name').val());
        formData.append('communication_addrs', $('#communication_addrs').val());
        formData.append('permanent_addrs', $('#permanent_addrs').val());
        formData.append('pin_code', $('#pin_code').val());
        formData.append('mobile_no', $('#mobile_no').val());
        formData.append('Emergency_no', $('#Emergency_no').val());
        formData.append('tel_no', $('#tel_no').val());
        formData.append('email_id', $('#email_id').val());
        formData.append('date_of_birth', $('#date_of_birth').val());
        formData.append('age', $('#age').val());
        formData.append('gender', $('#gender').val());
        formData.append('marital_status', $('#marital_status').val());
        formData.append('spouse_name', $('#spouse_name').val());
        formData.append('occupation', $('#occupation').val());
        formData.append('blood_group', $('#blood_group').val());
        formData.append('relative_name', $('#relative_name').val());
        formData.append('relative_designation', $('#relative_designation').val());
        formData.append('relative_relationship', $('#relative_relationship').val());
     // Log formData to console
     for (let [key, value] of formData.entries()) {
        console.log(key, value,"dwuyjssdyjsfdy");
    }
        // Concatenate middle_name and last_name and log the result
        let middleName = $('#middle_name').val();
        let lastName = $('#last_name').val();
        let concatenatedNames = middleName+ lastName;
        console.log('Concatenated middle_name and last_name:', concatenatedNames);

        $.ajax({
            url: '/candidate_personal_details',
            type: 'POST',
            data: formData,concatenatedNames:concatenatedNames,
            contentType: false,
            processData: false,
            success: function(response) {
                alert('Data successfully submitted');
            },
            error: function(error) {
                alert('Error submitting data');
            }
        });
    });
});







