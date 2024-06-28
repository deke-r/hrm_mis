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
          "targets": [0,1,2,3,4,5,6],
           "className": "no-sorting"
       }],
       initComplete: function() {   
           $(".no-sorting").removeClass('sorting_asc');
       }
    }) 
  })    
    
  $(document).ready(function() {
    $('img[data-bs-toggle="modal"]').on('click', function() {
      var src = $(this).attr('src');
      $('#modalImage').attr('src', src);
    });
  });


  $(document).ready(function() {
    $(document).on('click', '.take-back-asset', function() {
      var candidateId = $(this).data('candidate-id');
      var assetSerialNo = $(this).data('asset-serial-no');
      var report_id=$(this).data('report_id');
      
      $.ajax({
        url: '/take_back_asset',
        method: 'POST',
        data: {
          candidate_id: candidateId,
          asset_serial_no: assetSerialNo,
          report_id:report_id
        },
        success: function(response) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Asset taken back successfully',
            showConfirmButton: false,
            timer: 1500 // Automatically close after 1.5 seconds
          }).then(function() {
            location.reload();
          });
        },
        error: function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Error taking back asset'
          });
        }
      });
    });
  });
  


  $(document).on('click', '.confirm-receive-asset', function() {
    var candidateId = $(this).data('candidate-id');
    var assetSerialNo = $(this).data('asset-serial-no');
    var report_id=$(this).data('report_id');
    
    $.ajax({
      url: '/confirm_asset_receive',
      method: 'POST',
      data: {
        candidate_id: candidateId,
        asset_serial_no: assetSerialNo,
        report_id:report_id
      },
      success: function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Asset receipt confirmed successfully',
          showConfirmButton: false,
          timer: 1500 // Automatically close after 1.5 seconds
        }).then(function() {
          location.reload();
        });
      },
      error: function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error confirming asset receipt'
        });
      }
    });
  });
  
  
  
  

  $(document).on('click', '.problem-resolved', function() {
    var candidateId = $(this).data('candidate-id');
    var assetSerialNo = $(this).data('asset-serial-no');
    var report_id=$(this).data('report_id');
    
    $.ajax({
      url: '/resolve_problem',
      method: 'POST',
      data: {
        candidate_id: candidateId,
        asset_serial_no: assetSerialNo,
        report_id:report_id
      },
      success: function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Problem resolved successfully',
          showConfirmButton: false,
          timer: 1500 // Automatically close after 1.5 seconds
        }).then(function() {
          location.reload();
        });
      },
      error: function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error resolving problem'
        });
      }
    });
  });
  
