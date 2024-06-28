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
    

    console.log(user,pass,"idfuhifuidufdifudu")

    // Check if any field is empty
    if (user.trim() === '' || pass.trim() === '') {
        
        swal({
            title: "Error",
            text: "Please fill in all fields.",
            icon: "warning",
        });
        return; 
    }

    // All fields are filled, proceed with form submission
    $.ajax({
        url: '/candidate_login',
        type: 'POST',
        data: { candidate_email_mobile: user, PASSWORD: pass},
        success: function(res) {
            console.log(res);
            if (res == "error") {
                swal.fire({
                    title: "Invalid Credentials",
                    text: "Candidate / Password didn't match",
                    icon: "error",
                });
            } else {
                // Check user type
                if (res == 'success') {
                    // Head Office selected, display alert and redirect to Head Office dashboard
                    swal.fire({
                        title: "Candidate Dashboard",
                        text: "You are being redirected Candidate Dashboard.",
                        icon: "success",
                    }).then(function() {
                        window.location.href = '/candidate_documents';
                    });

                }             }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});



