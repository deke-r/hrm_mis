$(document).on('click','#approved_id',function(){
    let candidate_id=$('#candidate_id').text().trim()
    let request_id=$('#request_id').text()
    let remarks=$('#remarks').val().trim()
    let cand_email=$('#cand_email').val();
    let candidate_name=$('#candidate_name').text()



    if (!remarks) {
        Swal.fire({
            title: 'Error',
            text: 'Remarks cannot be empty. Please enter your remarks.',
            icon: 'error'
        });
        return;
    }


    $('#loader-div').removeClass('d-none')

    $.ajax({
        url:'/approved_wfh_status_update',
        method:'post',
        data:{
            remarks:remarks,
            candidate_id:candidate_id,
            request_id:request_id,
            cand_email:cand_email,
            candidate_name:candidate_name
        },
        success:function(res){
$('#loader-div').addClass('d-none')

            Swal.fire({
                title:'Approved',
                html:`Work From Home request Approved <br> Request ID - ${request_id}`,
                icon:'success',
            })
            .then(function(){
                window.location='/manage_wfh_req'
            })
        }
    })    
})

$(document).on('click', '#reject_id', function() {
    let candidate_id = $('#candidate_id').text().trim();
    let request_id = $('#request_id').text();
    let remarks = $('#remarks').val().trim();
    let cand_email=$('#cand_email').val();
    let candidate_name=$('#candidate_name').text()


    if (!remarks) {
        Swal.fire({
            title: 'Error',
            text: 'Remarks cannot be empty. Please enter your remarks.',
            icon: 'error'
        });
        return;
    }

$('#loader-div').removeClass('d-none')
    $.ajax({
        url: '/reject_wfh_id_status_update',
        method: 'post',
        data: {
            remarks: remarks,
            candidate_id: candidate_id,
            request_id: request_id,
            cand_email:cand_email,
            candidate_name:candidate_name
        },
        success: function(res) {
$('#loader-div').addClass('d-none')

            Swal.fire({
                title: 'Rejected',
                html: `Work From Home request Rejected <br> Request ID - ${request_id}`,
                icon: 'success'
            })
            .then(function() {
                window.location = '/manage_wfh_req';
            });
        }
    });
});


$(document).on('click','#imf',function(){
    $('#imf_modal').click()
})