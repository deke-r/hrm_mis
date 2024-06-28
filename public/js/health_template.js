$(document).ready(function(){
    $(document).on('click','#health_send',function(){
        $('#loader-div').removeClass('d-none')
        var pre=$('#pre').text()
        var candidate_health_id=$(this).attr('candidate_health_id')
        console.log(pre)
        $.ajax({
            method:'POST',
            url:'/health_template_email',
            data:{pre:pre},
            success:function(res){
        $('#loader-div').addClass('d-none')

                if (res === "success") {
                    swal.fire({
                        title: "Successful!",
                        text: `Successfully Send Pre Health Template Candidate Id  ${candidate_health_id}`,
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
    <pre class="f_14 fw_600" id="pre"> Hi ${candidate_name},



Greetings from JACPL!!

Going forward with your employment, we request you to get your Pre Employment Health Check done.

Given below is a list of tests that are mandatory to be conducted.

       

General Body Health

- Complete Blood Count & ESR
- Urine
- ABC Grouping & Rh Typing
- X-ray Chest
- General Physical Examination (with Basic Eye, Basic Ear & Basic Dental Check-up, Height, Weight & BP)

<p class="text-wrap">
Diabetes Panel

- Fasting Blood Sugar
Cardiac Risk Profile

- Cardio Vascular System (ECG) & Total Cholestrol

Fitness Certificate
- Fitness Certificate from authorized MBBS doctor.</p>
<p class="text-wrap">

Note:  The test has to be taken with empty stomach condition ( minimum 12 hours).

 <br>
 <br>
 <br>

You can get it done at any of the recognized hospitals or diagnostic centers in your city; send us the bill for the same and we can get it reimbursed, however, kindly note that the amount should be within Rs. 2000/-
<br>
<br>
<br>
Please note that we need a doctor prescription which mentions your fitness status for the same.
<br>
<br>
<br>
Please make sure to get these done before your joining and confirm us.
<br>
Regards!



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