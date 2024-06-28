function showForm() {
  document.getElementById("formContainer").style.display = "block";
  // Automatically scroll down to the form container
  document.getElementById("formContainer").scrollIntoView({ behavior: 'smooth' });
}

// Event listener for cancel button click

$(document).on('click', '#cancelButton', function () {
  // Hide all div elements
  $('.parent_div').addClass('d-none');
 
  
  // Reload the page
  location.reload();
});

function clearForm() {
$('#formContainer input[type="text"]').val('');
$('#formContainer textarea').val('');
// Clear file inputs
$('#add_file').empty();
// Reset word count
$('#wordCount').text('0');
}



$(document).ready(function() {
$('#toggleRoleTextarea').click(function() {
  $('#roleTextarea').toggle();
  $(this).toggleClass('fa-plus-square fa-minus-square');
});

$('#roleTextarea').on('input', function() {
  var textLength = $(this).val().trim().length;
  $('#wordCount').text(textLength);
  if (textLength > 499) {
    $(this).val($(this).val().substring(0, 499));
    alert("You have reached the maximum character limit (500 characters).");
  }
});
})


var isButtonClicked = false; // Flag to track button click

var isButtonClicked = false; // Flag to track button click

$(document).on('click', '#create', function () {
    // Check if the button has already been clicked
    if (isButtonClicked) {
        // If already clicked, return without doing anything
        return;
    }

    // Set the flag to true to indicate the button has been clicked
    isButtonClicked = true;

    var jd_id = $('#input_jd_id2').val();
    var location_state = $('#location_state').val();
    var direct_reporting = $('#direct_reporting').val();
    var indirect_matrix = $('#indirect_matrix').val();
    var location_hq = $('#location_hq').val();
    var team_size = $('#team_size').val();

   
    var division = $('#division').val();
    var roleTextarea = $('#roleTextarea').val();

    // Check if any required field is empty
    if (!location_state || !direct_reporting || !indirect_matrix || !location_hq  || !division  || !team_size) {
        swal.fire({
            title: "Error",
            text: "Please fill in all required fields",
            icon: "error"
        });
        // Reset the flag since the submission failed
        isButtonClicked = false;
        return; // Exit function if any required field is empty
    }

    var formData = new FormData();

    // Append file(s) to the FormData object
    var files = document.querySelectorAll('.multi_input');

    // Loop through each file input and append files to formData
    for (var i = 0; i < files.length; i++) {
        var inputFiles = files[i].files;
        for (var j = 0; j < inputFiles.length; j++) {
            formData.append('files', inputFiles[j]);
        }
    }

    formData.append('jd_id', jd_id);
    formData.append('location_state', location_state);
    formData.append('direct_reporting', direct_reporting);
    formData.append('indirect_matrix', indirect_matrix);
    formData.append('location_hq', location_hq);
    formData.append('team_size', team_size);

   
    formData.append('division', division);
    formData.append('roleTextarea', roleTextarea);

    $.ajax({
        url: '/requirement',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
          success: function (res) {
            if (res && res.message) {
              swal.fire({
                  title: "Successful!",
                  text: `Successfully Inserted with R Id ${res.message}`,
                  icon: "success"
              
              }).then(() => {
                location.reload(); // Reload the page after the Swal dialog is dismissed
              });

         
          } else {
                  swal.fire({
                      title: "Error",
                      text: "Fail",
                      icon: "error"
                  });
              }
            // Reset the flag after submission completes
            setTimeout(function(){// wait for 5 secs(2)
              location.reload(); // then reload the page.(3)
         }, 5000);
        },
        error: function () {
            // Reset the flag in case of an error
            isButtonClicked = false;
        }
    });
  
});

// Re-enable the button when element with id "jd_id" is clicked
$(document).on('click', '#jd_id', function () {
    // Reset the flag to allow the button to be clicked again
    isButtonClicked = false;
});





$(document).ready(function(){ 
var count = 1;

$(document).on('click', '#dyn_input', function () {
  if (count < 4) {
    $('#add_file').append(`
      <div class="row" id="row${count}">
        <div class="col-10">
          <input type="file" id="inp${count}" class="form-control shad_dark multi_input mt-3" accept=".pdf">
        </div>
        <div class="col-1">
          <span class="btn mt-3 rounded-circle f_13" onclick="deleteInput(${count})">❌</span>
        </div>
        <div class="col-1">
        
          <button class="btn btn-preview text-primary preview mt-1" id="preview_btn_${count}">
            <i class="fa fa-eye mt-3"></i> 
          </button>
        </div>
      </div>
    `);
    count++;
  } else {
    alert("You can only upload up to 3 resumes.");
  }
});

window.deleteInput = function(id) {
  $('#row' + id).remove();
  reindexInputs();
  count--;
}


function reindexInputs() {
  // Update IDs and onclick handlers for remaining inputs
  $('#add_file .row').each(function(index) {
    var newIndex = index + 1;
    $(this).attr('id', 'row' + newIndex);
    $(this).find('input[type=file]').attr('id', 'inp' + newIndex);
    $(this).find('span').attr('onclick', 'deleteInput(' + newIndex + ')');
  });
}

$(document).on('click', '.preview', function () {
  var inputId = $(this).closest('.row').find('input[type=file]').attr('id');
  var file = $('#' + inputId)[0].files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#pdfViewer').attr('src', e.target.result);
      $('#pdfModal').modal('show');
    }
    reader.readAsDataURL(file);
  } else {
    alert('No file selected.');
  }
});
});




