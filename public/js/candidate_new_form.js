
$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
        dateFormat: "dd-mm-yy",
    });
});


$(document).on('click', '#candidate_image', function () {
    $('#candidate_image_input').click()


})

// ---------------------candidate_image js start--------------------- 
// ---------------------candidate_image js start--------------------- 
$(document).on('change', '#candidate_image_input', function () {
    let candidate_image = $('#candidate_image_input')[0].files[0]
    let reader = new FileReader()
    reader.onload = function (e) {
        $('#candidate_image').removeClass('img_height')
        $('#candidate_image').attr('src', '')
        $('#candidate_image').attr('src', e.target.result)
    }
    reader.readAsDataURL(candidate_image)

})
// ---------------------candidate_image js end--------------------- 
// ---------------------candidate_image js end--------------------- 

$(document).ready(function () {
    $('#submit_form').click(function () {
        // Collect form data
        let formData = new FormData();
        formData.append('candidate_image', $('#candidate_image_input')[0].files[0]);
        //  Log formData to console
        for (let [key, value] of formData.entries()) {
            console.log(key, value, "dwuyjssdyjsfdy");
        }

        $.ajax({
            url: '/path/to/your/api/endpoint',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert('Data successfully submitted');
            },
            error: function (error) {
                alert('Error submitting data');
            }
        });
    });
});



// ------------family_detl_tbl js start---------------
// ------------family_detl_tbl js start---------------


function updateSerialNumbers() {
    $("#family_detl_tbl tbody tr").each(function (index) {
        $(this).find('td').eq(0).text(index + 1);
    });
}

$(document).on("click", "#family_detl_btn", function () {
    let lastIndex = $("#family_detl_tbl tbody tr").length;
    let newIndex = lastIndex + 1;
    $("#family_detl_tbl tbody").append(
        `
        <tr class="text-center table_width">
                    <td>${newIndex}</td>

        <td><input type="text" name="" id="" class="form-control"></td>
        <td><input type="text" name="" id="" class="form-control"></td>
        <td><input type="date" name="" id="" class="form-control"></td>
        <td colspan="2"><input type="text" name="" id="" class="form-control"></td>
        <td><i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i></td>
</tr>
        `
    );
});

$(document).on("click", "#family_detl_tbl tbody tr td:nth-child(6) #delete_btn", function () {
    $(this).closest('tr').remove();
    updateSerialNumbers();
});

// ------------family_detl_tbl js end---------------
// ------------family_detl_tbl js end---------------

// ------------family_detl_tbl_1 js start---------------
// ------------family_detl_tbl_1 js start---------------


// function updateSerialNumbers() {
//     $("#family_detl_tbl_1 tbody tr").each(function (index) {
//         $(this).find('td').eq(0).text(index + 1);
//     });
// }

$(document).on("click", "#family_detl_btn_1", function () {
    let lastIndex = $("#family_detl_tbl_1 tbody tr").length;
    let newIndex = lastIndex + 1;
    $("#family_detl_tbl_1 tbody").append(
        `
        <tr class="text-center table_width">
                    <td><input type="text" name="name_a" id="Name_address" class="form-control"></td>

        <td><input type="text" id="dob1" name="name_b" class="form-control f_13 datepicker1" placeholder="Enter Date Of Birth...."></td>
        <td><input type="text" name="name_c"  id="rwm1" class="form-control"></td>
        <td><i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i></td>
</tr>
        `
    );
});

$(document).on("click", "#family_detl_tbl_1 tbody tr td:nth-child(4) #delete_btn", function () {
    $(this).closest('tr').remove();
    updateSerialNumbers();
});

// ------------family_detl_tbl_1 js end---------------
// ------------family_detl_tbl_1 js end---------------



// emp_sign_ js start 
// emp_sign_ js start

$(document).on('click','#emp_sign_box',function(){
    $('#emp_sign_input').click()
})

$(document).on('change','#emp_sign_input',function(){
    let emp_sign_img=$(this)[0].files[0]
    console.log(emp_sign_img,'emp_sign_img')

    let reader=new FileReader()
    reader.onload=function(e){
        $('#emp_sign_img').removeAttr('hidden')
        $('#emp_sign_img').attr('src',e.target.result)     
    }
    reader.readAsDataURL(emp_sign_img)
    
})


// emp_sign_ js end 
// emp_sign_ js end 


// emp_sign_2 js start 
// emp_sign_2 js start 


$(document).on('click','#emp_sign_box2',function(){
    $('#emp_sign_input2').click()
})

$(document).on('change','#emp_sign_input2',function(){
    let emp_sign_img2=$(this)[0].files[0]
    console.log(emp_sign_img2,'emp_sign_img2')

    let reader=new FileReader()
    reader.onload=function(e){
        $('#emp_sign_img2').removeAttr('hidden')
        $('#emp_sign_img2').attr('src',e.target.result)
        
    }
    reader.readAsDataURL(emp_sign_img2)

})

// emp_sign_2 js end 
// emp_sign_2 js end 

// emp_sign_3 js start 
// emp_sign_3 js start 


$(document).on('click','#employer_sign_box',function(){
    $('#employer_sign_input').click()
})

$(document).on('change','#employer_sign_input',function(){
    let employer_sign_img=$(this)[0].files[0]
    console.log(employer_sign_img,'employer_sign_img')

    let reader=new FileReader()
    reader.onload=function(e){
        $('#employer_sign_img').removeAttr('hidden')
        $('#employer_sign_img').attr('src',e.target.result)
    }
    reader.readAsDataURL(employer_sign_img)

})

// emp_sign_3 js end 
// emp_sign_3 js end 

// insert api //
$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();
        
        // Confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: 'Duplicate entries are not allowed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            location.href='candidate_new_form_1';

            if (result.isConfirmed) {

                var formData = new FormData($(this)[0]);
                console.log(formData);

                // AJAX call to check for duplicates
                $.ajax({
                    type: 'POST',
                    url: '/check_duplicate_api',  // URL for checking duplicate entries
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        if (response.isDuplicate) {
                            Swal.fire({
                                title: 'Duplicate Entry',
                                text: 'Duplicate entry found. Please modify your input.',
                                icon: 'error'
                            });
                        } else {
                            // Proceed with form submission if no duplicate is found
                            $.ajax({
                                type: 'POST',
                                url: '/nominee_api_a',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function() {
                                  
                                },
                                
                            });
                        }
                    },
                    
                });
            }
        });
    });
});

// insert api end //