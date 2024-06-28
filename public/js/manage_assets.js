$(document).ready(function(){
    $('#view_table').DataTable({
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
      "order": [[0, "desc"]], 
      "columnDefs": [
        { 
          "orderable": false, 
          "targets": [0,1,2,3,4,5,6,7,8], 
          "className": "no-sorting"
        }
      ],
      initComplete: function() {   
        $(".no-sorting").removeClass('sorting_asc');
      }
    });
  });



  $(document).ready(function () {
    $('form').submit(function (event) {
      $('#loader-div').removeClass('d-none')
        event.preventDefault();



        var formData = new FormData($(this)[0]);

        // Add asset_id to the formData
        var assetId = $('#asset_id').val();
        formData.append('asset_id1', assetId);

        console.log(formData); 

        $.ajax({
            type: 'POST',
            url: '/create_report',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              $('#loader-div').addClass('d-none')
              Swal.fire({
                    title: 'Success!',
                    text: 'Your data was submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload()
                    }
                });
                console.log(response);
            },
            error: function(xhr, status, error) {
              $('#loader-div').addClass('d-none')
                console.error(xhr.responseText);
            }
        });
    });
});




// (document).ready(function(){
//     ("#custom_button").on("click" , function(){
//         var assetId = this.("#")
//     })

// })


// $(document).ready(function(){
//     $("custom_button").on("click", function(){
//         var assetId = $(this).data("data-assetId");
//         $('#asset_id').val(assetId);
//     });
// });

$(document).ready(function() {
    function populateCarousel(imgUrls) {
        var $carouselInner = $('#carouselExample .carousel-inner');
        $carouselInner.empty();
        $.each(imgUrls, function(index, imgUrl) {
          var $carouselItem = $('<div class="carousel-item"></div>');
          if (index === 0) {
            $carouselItem.addClass('active');
          }
          var $img = $('<img class="d-block w-100">');
          $img.attr('src', imgUrl); // Set the src attribute directly
          $carouselItem.append($img);
          $carouselInner.append($carouselItem);
        });
      }

    $('.btn_primary').click(function() {
      var imgUrls = [];
      for (var i = 1; i <= 5; i++) {
        var imgAttr = $(this).attr('img_' + i);
        if (imgAttr) {
          // Remove extra double quotes and escape characters
          imgAttr = imgAttr.replace(/"/g, '');
          imgAttr = imgAttr.replace(/\\/g, '');
          imgUrls.push(imgAttr);
        }
      }
      populateCarousel(imgUrls);
    });
  });

// kapil //

$(document).ready(function() {
    $('#staticBackdrop').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var assetId = button.data('asset-id'); // Extract info from data-* attributes

        console.log("assetId" , assetId)
        var modal = $(this);
        modal.find('.modal-body input#asset_id').val(assetId);
    });
});






$(document).ready(function() {
  $(document).on('click', '.btn-confirm-asset', function() {
    var assetSerialNo = $(this).data('asset-id');
    
    $.ajax({
      url: '/confirm_asset_submit',
      method: 'POST',
      data: {
        asset_serial_no: assetSerialNo
      },
      success: function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Asset submission confirmed successfully',
          showConfirmButton: false,
          timer: 1500  
        }).then(function() {
          location.reload();
        });
      },
      error: function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error confirming asset submission'
        });
      }
    });
  });
});

