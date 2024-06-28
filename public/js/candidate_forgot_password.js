$(document).ready(function(){
    let timerInterval;

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(timerInterval);
                $('#otp-box').addClass('d-none');
                $('#verify_otp').addClass('d-none');
                $('#forget').removeClass('d-none');
                display.addClass('d-none');
            }
        }, 1000);
    }


    function maskEmail(email) {
        const [name, domain] = email.split('@');
        const maskedName = name.length > 2 ? `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}` : `${name[0]}*`;
        return `${maskedName}@${domain}`;
    }
    
    function maskMobile(mobile) {
        return mobile.replace(/.(?=.{4})/g, '*');
    }
    

    $(document).on('click', '#forget', function(event){
        event.preventDefault();
        let emp_code = $('#box1').val().trim();
        if (emp_code === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Candidate-Id cannot be blank!'
            });
        } else {
            $.ajax({
                method: 'POST',
                url: '/candidate_forgot_pass',
                data: { emp_code: emp_code },
                success: function(res) {
                    const maskedEmail = maskEmail(res.email);
                    const maskedMobile = maskMobile(res.candidate_mobile);

                    if (res && res.message) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: `OTP sent to ${maskedEmail} and ${maskedMobile}`
                        });
                        console.log(res.email ,res.candidate_mobile)
                        $('#role').text(res.role)
                        $('#box1').prop('disabled', true); 
                        $('#otp-box').removeClass('d-none');
                        $('#verify_otp').removeClass('d-none');
                        $('#forget').addClass('d-none');
                        $('#timer').removeClass('d-none');
                        
                        let oneMinute = 60,
                            display = $('#timer');
                        startTimer(oneMinute, display);
                    } else if (res && res.emp_check) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.emp_check
                        });
                    }
                },
                error: function(xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: xhr.responseJSON.message
                    });
                }
            });
        }
    });

    $(document).on('click', '#verify_otp', function(event){
        event.preventDefault();
        let emp_code = $('#box1').val().trim();
        let otp = $('#otp').val().trim();
        let role=$('#role').text()
        if (emp_code === "" || otp === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Both Candidate-Id and OTP are required'
            });
        } else {
            $.ajax({
                method: 'POST',
                url: '/verify_otp',
                data: { emp_code: emp_code, otp: otp },
                success: function(res) {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.message
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `/create_new_pass/${emp_code}/${role}`;
                        }
                    });
                    clearInterval(timerInterval);
                    $('#otp-box').addClass('d-none');
                    $('#verify_otp').addClass('d-none');
                    $('#forget').removeClass('d-none');
                    $('#timer').addClass('d-none');
                    $('#box1').prop('disabled', false); 
                    $('#otp').val('');

 
                },
                error: function(xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: xhr.responseJSON.message
                    });
                }
            });
        }
    });
});
