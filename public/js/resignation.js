

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



//  $(document).on('click','#sub_btn', function (){
//   var candidate_id= $('#Candidate_Id').val()
//   var candidate_name= $('#candidate_name').val()
//   var candidate_reason= $('#candidate_reason').val()
//   var candidate_attachment= $('#candidate_attachment').val()

// console.log(candidate_id,candidate_name,candidate_reason,candidate_attachment,"sidgduyfvudfvd")

//   $.ajax({

//     url:'/resignation',
//     method:"post",
//     data:{candidate_id:candidate_id,candidate_name:candidate_name,candidate_reason:candidate_reason,candidate_attachment:candidate_attachment},
//     function(res){
//       if(res=="success"){
//         swal.fire({
//           title:"success",

//         })

//       }
//       else{
//         swal.fire({
//           title:'error'
//         })
//       }
//     }

//   })
 
//  })



$(document).ready(function() {
  $('#sub_btn').click(function() {
   

    var candidate_id = $('#Candidate_Id').val();
    var candidate_name = $('#candidate_name').val();
    var candidate_reason = $('#candidate_reason').val();
    var candidate_attachment = $('#candidate_attachment')[0].files[0];
    var rep_manager_email=$('#rep_manager_email').val()
    var rep_sr_email=$('#rep_sr_email').val()


    // Validate all fields are filled
    if (!candidate_id || !candidate_name || !candidate_reason ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    var formData = new FormData();
    formData.append('candidate_id', candidate_id);
    formData.append('candidate_name', candidate_name);
    formData.append('candidate_reason', candidate_reason);
    formData.append('candidate_attachment', candidate_attachment);
    formData.append('rep_manager_email',rep_manager_email)
    formData.append('rep_sr_email',rep_sr_email)

    $.ajax({
      url: '/resignation', // Replace with your API endpoint
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log('Response:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Resignation request submitted successfully!',
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



