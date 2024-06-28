
$(document).on('click','.dwnld',function(){
  var jd_id = $(this).attr('jd_id');

  var job_title = $(this).attr('job_title');
  var func = $(this).attr('function');

  $('#p_title').html(job_title);
  $('#p_func').html(func);


  $.ajax({
      url: 'reporting_view', 
      type: 'POST',
      data: { jd_id: jd_id }, 
      success: function(response) {
        
        document.getElementById("Reporting").innerHTML="";
        document.getElementById("team").innerHTML="";
        document.getElementById("Location").innerHTML="";

        document.getElementById("Reporting").innerHTML=`${response.result[0].direct_reporting}`;
        document.getElementById("team").innerHTML=`${response.result[0].team_size}`;
        document.getElementById("Location").innerHTML=`${response.result[0].location_hq}`;
        
    
          console.log('JD ID sent successfully');
      },
      error: function(xhr, status, error) {
         
          console.error('Error sending JD ID:', error);
      }
  });

      var pdf_cont=$('#printpdf').printThis()
});



$(document).ready(function(){


    
  $('#jd_table').DataTable({

    language: {
      'paginate': {
        'previous': '<span class="fa fa-chevron-left"></span>',
        'next': '<span class="fa fa-chevron-right"></span>'
      },
      "lengthMenu": 'Display <select class="form-control input-sm mt-2">'+
      '<option value="10">10</option>'+
      '<option value="20">20</option>'+
      '<option value="30">30</option>'+
      '<option value="40">40</option>'+
      '<option value="50">50</option>'+
      '<option value="-1">All</option>'+
      '</select> results'
    },
    "columnDefs": [
        { "orderable": false, 
        "targets": [0],
         "className": "no-sorting"
     }],
     order: [[0, 'desc']],
     initComplete: function() {   
         $(".no-sorting").removeClass('sorting_asc');
     }
  }) 


})