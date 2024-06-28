



$(document).on('click', '#offer_letter_btn', function(){
    var candidate_id = $(this).attr('candidate_id');
    var candidate_name = $(this).attr('candidate_name');
    var candidate_email = $(this).attr('candidate_email');


  
  
    
  
    // candidate_name_input=candidate_name.val()


    $('#offer_letter').empty()
    $('#offer_letter').append(`
    <div class="container position-relative p-0 my-2 mx-0 box_sdw10 mt-3">
    <div onClick="this.contentEditable='true';" class="border-dark p-4">
    <pre class="f_14 fw_600" id="pre"><span class='fw-bold'>Dear ${candidate_name},</span>

    <p class="text-wrap"> We thank you for your interest in exploring career opportunity with us. Apropos the discussions and post the selection process, I am excited to extend the Letter of Intent to you, formalizing the role & the emoluments paving way for your joining with us, latest by<span class='fw-bold'> 14th May 2024.</span></p>
<p class="text-wrap">
Request you to take prints of LoI & sign on each page with your acceptance & send back to us a scanned copy for our records. Besides the copy of LoI, we would also need copies of the documents at #1 to 7, as available with you, as mentioned on the sheet 1 of the LoI.
</p>
<p class="text-wrap">
Furthermore, please initiate the severance discussion at your organization at the earliest opportunity and keep sharing copies of your interaction with them for our records. We are excited to have you in the team & look forward to crossing innumerable profession milestone in this journey at JACPL.
</p>
<p class="text-wrap">
Feel free to reach out to us, in case any further information is required. Please note that this communication is being released electronically from the official email ID & thus does not require any signatures.</p>


Regards,

            </pre
  >
    </div>
    <div class="row bgbm"></div>
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="border-center"></div>

    <div class="bottom-right"></div>
    
    <div class="text-center">
        <button class="f_13 mb-3 fw_600 btn bg_b text-light" id="email_send"  candidate_ID1="${candidate_id}" candidate_email2="${candidate_email}">
          Submit
        </button>
      </div>
    
  </div>
    `)

})


// $(document).ready(function(){
//     $(document).on('click','#email_send',function(){
//         var pre=$('#pre').text()
//    var candidate_id= $(this).attr('candidate_ID1')
//    var candidate_email2= $(this).attr('candidate_email2')




//         console.log(candidate_email2)

//         $.ajax({
//             method:'POST',
//             url:'/offer_letter_template_email',
//             data:{pre:pre, candidate_email2:candidate_email2},
//             success:function(res){
//                 if (res === "success") {
//                     swal.fire({
//                         title: "Successful!",
//                         text: `Successfully Send Offer Letter Candidate Id ${candidate_id}`,
//                         icon: "success"
//                     }).then(function(){
//                         location.reload()
//                     })
//                 } else {
//                     swal.fire({
//                         title: "Error",
//                         text: "Not Send Mail To Candidate",
//                         icon: "error"
//                     });
//                 }
                
//             }
//         })
//     })
// })






$(document).ready(function(){
    $(document).on('click','#email_send',function() {
        var candidate_ID1= $(this).attr('candidate_ID1')
        var candidate_email2= $(this).attr('candidate_email2')
        $('#loader-div').removeClass('d-none')
        $('#content-pdf').removeClass('d-none')
        const element = document.getElementById('content-pdf');
        const opt = {
            margin: 0.5,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
        $('#content-pdf').addClass('d-none')

            var pre = $('#pre').text();

          
            const formData = new FormData();
            formData.append('pdf', pdfBlob, 'offer_letter.pdf');
            formData.append('pre', pre);
           
            


            $.ajax({
                type: 'POST',
                url: '/offer_letter_template_email',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
        $('#loader-div').addClass('d-none')

                    if (res === "success") {
                        Swal.fire({
                            title: "Successful!",
                            text: `Successfully Sent Email ${candidate_ID1}`,
                            icon: "success"
                        }).then((result)=>{
                            if(result.isConfirmed){
                              window.location.reload();
                            }
                          })
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to Send Email",
                            icon: "error"
                        });
                    }
                },
                error: function(error) {
                    console.error('Error sending email:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Error sending email",
                        icon: "error"
                    });
                }
            });
        }).catch(function(error) {
            console.error('Error generating PDF:', error);
            Swal.fire({
                title: "Error",
                text: "Error generating PDF",
                icon: "error"
            });
        });
    });
});




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