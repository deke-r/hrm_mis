






$(document).ready(function() {
    $('#view_table').DataTable({
      language: {
        'paginate': {
          'previous': '<span class="fa fa-chevron-left"></span>',
          'next': '<span class="fa fa-chevron-right"></span>'
        },
        "lengthMenu": 'Display <select class="form-control input-sm mt-2">' +
          '<option value="10">10</option>' +
          '<option value="20">20</option>' +
          '<option value="30">30</option>' +
          '<option value="40">40</option>' +
          '<option value="50">50</option>' +
          '<option value="-1">All</option>' +
          '</select> results'
      },
      "order": [[0, "desc"]], 
      "columnDefs": [
        { 
          "orderable": false, 
          "targets": "_all" 
        }
      ],
      initComplete: function() {   
        $(".no-sorting").removeClass('sorting_asc');
      }
    });
  });







$(document).ready(function() {
  $('#accept').click(function() {
   var resignation_id=$(this).attr('resignation_id')

    var candidate_id = $(this).attr('candidate_id');
    var candidate_name = $(this).attr('candidate_name');
    var candidate_reason = $(this).attr('candidate_reason');
    var candidate_mail=$(this).attr('cand_mail')

   


  


  
  

    $.ajax({
      url: '/accept', // Replace with your API endpoint
      method: 'POST',
      data: {
        resignation_id:resignation_id,
        candidate_id:candidate_id,
        candidate_name:candidate_name,
        candidate_reason:candidate_reason,
        candidate_mail:candidate_mail

      },
     
      success: function(response) {
        console.log('Response:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Resignation request accepted',
        }).then(function(){
          location.reload()
         
        })
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit resignation.',
        });
      }
    });
  });
});



$(document).ready(function() {
  $('#reject').click(function() {
   var resignation_id=$(this).attr('resignation_id')

    var candidate_id = $(this).attr('candidate_id');
    var candidate_name = $(this).attr('candidate_name');
    var candidate_reason = $(this).attr('candidate_reason');
    var candidate_mail=$(this).attr('cand_mail')
   

  
 
 

    
console.log(candidate_id,candidate_name,candidate_reason,candidate_mail)
  
  

    $.ajax({
      url: '/reject', // Replace with your API endpoint
      method: 'POST',
      data: {
        resignation_id:resignation_id,
        candidate_id:candidate_id,
        candidate_name:candidate_name,
        candidate_reason:candidate_reason,
        candidate_mail:candidate_mail

      },
     
      success: function(response) {
        console.log('Response:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Resignation request rejected',
        }).then(function(){
          location.reload()
        })


      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit resignation.',
        });
      }
    });
  });
});







