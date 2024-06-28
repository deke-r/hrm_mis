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

$(document).ready(function(){
    $.ajax({
      method:'POST',
      url:'/celebration_bday',
      success:function(res){
        console.log(res)
        for(var i=0;i < res.length;i++)


        $('#celeb').append(
          `
           <div class="row ">
                          <div class="container-fluid">
                            <div class="row mx-1 py-2 rounded-2 border my-2">
                              <div class="col-2">
                                <img src="/static/images/default_profile.png" height="50px">

                              </div>
                              <div class="col-7">
                                <div class="f_14 fw_600">${res[i].candidate_name}</div>
                                <div class="f_13 "><span><i class="fa-solid fa-calendar-days"></i></span>
                                 Birthday
                                 </div>

                              </div>
                              <div class="col-3">
                                <div class="container border rounded-2 text-center f_14 fw_600 py-1">
                                  ${res[i].day}<br>
                                  ${res[i].month}
                                                                  </div>
                              </div>


                            </div>
                          </div>
                        </div>
          `
        )
      }
    })
  })


  $(document).ready(function(){
    $.ajax({
      method:'POST',
      url:'/celebration_anniversary',
      success:function(res){
        console.log(res)
        for(var i=0;i < res.length;i++)


        $('#celeb').append(
          `
           <div class="row ">
                          <div class="container-fluid">
                            <div class="row mx-1 py-2 rounded-2 border my-2">
                              <div class="col-2">
                                <img src="/static/images/default_profile.png" height="50px">

                              </div>
                              <div class="col-7">
                                <div class="f_14 fw_600">${res[i].candidate_name}</div>
                                <div class="f_13 "><span><i class="fa-solid fa-calendar-days"></i></span>
                                 Joining Anniversary
                                 </div>

                              </div>
                              <div class="col-3">
                                <div class="container border rounded-2 text-center f_14 fw_600 py-1">
                                  ${res[i].day}<br>
                                  ${res[i].month}
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>
          `
        )
      }
    })
  })





  $(document).ready(function() {
    $.ajax({
        method: 'POST',
        url: '/announcement_view',
        success: function(res) {
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                $('#announcement').append(
                    `
                    <div class="row ">
                        <div class="container-fluid">
                            <div class="row mx-1 py-2 rounded-2 border my-2">
                                <p class='m-0 text-danger'>
                                <marquee>

                                ${res[i].announcement}
                                </marquee>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                );
            }
        }
    });
});