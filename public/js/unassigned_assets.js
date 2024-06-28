$(document).ready(function() {
    $('#jd_table').DataTable({
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
    $(document).on('keyup', '#candidate_id', function() {
      $('#candidate_name').val('');
      let c_id = $(this).val();
  
      $.ajax({
        url: "/assign_assets_candidate_details",
        method: 'POST',
        data: { c_id: c_id },
        success: function(res) {
          if (res.candidate_name) {
            $('#candidate_name').val(res.candidate_name);
          } else {
            $('#candidate_name').val('');
          }
        },
        error: function(err) {
          console.error('Error:', err);
          $('#candidate_name').val('');
        }
      });
    });
  });
  
  
  $(document).ready(function() {
    $('.assign-btn').on('click', function() {
      var assetBrand = $(this).data('asset-brand');
      var assetSerialNo = $(this).data('asset-serial-no');

      $('#asset_brand').val(assetBrand);
      $('#asset_serial_no').val(assetSerialNo);
    });
  });


  $(document).ready(function(){
    $(document).on('click', '#sub_btn', function(){
      var asset_brand = $('#asset_brand').val();
      var asset_serial_no = $('#asset_serial_no').val();
      var candidate_id = $('#candidate_id').val();
      var candidate_name = $('#candidate_name').val();

      if (!candidate_id) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Candidate ID is required!'
        });
        return;
      }

      $.ajax({
        url: '/reassign_assets',
        method: 'POST',
        data: {
          asset_brand: asset_brand,
          asset_serial_no: asset_serial_no,
          candidate_id: candidate_id,
          candidate_name: candidate_name
        },
        success: function(res){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Asset reassigned successfully!',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            $('#uniqueModal').modal('hide');
            location.reload();
          });
        },
        error: function(err){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while reassigning the asset.'
          });
        }
      });
    });
  });







  
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
          $img.attr('src', imgUrl); 
          $carouselItem.append($img);
          $carouselInner.append($carouselItem);
        });
      }

    $('.btn_primary').click(function() {
      var imgUrls = [];
      for (var i = 1; i <= 5; i++) {
        var imgAttr = $(this).attr('img_' + i);
        if (imgAttr) {
          imgAttr = imgAttr.replace(/"/g, '');
          imgAttr = imgAttr.replace(/\\/g, '');
          imgUrls.push(imgAttr);
        }
      }
      populateCarousel(imgUrls);
    });
  });