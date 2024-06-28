$(document).ready(function() {
    $.ajax({
        url: '/admin_dashboard_onload',
        method: 'POST',
        success: function(res) {
            console.log(res.present_emp, res.emp_on_leave, res.total_emp, res.user_name, 'dddd');

            // Correctly select the HTML elements and update their content
            $('#present_emp_count').html(res.present_emp);
            $('#leave_emp_count').html(res.emp_on_leave);
            $('#total_emp_count').html(res.total_emp);
            $('#user_name').html(res.user_name);
        }
    });
});


$('#leave_div').on('click',function(){
    location.href="/today_emp_on_leave" 
})