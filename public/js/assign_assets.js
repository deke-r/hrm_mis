// $(document).ready(function(){
//         $(document).on('click', '#sub_btn', function(){
//             alert('csd')
//         let candidate_id = $('#candidate_id').val();
//         let asset_id = $('#asset_id').val();
//         let asset_type = $('#asset_type').val();
//         let asset_brand = $('#asset_brand').val();
//         let asset_serial_no = $('#asset_serial_no').val();
//         let condition = $('#condition').val(); 

//         let assigned_by = $('#assigned_by').val();
        
    
        
//         let image = $('#image').val()
//         console.log(image,'image_!11')

//         let formData=new FormData()

//         formData.append('candidate_id',candidate_id)
//         formData.append('asset_id',asset_id)
//         formData.append('asset_type',asset_type)
//         formData.append('asset_brand',asset_brand)
//         formData.append('asset_serial_no',asset_serial_no)
//         formData.append('condition',condition)
//         formData.append('assigned_by',assigned_by)
//         formData.append('image',image)

//         $.ajax({
//             url: '/assignasset', 
//             method: 'POST',
//             data: formData,
//             processData:false,
//             contentType:false,
//             success: function(res){ 

//             }

//         });
//     });
// });










// $(document).ready(function () {
//     $('form').submit(function (event) {
//         event.preventDefault();
//         var formData = new FormData($(this)[0]);



//         $.ajax({
//             type: 'POST',
//             url: '/assignasset',
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function (res) {
//                 if (res && res.success) {
//                     Swal.fire({
//                         title: "Good job!",
//                         html: `Asset Assigned Successfully`,
//                         icon: "success"
//                     }).then((result)=>{
//                         if(result.isConfirmed){
//                             location.reload();
//                         }
//                     });
//                 }
//             },
            
//         });
//     });
// });

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);

        // Check the number of selected files
        var files = $('#images')[0].files;
        if (files.length > 5) {
            Swal.fire({
                title: "Error",
                text: "You can upload up to 5 images only.",
                icon: "error"
            });
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/assignasset',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res && res.success) {
                    Swal.fire({
                        title: "Good job!",
                        html: `Asset Assigned Successfully`,
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            location.reload();
                        }
                    });
                }
            },
        });
    });
});





$(document).ready(function() {
    $(document).on('change', '#candidate_id', function() {
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
    $(document).on('change', '#asset_serial_no', function() {
      let asset_no = $(this).val();
  
      $.ajax({
        url: "/check_asset_serial_no",
        method: 'POST',
        data: { asset_no: asset_no },
        success: function(res) {
          if (res.exists) {
            Swal.fire({
              icon: 'warning',
              title: 'Asset Already Assigned',
              text: 'This asset serial number is already assigned.',
            }).then(() => {
              $('#asset_serial_no').val('');
            });
          } 
        },
        error: function(err) {
          console.error('Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while checking the asset serial number.',
          });
          $('#asset_serial_no').val('');
        }
      });
    });
  });
  