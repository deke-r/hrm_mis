$(document).ready(function(){
  
    $('#req_assets_table').DataTable({
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
      "ordering": false, 
      "columnDefs": [
        { 
          "orderable": false, 
          "targets": "_all" 
        }
      ],
      initComplete: function() {   
        $(".no-sorting").removeClass('sorting_asc'); // Removes the sorting class
      }
    });      

});


$(document).ready(function(){
    split_mailcc()
})

$(document).on('change',function(){
    split_mailcc()
})

function split_mailcc(){

    let tr=$('#req_assets_table').find('tbody').find('tr')

    tr.each(function(){
        let mail_cc_td=tr.find('.mail_cc_td')
        let mail_cc_td_text=mail_cc_td.html().trim()
        let mail_cc_split=mail_cc_td_text.split(';')
        
        let append_div=''
        for(let i=0; i<mail_cc_split.length; i++){
            append_div+=`<div>${mail_cc_split[i]}</div>`
        }
        mail_cc_td.html(append_div)

    })
}





// ----------accecpt js start------------- 
// ----------accecpt js start------------- 

$(document).on('click','#accecpt_btn',function(){
    
    let assets_req_id=$(this).attr('assets_req_id')
    let cadidate_id=$(this).attr('cadidate_id')
    let candidate_name=$(this).attr('candidate_name')
    let asset_type=$(this).attr('asset_type')
    console.log(cadidate_id,candidate_name, asset_type,'first_first')

    $('#assets_req_id').val(assets_req_id)
    $('#candidate_id_modal').val(cadidate_id)
    $('#candidate_name_modal').val(candidate_name)
    $('#asset_type_modal').val(asset_type)
    

    $(document).on('change','#images',function(event){
        const input = event.target;
        // console.log(input,'input_@222')
        const maxFiles = 5;
        const files = input.files;
        if (files.length > maxFiles) {
            alert(`You can only select up to ${maxFiles} images.`);
            input.value = '';
        }        

    })

    

})



$(document).on('click', '#accecpt_submit_btn', function() {
    let assets_req_id = $('#assets_req_id').val();
    let candidate_id = $('#candidate_id_modal').val();
    let candidate_name = $('#candidate_name_modal').val();
    let asset_type = $('#asset_type_modal').val();
    let asset_brand = $('#asset_brand_modal').val();
    let asset_serial_no = $('#asset_serial_no_modal').val();
    let condition = $('#condition_modal').val();
    let assigned_by = $('#assigned_by_modal').val();
    let images = $('#images')[0].files;
console.log(assets_req_id,'assets_req_id')
    // // Validate image count
    // if (images.length > 5) {
    //     alert("You can only upload up to 5 images.");
    //     return;
    // }

    
    if(!asset_brand && !asset_serial_no && !condition ){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill mandatory fileds",
          });
        return;
    }

    let formData = new FormData();
    formData.append('assets_req_id', assets_req_id);
    formData.append('candidate_id', candidate_id);
    formData.append('candidate_name', candidate_name);
    formData.append('asset_type', asset_type);
    formData.append('asset_brand', asset_brand);
    formData.append('asset_serial_no', asset_serial_no);
    formData.append('condition', condition);
    formData.append('assigned_by', assigned_by);

    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }

    $.ajax({
        url: '/assets_req_accecpt',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            if(res.status=='success'){
                Swal.fire({
                    title: "Success!",
                    html: `Data Successfully Updated`,
                    icon: "success"
                }).then(function(){
                    location.href='/request_assets_view'
                })
            }
        },
        error: function(err) {
            console.error(err);
        }
    });
});
// ----------accecpt js end------------- 
// ----------accecpt js end------------- 


$(document).on('click','#reject_btn',function(){
    let assets_req_id=$(this).attr('assets_req_id')
    let cadidate_id=$(this).attr('cadidate_id')
    let candidate_name=$(this).attr('candidate_name')

    console.log(assets_req_id,'assets_req_id_assets_req_id')
    $('#assets_req_id').val(assets_req_id)
    $('#candidate_id').val(cadidate_id)
    $('#candidate_name').val(candidate_name)
    
})


$(document).on('click','#reject_submit_btn',function(){    
    let assets_req_id = $('#assets_req_id').val();
    let cadidate_id=$('#cadidate_id').val()
    let candidate_name=$('#candidate_name').val()
    let reason_for_rej=$('#reason_for_rej').val()
    // console.log(
    //     assets_req_id,cadidate_id,candidate_name,reason_for_rej,'kkkkkkkk'
    // )

    if(!reason_for_rej){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill mandatory fileds",
          });
          return;
    }


    $.ajax({
        url:'/assets_req_reject',
        method:'post',
        data:{
            assets_req_id:assets_req_id,
            cadidate_id:cadidate_id,
            candidate_name:candidate_name,
            reason_for_rej:reason_for_rej
        },
        success:function(res){
            if(res.status=='success'){
                Swal.fire({
                    title: "Success!",
                    html: `Remarks Successfully Updated`,
                    icon: "success"
                }).then(function(){
                    location.href='/request_assets_view'
                })
            }
        },
        error: function(err) {
            console.error(err);
        }
    })

})











