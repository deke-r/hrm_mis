$(document).on('click','#show',function(){
    var type=$('#box2').attr('type')
    if(type=="password"){
        $('#box2').attr('type','text')
        $(this).toggleClass('fa-eye-slash fa-eye')
    }
    else{
        $('#box2').attr('type','password')
        $(this).toggleClass('fa-eye-slash fa-eye')
    }
})


$(document).on('click', '#log', function() {

    var user = $('#box1').val();
    var pass = $('#box2').val();
    var userType = $('#type').val(); 

    // Check if any field is empty
    if (user.trim() === '' || pass.trim() === '' || userType === null) {
        
        swal({
            title: "Error",
            text: "Please fill in all fields.",
            icon: "warning",
        });
        return; 
    }

    // All fields are filled, proceed with form submission
    $.ajax({
        url: '/login',
        type: 'POST',
        data: { EMP_CODE: user, PASSWORD: pass,USER_TYPE: userType},
        success: function(res) {
            console.log(res);
            if (res == "error") {
                swal.fire({
                    title: "Invalid Credentials",
                    text: "Userid / Password didn't match",
                    icon: "error",
                });
            } else {
                // Check user type
                if (userType === '0') {
                    // Head Office selected, display alert and redirect to Head Office dashboard
                    swal.fire({
                        title: "Admin Dashboard",
                        text: "You are being redirected Admin Dashboard.",
                        icon: "success",
                    }).then(function() {
                        window.location.href = '/dashboard_admin';
                    });

                } 
                else if (userType === '1') {
                    // Manager selected, display alert and redirect to Manager dashboard
                    swal.fire({
                        title: "Hr Dashboard",
                        text: "You are being redirected to Hr Dashboard.",
                        icon: "success",
                    }).then(function() {
                       
                        window.location.href = '/dashboard_admin';
                    })
                    ;}
                
                else if (userType === '2') {
                    // Manager selected, display alert and redirect to Manager dashboard
                    swal.fire({
                        title: "Manager Dashboard",
                        text: "You are being redirected to Manager Dashboard.",
                        icon: "success",
                    }).then(function() {
                       
                        window.location.href = '/manager_dashboard';
                    });
                }

                
                else if (userType === '3') {
                    // Manager selected, display alert and redirect to Manager dashboard
                    swal.fire({
                        title: "Employee Dashboard",
                        text: "You are being redirected to Employee Dashboard.",
                        icon: "success",
                    }).then(function() {
                       
                        window.location.href = '/cand_leave_dashboard';
                    })
            }

            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