$(document).on('click', '.requirement', function() {
var get_data=$(this)

var jd_id=$(this).attr('jd_id')
var k_per=$(get_data).attr('k_per')
var jtitle=$(get_data).attr('jtitle')
var func=$(get_data).attr('func')
var business=$(get_data).attr('business')
var about=$(get_data).attr('about')
var role_s=$(get_data).attr('role_s')
var role_res=$(get_data).attr('role_res')
var edu=$(get_data).attr('edu')

document.getElementById("input_jd_id2").value=""
document.getElementById( "input_jd_id2" ).value=jd_id;

var all_text=[[k_per],[role_s],[role_res],[edu]]
var formated_text=[]
for(var i=0; all_text.length>i;i++){
  var sub_arr=[]
var join_text=''

  var stored_text=all_text[i][0]
  for(var k=0;stored_text.length>k;k++){
    
    if(stored_text[k].includes('\u2022')){
      var br='<br>'
      // var und=stored_text[o]==undefined ?" ":stored_text[o];
      // console.log(stored_text[o]==undefined)
   join_text +=br.concat(stored_text[k])
    }
    else{

      join_text +=stored_text[k]
    }  
  }
  join_text.replaceAll(/i/g,"i")
  // join_text.replaceAll(/l/g,"I")
  join_text.replaceAll(/l/g,"l")
  // join_text.replaceAll(/i/g,"i")
  sub_arr.push(join_text)
  formated_text.push(sub_arr)


}

// $('#Job_title').val(jtitle)
$('#p_func').html(func)
$('#p_title').html(jtitle)
// $('#business').val(business)
$('#p_rs').html(formated_text[1])
$('#p_about').html(about)
$('#p_rns').html(formated_text[2])
$('#p_kpi').html(formated_text[0])
$('#p_eq').html(formated_text[3])
// var pdf_cont=$('#printpdf').printThis()
$('.req_tab').removeClass('d-none');
$('#input_jd_id').html(jd_id)




});



$(document).on('click','.dwnld',function(){

  var jd_id = $(this).attr('jd_id');
  var job_ti = $(this).attr('job_ti');
  var func = $(this).attr('func');
  var role_p = $(this).attr('role_p');
  var role_res_p = $(this).attr('role_res_p');
  var k_pe = $(this).attr('k_pe');
  var ed = $(this).attr('ed');
 
 

  $('#p_title').html(job_ti);
  $('#p_func').html(func);
  $('#p_r').html(role_p);
  $('#p_rn').html(role_res_p);
  $('#p_kp').html(k_pe);
  $('#p_e').html(ed);


  $.ajax({
      url: 'reporting_view', 
      type: 'POST',
      data: { jd_id: jd_id }, 
      success: function(response) {
        
        document.getElementById("Reporting").innerHTML="";
        document.getElementById("team_size1").innerHTML="";
        document.getElementById("Location").innerHTML="";

        document.getElementById("Reporting").innerHTML=`${response.result[0].direct_reporting}`;
    
        document.getElementById("Location").innerHTML=`${response.result[0].location_hq}`;
        document.getElementById("team_size1").innerHTML=`${response.result[0].team_size}`;
        
        downpdf()
          console.log('JD ID sent successfully');
      },
      error: function(xhr, status, error) {
         
          console.error('Error sending JD ID:', error);
      }
  });

      // var pdf_cont=$('#printpdf').printThis()
});


function downpdf(){ 
    var element = document.getElementById("printpdf");
    element.classList.remove("d-none");
    html2pdf().from(element).save('job_description.pdf');
    setTimeout(() => {
      element.classList.add("d-none");       
    }, 1500);
   
  }





  // $("#jd_table").DataTable()
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
          "targets": [0],
           "className": "no-sorting"
       }],
       order: [[0, 'desc']],
       initComplete: function() {   
           $(".no-sorting").removeClass('sorting_asc');
       }
    }) 


  })