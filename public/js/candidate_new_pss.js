$(document).ready(function(){    
    $(document).on('click', '#change_pss', function(event){
        event.preventDefault();
        let emp_code=$('#emp_code').text()
        let role=$('#role').text()
        
        if (!emp_code) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid request, employee code is missing!'
            });
            return;
        }
        
        const newPassword = $('#new_password').val().trim();
        const confirmPassword = $('#confirm_password').val().trim();
        
        if (newPassword === "" || confirmPassword === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Both password fields are required!'
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match!'
            });
            return;
        }
        
        $.ajax({
            method: 'POST',
            url: '/change_password_candidate',
            data: { emp_code: emp_code, new_password: newPassword,role:role },
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            },

            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseJSON.message
                });
            }
        });
    });
});
