$(document).ready(function(){
    $(document).on('click','#health_send',function(){
        $('#loader-div').removeClass('d-none')
        var candidate_email=$('#candidate_email').text()
        var pre=$('#pre').text()
        var candidate_health_id=$(this).attr('candidate_health_id')
        console.log(pre)
        $.ajax({
            method:'POST',
            url:'/terminate_template_email',
            data:{pre:pre,candidate_email:candidate_email},
            success:function(res){
        $('#loader-div').addClass('d-none')
                if (res === "success") {
                    swal.fire({
                        title: "Successful!",
                        text: `Successfully Send Terminate Template Candidate Id  ${candidate_health_id}`,
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


This letter serves as a Formal Termination from your employment as after giving so many verbal warnings regarding your performance, we have not seen any changes.

As you are aware, our company values, Client Servicing and consider it a crucial aspect of work ethic.

However, we have been receiving multiple complaints from our clientele regarding your work performance.

Your leniency and negligence towards work has caused a disruption of our services in the market, which is not at all acceptable.

So, The Company has decided to terminate the employment due to the above reasons and your employment with Manthan IT Solutions will end.

This is the Final decision of the Company.

Kindly return your company ID and key card.


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