
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
                <input type="text" class="f_13" placeholder="Enter Date Of Birth....">
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
                <input type="text" class="f_13" placeholder="Enter Examination Passed....">
            </td>
            <td>
                <input type="text" class="f_13" placeholder="Enter Board/ University ....">
            </td>
            <td >
                <input type="text" class="f_13" id="academic_from" placeholder="Enter From....">
            </td>
            <td >
                <input type="text" class="f_13" id="academic_to" placeholder="Enter To....">
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

$(document).on("click", "#academic_record_tbl tbody tr td:nth-child(8) #delete_btn", function(){
    $(this).closest('tr').remove();
});

// ------------academic_record_tbl js end---------------
// ------------academic_record_tbl js end---------------



// ------------job_related_tbl js start---------------
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
                <input type="text" class="f_13"  placeholder="Enter Year....">
            </td>
            <td >
                <input type="text" class="f_13" placeholder="Enter Institute/ Organization....">
            </td>                                    
            <td>
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
                <input type="text" class="f_13" id="employment_detl_from" placeholder="From....">
            </td>
            <td >
                <input type="text" class="f_13" id="employment_detl_to" placeholder="To....">
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
            data: formData,
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







