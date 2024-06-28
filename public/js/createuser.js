$(document).ready(function() {
    $('#employee-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Serialize form data
        var formData = $(this).serialize();

        // Make AJAX request to check if employee code already exists
        $.ajax({
            type: 'POST',
            url: '/checkEmployeeCode',
            data: formData,
            success: function(response) {
                if (response.exists) {
                    // Employee code already exists
                    // alert('Employee with this code already exists.');
                    console.log(response)
                    swal.fire({
                        title: "Error",
                        text: "User already exists!!",
                        icon: "error",
                    })
                } else {
                    // Employee code does not exist, proceed with form submission
                    submitForm(formData);
                }
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', error);
                swal.fire({
                    title: "Error",
                    text: "User already exists!!",
                    icon: "error",
                })
            }
        });
    });
});

function submitForm(formData) {
    // Make AJAX request to submit form data
    $.ajax({
        type: 'POST',
        url: '/createuser',
        data: formData,
        success: function(response) {
            // Handle success response
            // alert('Data saved successfully.');
            swal.fire({
                title: "Successful",
                text: "New user created",
                icon: "success",
            }).then(function(){
                location.reload(); // Reload the page

            })
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('Error:', error);
            // alert('Error saving data. Please try again.');
            swal.fire({
                title: "Error",
                text: "Some error occured",
                icon: "error",
            })
        }
    });
}

