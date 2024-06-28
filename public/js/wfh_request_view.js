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
    $(document).on('click', '.cancel-btn', function() {
      var requestId = $(this).data('request-id');
  
      $.ajax({
        url: '/cancel_wfh_request',
        method: 'POST',
        data: { requestId: requestId },
        success: function(response) {
          if (response.success) {
            Swal.fire({
              title: "Good job!",
              text: response.message,
              icon: "success"
            }).then(() => {
              location.reload(); 
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.message || "Failed to cancel request",
              icon: "error"
            });
          }
        },
        error: function(error) {
          console.error('Error:', error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while cancelling the request",
            icon: "error"
          });
        }
      });
    });
  });
  
  