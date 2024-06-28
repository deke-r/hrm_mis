$(document).ready(function(){
    $(document).on('click','#health_send',function(){
        $('#loader-div').removeClass('d-none')
        var pre=$('#pre').text()
        var candidate_email=$('#candidate_email').text()
        console.log(candidate_email)
        var candidate_health_id=$(this).attr('candidate_health_id')
        console.log(pre)
        $.ajax({
            method:'POST',
            url:'/warning_template_email',
            data:{pre:pre,candidate_email:candidate_email},
            success:function(res){
        $('#loader-div').addClass('d-none')
                if (res === "success") {
                    swal.fire({
                        title: "Successful!",
                        text: `Successfully Send Warning Template Candidate Id  ${candidate_health_id}`,
                        icon: "success"
                    })
                } else {
                    swal.fire({
                        title: "Error",
                        text: "Not Send Mail To Candidate",
                        icon: "error"
                    });
                }
                
            }
        })
    })
})



$(document).on('click', '#button' ,function(){
    var candidate_id=$(this).attr('candidate_id')
    var candidate_name= $(this).attr('candidate_name')

   
    $('#form_cont').empty()
    $('#form_cont').append(`<div class="container position-relative  p-0 my-5 mx-0 box_sdw10" >
    <div onClick="this.contentEditable='true';" class="  border-dark p-4">
    <pre class="f_14 fw_600" id="pre">



Dear ${candidate_name}


As we have recently discussed about your Unprofessional Behavior and we have seen the changes in it.

So, we are issuing this letter to warn you about the same.

We hereby expect you to take necessary actions to improve it, otherwise it leads to strict action against you.                                                                                                              
Thanks and Regards,
HR Department
www.manthanitsolutions.com


</pre>
</div>


<div class="row bgbm"></div>
<div class="top-left"></div>
<div class="top-right"></div>
<div class="bottom-left"></div>
<div class="border-center"></div>

<div class="bottom-right"></div>
<div class="text-center">

<button type="button" id="health_send" candidate_health_id="${candidate_id}" class="btn btn-primary mb-3">Send Mail</button>
</div>
</div>
    `)
})



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
          "targets": [0,1,2,3,4,5],
      
           "className": "no-sorting"
       }],
       
       initComplete: function() {   
           $(".no-sorting").removeClass('sorting_asc');
       }
    }) 
  })