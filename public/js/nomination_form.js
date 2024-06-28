$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
        dateFormat: "dd-mm-yy",
    });
});


$(document).on('click','#emp_sign_box_1',function(){
    $('#emp_sign_input_1').click()
})

$(document).on('change','#emp_sign_input_1',function(){
    let emp_sign_img_1=$(this)[0].files[0]
    console.log(emp_sign_img_1,'emp_sign_img_1')

    let reader=new FileReader()
    reader.onload=function(e){
        $('#emp_sign_img_1').removeAttr('hidden')
        $('#emp_sign_img_1').attr('src',e.target.result)
        
    }
    reader.readAsDataURL(emp_sign_img_1)

    
})

$(document).on('click','#emp_sign_box_2',function(){
    $('#emp_sign_input_2').click()
})

$(document).on('change','#emp_sign_input_2',function(){
    let emp_sign_img_2=$(this)[0].files[0]
    console.log(emp_sign_img_2,'emp_sign_img_2')

    let reader=new FileReader()
    reader.onload=function(e){
        $('#emp_sign_img_2').removeAttr('hidden')
        $('#emp_sign_img_2').attr('src',e.target.result)
        
    }
    reader.readAsDataURL(emp_sign_img_2)

    
})


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
            location.href='nomination_form_1';

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
                                url: '/nominee_api',
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

document.getElementById('nominationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('#nominationForm input, #nominationForm textarea');
    inputs.forEach(input => {
        input.setAttribute('disabled', 'disabled');
    });
});

// disable inputs //

// function disableAllInputs() {
//     var inputs = document.querySelectorAll('input');
//     inputs.forEach(function(input) {
//         input.disabled = true;
//     });
// }

// // Call the function to disable all inputs when the page loads
// window.onload = disableAllInputs;

// disable inputs //
