document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
  
    function getSundays(year, month) {
      var date = new Date(year, month, 1);
      var sundays = [];
      date.setDate(1);
      while (date.getDay() !== 0) {
        date.setDate(date.getDate() + 1);
      }
      while (date.getMonth() === month) {
        sundays.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 7);
      }
      return sundays;
    }
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2024-06-07',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'Absent',
          start: '2024-06-01',
          className: 'absent'
        },
        // {
        //   title: 'Present',
        //   start: '2024-06-07',
        //   className: 'present'
        // },
      ],
      eventDidMount: function(info) {
        var eventTitle = info.event.title;
  
        if (eventTitle === 'Week Off') {
          var tdElement = info.el.closest('.fc-day'); 
          if (tdElement) {
            tdElement.style.backgroundColor = '#c3c3c3'; 
          }
        } else if (eventTitle === 'Present') {
          var parentDiv = info.el.closest('.fc-day'); 
          if (parentDiv) {
            // parentDiv.style.backgroundColor = '#0473cf'; 
          }
        } else if (eventTitle === 'Absent') {
          var parentDiv = info.el.closest('.fc-day'); 
          if (parentDiv) {
            parentDiv.style.backgroundColor = '#ff44003f'; 
          }
        }
      },
      datesSet: function(info) {
        var year = info.view.currentStart.getFullYear();
        var month = info.view.currentStart.getMonth();
        var sundays = getSundays(year, month);
  
        var events = calendar.getEvents();
        events.forEach(function(event) {
          if (event.title === 'Week Off') {
            event.remove();
          }
        });
  
        sundays.forEach(function(sunday) {
          calendar.addEvent({
            title: 'Week Off',
            start: sunday,
            allDay: true,
            className: 'weekoff'
          });
        });
      }
    });
  
    calendar.render();
  });
  


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



  
  $(document).ready(function(){
    $.ajax({
      url:'/candidate_leave_count',
      method:'post',
      success:function(res){
        $('#total_leaves').html(res.total_leaves)
        $('#full_day_leaves').html(res.total_full_day_leaves)
        $('#half_day_leaves').html(res.total_half_day_leaves)
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
