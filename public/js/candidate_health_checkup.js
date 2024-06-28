$(document).ready(function(){
    $('#submitBtn').on('click', function(e){
        e.preventDefault();
        var formData = new FormData($('#healthCheckupForm')[0]);
        console.log(formData);
        $.ajax({
            url: '/insert_health_checkup',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                // Show success message with SweetAlert2
                Swal.fire({
                    title: 'Success!',
                    text: 'Form submitted successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(function(){
                    location.reload()
                })
            },
            error: function(jqXHR, textStatus, errorThrown){
                // Show error message with SweetAlert2
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to submit form: ' + textStatus,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });
});