$(document).ready(function(){
    $(document).on('click', '#change_pss', function(){
        let cur_pass = $('#cur_pass').val();
        let new_pass = $('#new_pass').val();
        let c_pass = $('#c_pass').val();

        if (new_pass !== c_pass) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "New Password and Confirm Password should be the same",
            });
            return; 
        }

        if (new_pass === cur_pass) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "New Password cannot be the same as Current Password",
            });
            return; 
        }

        $.ajax({
            url: '/change_pss',
            method: 'POST',
            data: { c_pass: c_pass },
            success: function(res){
                Swal.fire({
                    icon: 'success',
                    title: 'Password Updated Successfully',
                    text: 'Your password has been updated.',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); 
                    }
                });
            },
            error: function(err){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update password. Please try again later.',
                });
            }
        });
    });
});


