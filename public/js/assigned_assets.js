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