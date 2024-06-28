// const { clip } = require("pdf-lib");

$(document).ready(function(){
  $(document).on('click','.view_req',function(){

    // ---------------
    let tr=$(this).closest('tr')
    let td=tr.find('td').eq(2).text().trim()
    console.log(td,'td_1111')
    $('#level_val').empty()
    $('#level_val').val(td)
    if(td==''){
      $('#add_level').addClass('d-none')
      $('#add_level_1').removeClass('d-none')
    }
    else if(td !==''){
      $('#add_level').removeClass('d-none')
      $('#add_level_1').addClass('d-none')
    }
    
    // ---------------

    $('#printpdf').removeClass('d-none')
    $('#assign_interview_div').removeClass('d-none')
      var get_data = $(this);

      var jd_id = get_data.attr('jd_id');
      var r_id = get_data.attr('r_id');
      console.log(r_id,'r_id_r_idr_id')

      // document.getElementById("input_jd_id_1").value=""
      // document.getElementById("input_jd_id_1").value="jd_id"

      console.log(jd_id,'jd_id_dfjkjdjfldjlfdjfdfdlj')
      var k_per = get_data.attr('k_per');
      var jtitle = get_data.attr('jtitle');
      var func = get_data.attr('func');
      var business = get_data.attr('business');
      var about = get_data.attr('about');
      var role_s = get_data.attr('role_s');
      var role_res = get_data.attr('role_res');
      var edu = get_data.attr('edu');
      var lstate = get_data.attr('lstate');
      var l_hq = get_data.attr('l_hq');
      var d_rep = get_data.attr('d_rep');
      var ind_mat = get_data.attr('ind_mat');
      var t_size = get_data.attr('t_size');
      var divi = get_data.attr('divi');

      

      var refe = get_data.attr('refe');
      var refe1 = refe.split(',');

      // $('#input_jd_id_1').val(jd_id);
      $('#input_jd_id_1').val(jd_id);
      $('#input_r_id_1').val(r_id);
      $('#p_func').html(func);
      $('#p_title').html(jtitle);
      $('#p_rs').html(role_s);
      $('#p_about').html(about);
      $('#p_rns').html(role_res);
      $('#p_kpi').html(k_per);
      $('#p_eq').html(edu);
      $('#loc_s').html(lstate);
      $('#d_rept').html(d_rep);
      $('#ind_mat').html(ind_mat);
      $('#loc').html(l_hq);
      $('#team_s').html(t_size);
      $('#divi').html(divi);

      // Clear previous PDF containers
      $('.pdf-container').empty();

      // Loop through each filename
      for (let i = 0; i < refe1.length; i++) {
          let fileName = refe1[i].trim();
          
          // Check if the filename is empty
          if (!fileName) {
              // If filename is empty, show a message indicating no resume uploaded
              $(`#pdf-container${i + 1}`).html('<p>No resume uploaded</p>');
          } else {
              // If filename is defined, embed the PDF file
              $(`#pdf-container${i + 1}`).html(`<embed src="/static/pdf/${fileName}" width="100%" height="400px"></embed>`);
          }
      }

      $('#level_app').empty()
      $('#level_app_1').empty()




// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------




// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------


  });
});

        
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------





$(document).on('click','#add_level_1',function(){
  $('#level_app').empty()
  
  var jd_id = $('#input_jd_id_1').val();
  console.log(jd_id,'jd_id_jd_idjd_idhhhhhhhhhhhhhhhhhhh')
  
  var r_id = $('#input_r_id_1').val();
  console.log(r_id,'r_id_hhhhhhhhhhhhhh')
  
 




  $.ajax({
    url:'/get_emp',
    method:'post',
    data:{ 
      jd_id:jd_id,
      r_id:r_id
     },
    success:function(res){
      console.log(res.data1,'data1_jfkdfjfd')
      console.log(res.data2,'data2_jfkdfjfd')
      let option=''
  for(var i=0; i<res.data1.length; i++){

    option +=`<option value='${res.data1[i].Full_name}' >${res.data1[i].Full_name}</option>`

  }

  

  

  // console.log(res.data2[0].jdid,'res.data2.jdid_res.data2.jdid')
  // console.log(res.data2[0].jdid==null,'aaaaaaaaaaaaaa')
  // console.log(res.data2[0].jdid==undefined ,'bbbbbbbbbbb')
  // console.log(res.data2[0].jdid=='','ccccccccccccc')
console.log(res.data2[0],'res_112222')
  
    if(res.data2[0]==''|| res.data2[0]==undefined ){
        console.log('leve_1_leve_1_leve_1')
      let level_c=1 
      $('#level_app_1').empty()
      $('#level_app_1').append(`       
      <div class="row mb-3 shadow rounded-2 px-0 py-2">
      
        <div class="col-12 d-flex fw-bold"><span id="level" name="level">Interviewer-${level_c}</span> </div>
        <div class="col-md-4  f_13">
            
        <label for="emp_name" class="f_13">Emp. Code:Name</label>
    <input list="emp_name_list" name="emp_name" id="emp_name" class="form-control f_13">
    <datalist id="emp_name_list">
        
        ${option}
    </datalist> 
        </div>
        <div class="col-md-4  f_13">
            <label for="date" class="f_13">Interview Date</label>
            <input name="date_time" id="date_time" type="datetime-local" class="form-control f_13 ">
        </div>
      
        <div class="col-md-4">
          <label for="cand_email" class="f_13">Candidate Email ID</label>
          <input type="email" class="form-control f_13" name="cand_email" id="cand_email" placeholder="Enter Candidate Email ID">
        </div>

    

      
        <div class="col-md-4 ">
            <label for="cand" class="f_13">Candidate Name</label>
            <input type="text" name="cand_name" id="cand_name" class="form-control f_13" placeholder="Enter Candidate Name">
        </div>
      
      
        <div class="col-md-4 ">
          <label for="for="cand_mobile_no" class="f_13" >Candidate Mobile No.</label>
          <input type="number"  class="form-control f_13" name="cand_mobl_no" id="cand_mobl_no" placeholder="Enter Candidate Mobile No.">
        </div>  
   

      
        <div class="col-md-4">
        <label for="resume" class="f_13">Resume Upload</label>
        <input type="file" name="resume" id="resume" class="form-control f_13" >
      </div>

   

        <!-- Source of Profile dropdown with remarks section -->
        <div class="col-md-4">
            <label for="sour_of_profile" class="f_13">Source of Profile</label>
            <select name="sour_of_profile" id="sour_of_profile" class="form-select f_13" onchange="showRemarks()">
                <option value="" disabled selected class="f_13">--Source of Profile</option>
                <option value="Naukri" class="f_13">Naukri</option>
                <option value="Social Media" class="f-13"> Social Media</option>
                <option value="Internal Refernce" class="f_13">Internal Refernce</option>
                <option value="Consultant" class="f-13">Consultant</option>
                <option value="Referral" class="f-13">Referral</option>
                <option value="Others" class="f-13">Others</option>
            </select>
            <div id="remarksSection" style="display: none;"   class="col-md-6 mt-4 m-2 mx-3">
            <label for="remarks">Remarks:</label>
            <textarea id="remarks" name="remarks" rows="4" cols="40"></textarea>
        </div>
        
        </div>




      <div class="col-md-4 ">
      <label for="mode_int" class="f_13">Mode of interview</label>
          <select name="mode_inter" id="mode_inter"  class="form-select f_13" onchange="showMode()">
      <option value="" disabled selected class="f_13">--Select Int. Mode</option>
          <option value="Telephonic" class="f_13">Telephonic</option>
          <option value="Face To Face" class="f_13">Face To Face</option>
          <option value="ZOOM/MST" class="f_13">ZOOM/MST TEAMS </option>
      </select>
      <div id="textsection" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Meeting Link</label>
      <textarea id="url" name="remarks" rows="4" cols="40"></textarea>
  </div>

    <div id="textsection1" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Address</label>
      <textarea id="address" name="remarks" rows="4" cols="40"></textarea>
  </div>
      </div>
   
  
        <div class="col-2 data">
          <button id="assg_interview_submit_btn" type="submit"   class="btn  btn-parimary  f_11 btn_color">Submit</button>
        </div>
      
      </div>
      
              `)

              
// Include SweetAlert2 library in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Attach event listener to the email input field
$('#cand_email').on('blur', function () {
  const email = $(this).val();
  if (!validateEmail(email)) {
      $('#email_error').hide(); // Ensure old error message is hidden
      $(this).val(''); // Clear the invalid email
      swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Please enter a valid email address.',
      });
  } else {
      $('#email_error').hide();
  }
});

// Optional: Prevent form submission if the email is invalid
$('#assg_interview_submit_btn').on('click', function (e) {
  const email = $('#cand_email').val();
  if (!validateEmail(email)) {
      e.preventDefault();
      $('#email_error').hide(); // Ensure old error message is hidden
      $('#cand_email').val(''); // Clear the invalid email
      swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Please enter a valid email address.',
      });
  }
});





    
            }



            

  // Function to disable past dates
// function disablePastDates() {
//   var selectedDate = new Date(document.getElementById('date_time').value);
//   var currentDate = new Date();

//   // Check if selected date is in the past
//   if (selectedDate < currentDate) {
//       document.getElementById('date_time').value = ''; // Clear the input value
//   }
// }

function checkDate() {
  var selectedDate = new Date(document.getElementById('date_time').value);
  var currentDate = new Date();
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Check if selected date is within the range of 7 days prior to current date or later
  if (selectedDate >= sevenDaysAgo || selectedDate >= currentDate) {
      // Date is within range, do nothing or you can add your logic here
      console.log('Date is within range');
  } else {
      alert('Please select a date within the range of 7 days prior to the current date or later.');
      document.getElementById('date_time').value = ''; // Clear the input value
  }
}





// Add event listener to the datetime-local input
// document.getElementById('date_time').addEventListener('change', checkDate);


// Add event listener to the datetime-local input
document.getElementById('date_time').addEventListener('change', checkDate);


// Add event listener to the datetime-local input to disable past dates
// document.getElementById('date_time').addEventListener('change', disablePastDates);

  
  

}




})

})



function showRemarks() {
  var sourceOfProfile = document.getElementById("sour_of_profile");
  var remarksSection = document.getElementById("remarksSection");

  if (sourceOfProfile.value === "Social Media" || sourceOfProfile.value === "Consultant" || sourceOfProfile.value === "Referral") {
      remarksSection.style.display = "block";
  }
  
   else {
      remarksSection.style.display = "none";
  }
}


function showMode() {
  var sourceOfProfile = document.getElementById("mode_inter");
  var textsection = document.getElementById("textsection");
  var textsection1 = document.getElementById("textsection1");

  if (sourceOfProfile.value === "ZOOM/MST") {
      textsection.style.display = "block";
      textsection1.style.display = "none"; // Hide the Face To Face section
  } else if (sourceOfProfile.value === "Face To Face") {
      textsection.style.display = "none"; // Hide the ZOOM/MST section
      textsection1.style.display = "block"; // Show the Face To Face section
  } else {
      textsection.style.display = "none";
      textsection1.style.display = "none";
  }
}





$(document).on('click','#add_level',function(){
  
  $('#level_app_1').empty()

  var jd_id = $('#input_jd_id_1').val();
  console.log(jd_id,'jd_id_jd_idjd_idhhhhhhhhhhhhhhhhhhh')

  var r_id = $('#input_r_id_1').val();
  console.log(r_id,'r_id_hhhhhhhhhhhhhhhhhhhh')

  let level_val=$('#level_val').val() 
  console.log(level_val,'level_val_level_val')

  $.ajax({
    url:'/get_emp',
    method:'post',
    data:{ jd_id:jd_id, r_id:r_id },
    success:function(res){
      console.log(res.data1,'data1_jfkdfjfd')
      console.log(res.data2,'data2_jfkdfjfd')
      let option=''
  for(var i=0; i<res.data1.length; i++){

    option +=`<option value='${res.data1[i].Full_name}' >${res.data1[i].Full_name}</option>`

  }
  

    
for(let i=0; i<res.data2.length; i++){



  let level=res.data2[i].level
  let status=res.data2[i].status
  let candidate_name=res.data2[i].Candidate_Name
  let candidate_mobile=res.data2[i].candidate_mobile
  let candidate_email=res.data2[i].candidate_email
  let source_of_profile=res.data2[i].source_of_profile
  let remarks=res.data2[i].remarks

  if(level== level_val && (status =='Next Level' ) ){

    if(res.data2[i].level=='Interviewer-1' ){
      // console.log('level_2_level_2_level_2')
      let level_c=2 
      $('#level_app').empty()
      // console.log('abcabc')

      $('#level_app').append(`       
      <div class="row mb-3 shadow rounded-2 px-0 py-2">
      
        <div class="col-12 d-flex fw-bold"><span id="level" name="level">Interviewer-${level_c}</span> </div>
        <div class="col-md-4  f_13">
            
        <label for="emp_name" class="f_13">Emp. Code:Name</label>
    <input list="emp_name_list" name="emp_name" id="emp_name" class="form-control f_13">
    <datalist id="emp_name_list">
        
        ${option}
    </datalist>  
        </div>
        <div class="col-md-4 picker-container f_13">
            <label for="date" class="f_13">Interview Date</label>
            <input name="date_time" id="date_time"  type="datetime-local" class="form-control f_13 ">
        </div>
      
        <div class="col-md-4">
          <label for="cand_email" class="f_13">Candidate Email ID</label>
          <input type="email" class="form-control f_13" name="cand_email" id="cand_email" placeholder="Enter Candidate Email ID" value="${candidate_email}" disabled>
        </div>

    

      
        <div class="col-md-4 ">
            <label for="cand" class="f_13">Candidate Name</label>
            <input type="text" name="cand_name" id="cand_name" class="form-control f_13" placeholder="Enter Candidate Name" value="${candidate_name}" disabled>
        </div>
      
      
        <div class="col-md-4 ">
          <label for="for="cand_mobile_no" class="f_13" >Candidate Mobile No.</label>
          <input type="number"  class="form-control f_13" name="cand_mobl_no" id="cand_mobl_no" placeholder="Enter Candidate Mobile No." value="${candidate_mobile}" disabled>
        </div>  
   

      
        <div class="col-md-4">
        <label for="resume" class="f_13">Resume Upload</label>
        <input type="file" name="resume" id="resume" class="form-control f_13" >
      </div>

   


      <!-- Source of Profile dropdown with remarks section -->
      <div class="col-md-4">
          <label for="sour_of_profile" class="f_13">Source of Profile</label>
          <select name="sour_of_profile" id="sour_of_profile" class="form-select f_13" disabled>
              <option value="${source_of_profile}" disabled selected class="f_13">${source_of_profile}</option>                
          </select>
          <div id="remarksSection" style="display: none;"   class="col-md-6 mt-4 m-2 mx-3">
          <label for="remarks">Remarks:</label>
          <textarea id="remarks" name="remarks" rows="4" cols="40" disabled>${remarks}</textarea>
      </div>
        
        </div>




      <div class="col-md-4 ">
      <label for="mode_int" class="f_13">Mode of interview</label>
          <select name="mode_inter" id="mode_inter"  class="form-select f_13" onchange="showMode()">
      <option value="" disabled selected class="f_13">--Select Int. Mode</option>
          <option value="Telephonic" class="f_13">Telephonic</option>
          <option value="Face To Face" class="f_13">Face To Face</option>
          <option value="ZOOM/MST" class="f_13">ZOOM/MST TEAMS </option>
      </select>
      <div id="textsection" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Meeting Link</label>
      <textarea id="url" name="remarks" rows="4" cols="40"></textarea>
  </div>

    <div id="textsection1" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Address</label>
      <textarea id="address" name="remarks" rows="4" cols="40"></textarea>
  </div>
      </div>
   
  
        <div class="col-2 data">
          <button id="assg_interview_submit_btn" type="submit"   class="btn  btn-parimary  f_11 btn_color">Submit</button>
        </div>
      
      </div>
      
              `);
    }


    else if(res.data2[i].level=='Interviewer-2'){
      let level_c=3 
      // console.log('level_3_level_3_level_3')
      $('#level_app').empty()
      $('#level_app').append(`       
      <div class="row mb-3 shadow rounded-2 px-0 py-2">
      
        <div class="col-12 d-flex fw-bold"><span id="level" name="level">Interviewer-${level_c}</span> </div>
        <div class="col-md-4  f_13">
            
        <label for="emp_name" class="f_13">Emp. Code:Name</label>
    <input list="emp_name_list" name="emp_name" id="emp_name" class="form-control f_13">
    <datalist id="emp_name_list">
        
        ${option}
    </datalist> 
        </div>
        <div class="col-md-4 picker-container f_13">
            <label for="date" class="f_13">Interview Date</label>
            <input name="date_time" id="date_time" type="datetime-local" class="form-control f_13 ">
        </div>
      
        <div class="col-md-4">
          <label for="cand_email" class="f_13">Candidate Email ID</label>
          <input type="email" class="form-control f_13" name="cand_email" id="cand_email" placeholder="Enter Candidate Email ID" value="${candidate_email}" disabled>
        </div>

    

      
        <div class="col-md-4 ">
            <label for="cand" class="f_13">Candidate Name</label>
            <input type="text" name="cand_name" id="cand_name" class="form-control f_13" placeholder="Enter Candidate Name" value="${candidate_name}" disabled>
        </div>
      
      
        <div class="col-md-4 ">
          <label for="for="cand_mobile_no" class="f_13" >Candidate Mobile No.</label>
          <input type="number"  class="form-control f_13" name="cand_mobl_no" id="cand_mobl_no" placeholder="Enter Candidate Mobile No." value="${candidate_mobile}" disabled>
        </div>  
   

      
        <div class="col-md-4">
        <label for="resume" class="f_13">Resume Upload</label>
        <input type="file" name="resume" id="resume" class="form-control f_13" >
      </div>

   

        
      <!-- Source of Profile dropdown with remarks section -->
      <div class="col-md-4">
          <label for="sour_of_profile" class="f_13">Source of Profile</label>
          <select name="sour_of_profile" id="sour_of_profile" class="form-select f_13" disabled>
              <option value="${source_of_profile}" disabled selected class="f_13">${source_of_profile}</option>                
          </select>
          <div id="remarksSection" style="display: none;"   class="col-md-6 mt-4 m-2 mx-3">
          <label for="remarks">Remarks:</label>
          <textarea id="remarks" name="remarks" rows="4" cols="40" disabled>${remarks}</textarea>
      </div>
        
        </div>




      <div class="col-md-4 ">
      <label for="mode_int" class="f_13">Mode of interview</label>
          <select name="mode_inter" id="mode_inter"  class="form-select f_13" onchange="showMode()">
      <option value="" disabled selected class="f_13">--Select Int. Mode</option>
          <option value="Telephonic" class="f_13">Telephonic</option>
          <option value="Face To Face" class="f_13">Face To Face</option>
          <option value="ZOOM/MST" class="f_13">ZOOM/MST TEAMS </option>
      </select>
      <div id="textsection" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Meeting Link</label>
      <textarea id="url" name="remarks" rows="4" cols="40"></textarea>
  </div>

    <div id="textsection1" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Address</label>
      <textarea id="address" name="remarks" rows="4" cols="40"></textarea>
  </div>
      </div>
   
  
        <div class="col-2 data">
          <button id="assg_interview_submit_btn" type="submit"   class="btn  btn-parimary  f_11 btn_color">Submit</button>
        </div>
      
      </div>
      
              `);
    }

    else if(res.data2[i].level=='Interviewer-3'){
      let level_c=4 
      // console.log('level_4_level_4_level_4')
      $('#level_app').empty()
      $('#level_app').append(`       
      <div class="row mb-3 shadow rounded-2 px-0 py-2">
      
        <div class="col-12 d-flex fw-bold"><span id="level" name="level">Interviewer-${level_c}</span> </div>
        <div class="col-md-4  f_13">
            
        <label for="emp_name" class="f_13">Emp. Code:Name</label>
    <input list="emp_name_list" name="emp_name" id="emp_name" class="form-control f_13">
    <datalist id="emp_name_list">
        
        ${option}
    </datalist> 
        </div>
        <div class="col-md-4  f_13">
            <label for="date" class="f_13">Interview Date</label>
            <input name="date_time" id="date_time" type="datetime-local" class="form-control f_13 ">
        </div>
      
        <div class="col-md-4">
          <label for="cand_email" class="f_13">Candidate Email ID</label>
          <input type="email" class="form-control f_13" name="cand_email" id="cand_email" placeholder="Enter Candidate Email ID" value="${candidate_email}" disabled>
        </div>

    

      
        <div class="col-md-4 ">
            <label for="cand" class="f_13">Candidate Name</label>
            <input type="text" name="cand_name" id="cand_name" class="form-control f_13" placeholder="Enter Candidate Name" value="${candidate_name}"disabled>
        </div>
      
      
        <div class="col-md-4 ">
          <label for="for="cand_mobile_no" class="f_13" >Candidate Mobile No.</label>
          <input type="number"  class="form-control f_13" name="cand_mobl_no" id="cand_mobl_no" placeholder="Enter Candidate Mobile No." value="${candidate_mobile}" disabled>
        </div>  
   

      
        <div class="col-md-4">
        <label for="resume" class="f_13">Resume Upload</label>
        <input type="file" name="resume" id="resume" class="form-control f_13"  >
      </div>

   

        <!-- Source of Profile dropdown with remarks section -->
        <div class="col-md-4">
            <label for="sour_of_profile" class="f_13">Source of Profile</label>
            <select name="sour_of_profile" id="sour_of_profile" class="form-select f_13" disabled>
                <option value="${source_of_profile}" disabled selected class="f_13">${source_of_profile}</option>                
            </select>
            <div id="remarksSection" style="display: none;"   class="col-md-6 mt-4 m-2 mx-3">
            <label for="remarks">Remarks:</label>
            <textarea id="remarks" name="remarks" rows="4" cols="40" disabled>${remarks}</textarea>
        </div>
        
        </div>




      <div class="col-md-4 ">
      <label for="mode_int" class="f_13">Mode of interview</label>
          <select name="mode_inter" id="mode_inter"  class="form-select f_13" onchange="showMode()">
      <option value="" disabled selected class="f_13">--Select Int. Mode</option>
          <option value="Telephonic" class="f_13">Telephonic</option>
          <option value="Face To Face" class="f_13">Face To Face</option>
          <option value="ZOOM/MST" class="f_13">ZOOM/MST TEAMS </option>
      </select>
      <div id="textsection" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Meeting Link</label>
      <textarea id="url" name="remarks" rows="4" cols="40"></textarea>
  </div>

    <div id="textsection1" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Address</label>
      <textarea id="address" name="remarks" rows="4" cols="40"></textarea>
  </div>
      </div>
   
  
        <div class="col-2 data">
          <button id="assg_interview_submit_btn" type="submit"   class="btn btn-parimary f_11 btn_color">Submit</button>
        </div>
      
      </div>
      
              `);
    }


    else if(res.data2[i].level=='Interviewer-4'){
      let level_c=5 
      // console.log('level_5_level_5_level_5')
      $('#level_app').empty()
      $('#level_app').append(`       
      <div class="row mb-3 shadow rounded-2 px-0 py-2">
      
        <div class="col-12 d-flex fw-bold"><span id="level" name="level">Interviewer-${level_c}</span> </div>
        <div class="col-md-4  f_13">
            
        <label for="emp_name" class="f_13">Emp. Code:Name</label>
    <input list="emp_name_list" name="emp_name" id="emp_name" class="form-control f_13">
    <datalist id="emp_name_list">
        
        ${option}
    </datalist> 
        </div>
        <div class="col-md-4  f_13">
            <label for="date" class="f_13">Interview Date</label>
            <input name="date_time" id="date_time" type="datetime-local" class="form-control f_13 ">
        </div>
      
        <div class="col-md-4">
          <label for="cand_email" class="f_13">Candidate Email ID</label>
          <input type="email" class="form-control f_13" name="cand_email" id="cand_email" placeholder="Enter Candidate Email ID" value="${candidate_email}" disabled>
        </div>

    

      
        <div class="col-md-4 ">
            <label for="cand" class="f_13">Candidate Name</label>
            <input type="text" name="cand_name" id="cand_name" class="form-control f_13" placeholder="Enter Candidate Name" value="${candidate_name}" disabled>
        </div>
      
      
        <div class="col-md-4 ">
          <label for="for="cand_mobile_no" class="f_13" >Candidate Mobile No.</label>
          <input type="number"  class="form-control f_13" name="cand_mobl_no" id="cand_mobl_no" placeholder="Enter Candidate Mobile No." value="${candidate_mobile}" disabled>
        </div>  
   

      
        <div class="col-md-4">
        <label for="resume" class="f_13">Resume Upload</label>
        <input type="file" name="resume" id="resume" class="form-control f_13" >
      </div>

   


      <!-- Source of Profile dropdown with remarks section -->
      <div class="col-md-4">
          <label for="sour_of_profile" class="f_13">Source of Profile</label>
          <select name="sour_of_profile" id="sour_of_profile" class="form-select f_13" disabled>
              <option value="${source_of_profile}" disabled selected class="f_13">${source_of_profile}</option>                
          </select>
          <div id="remarksSection" style="display: none;"   class="col-md-6 mt-4 m-2 mx-3">
          <label for="remarks">Remarks:</label>
          <textarea id="remarks" name="remarks" rows="4" cols="40" disabled>${remarks}</textarea>
      </div>
        
        </div>




      <div class="col-md-4 ">
      <label for="mode_int" class="f_13">Mode of interview</label>
          <select name="mode_inter" id="mode_inter"  class="form-select f_13" onchange="showMode()">
      <option value="" disabled selected class="f_13">--Select Int. Mode</option>
          <option value="Telephonic" class="f_13">Telephonic</option>
          <option value="Face To Face" class="f_13">Face To Face</option>
          <option value="ZOOM/MST" class="f_13">ZOOM/MST TEAMS </option>
      </select>
      <div id="textsection" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Meeting Link</label>
      <textarea id="url" name="remarks" rows="4" cols="40"></textarea>
  </div>

    <div id="textsection1" style="display: none;"   class="col-md-6  mt-4 m-2 mx-3">
      <label for="remarks">Address</label>
      <textarea id="address" name="remarks" rows="4" cols="40"></textarea>
  </div>
      </div>
   
  
        <div class="col-2 data">
          <button id="assg_interview_submit_btn" type="submit"   class="btn  btn-parimary  f_11 btn_color">Submit</button>
        </div>
      
      </div>
      
              `);
    }

  }
  

}

showRemarks()
// (res.data2[i].status !=='Next Round' || res.data2[i].status !=='Reopen')

function checkDate() {
  var selectedDate = new Date(document.getElementById('date_time').value);
  var currentDate = new Date();
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Check if selected date is within the range of 7 days prior to current date or later
  if (selectedDate >= sevenDaysAgo || selectedDate >= currentDate) {
      // Date is within range, do nothing or you can add your logic here
      console.log('Date is within range');
  } else {
      alert('Please select a date within the range of 7 days prior to the current date or later.');
      document.getElementById('date_time').value = ''; // Clear the input value
  }
}

// Add event listener to the datetime-local input
document.getElementById('date_time').addEventListener('change', checkDate);


function showRemarks() {
  var sourceOfProfile = document.getElementById("sour_of_profile");
  var remarksSection = document.getElementById("remarksSection");

  if (sourceOfProfile.value === "Social Media" || sourceOfProfile.value === "Consultant" || sourceOfProfile.value === "Referral") {
      remarksSection.style.display = "block";
  }
  
   else {
      remarksSection.style.display = "none";
  }
}


function showMode() {
  var sourceOfProfile = document.getElementById("mode_inter");
  var textsection = document.getElementById("textsection");
  var textsection1 = document.getElementById("textsection1");

  if (sourceOfProfile.value === "ZOOM/MST") {
      textsection.style.display = "block";
      textsection1.style.display = "none"; // Hide the Face To Face section
  } else if (sourceOfProfile.value === "Face To Face") {
      textsection.style.display = "none"; // Hide the ZOOM/MST section
      textsection1.style.display = "block"; // Show the Face To Face section
  } else {
      textsection.style.display = "none";
      textsection1.style.display = "none";
  }
}



 
}

})

})




//////////-----------------------------------
//////////-----------------------------------
//////////-----------------------------------
//////////-----------------------------------
//////////-----------------------------------
//////////-----------------------------------
//////////-----------------------------------

$(document).on('click', '#assg_interview_submit_btn', function () {

  var r_id = $('#input_r_id_1').val();
  var jd_id = $('#input_jd_id_1').val(); 
  let level = $('#level').text();
  let emp_name = $('#emp_name').val();
  let date_time = $('#date_time').val();
  let mode_inter = $('#mode_inter').val();
  let url = $('#url').val();
  let address = $('#address').val();
  let remarks = $('#remarks').val();
  let cand_name = $('#cand_name').val();
  let cand_mobl_no = $('#cand_mobl_no').val();
  let cand_email = $('#cand_email').val();

  let sour_of_profile = $('#sour_of_profile').val();
  let resume = $('#resume')[0].files[0];

  // console.log(r_id, 'r_id_111')
  // console.log(jd_id, 'jd_id_1')
  // console.log(level, 'level_1')
  // console.log(emp_name, 'emp_name_1')
  // console.log(date_time, 'date_time_1')
  // console.log(mode_inter, 'mode_inter_1')
  console.log(url,address,remarks, 'url')
  // console.log(cand_name, 'cand_name_1')
  // console.log(cand_mobl_no, 'cand_mobl_no_1')
  // console.log(cand_email, 'cand_email_1')
 
  // console.log(sour_of_profile, 'sour_of_profile_1tdgdftydfyudfdyef')
  // console.log(resume, 'resume_1')


  if( emp_name=='' || emp_name=='none'  || date_time=='' || mode_inter=='' || mode_inter==null || cand_name=='' || cand_mobl_no=='' || cand_email=='' ||  sour_of_profile=='' || resume=='' || resume==undefined ){
    swal.fire({
      title: "Error",
      text: "Please fill all fields",
      icon: "error"
    });
    
  }

  else if(cand_mobl_no.length < 10 ){
    swal.fire({
      title: "Error",
      text: "Please fill 10 digits Mobile No",
      icon: "error"
    });
  }
  else{

  

  let formData = new FormData()


  formData.append('r_id', r_id)
  formData.append('jd_id', jd_id)
  formData.append('level', level)
  formData.append('emp_name', emp_name)
  formData.append('date_time', date_time)
  formData.append('mode_inter', mode_inter)
  formData.append('url', url)
  formData.append('address', address)
  formData.append('remarks', remarks)
  formData.append('cand_name', cand_name)
  formData.append('cand_mobl_no', cand_mobl_no)
  formData.append('cand_email', cand_email)
 
  formData.append('sour_of_profile', sour_of_profile)
  formData.append('resume', resume)

  console.log(formData, 'formData_formDataformDataformData')

  $.ajax({
      url: '/interview_data',
      method: 'POST',
      data: formData,
      contentType: false, 
      processData: false,   
      success: function(res) {
        if (res === "success") {
            swal.fire({
                title: "Successful!",
                text: "Successfully Inserted ",
                icon: "success"
            }).then(() => {
              location.reload(); // Reload the page after the Swal dialog is dismissed
            });
        } else {
            swal.fire({
                title: "Error",
                text: "Candidate Is Already Exist ",
                icon: "error"
            });
        }
    }
    
             

  })

}

})


// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------
// -----------------qqqqqqqqqqqqqqq--------------------------

    
  
  


    $(document).on('click','.dwnld',function(){
        var get_data=$(this)
      
      
        var k_per=$(get_data).attr('k_per')
        var jtitle=$(get_data).attr('jtitle')
        var func=$(get_data).attr('func')
        var business=$(get_data).attr('business')
        var about=$(get_data).attr('about')
        var role_s=$(get_data).attr('role_s')
        var role_res=$(get_data).attr('role_res')
        var edu=$(get_data).attr('edu')
        var lstate=$(get_data).attr('lstate')
        var l_hq=$(get_data).attr('l_hq')
        var d_rep=$(get_data).attr('d_rep')
        
        var ind_mat=$(get_data).attr('ind_mat')
        var t_size=$(get_data).attr('t_size')
        var divi=$(get_data).attr('divi')
        var divi=$(get_data).attr('refe')
    
      
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
        console.log(formated_text[0])
        // $('#jdid').val(jd_id)
        // $('#Job_title').val(jtitle)
        $('#p_func').html(func)
        $('#p_title').html(jtitle)
        // $('#business').val(business)
        $('#p_rs').html(formated_text[1])
        $('#p_about').html(about)
        $('#p_rns').html(formated_text[2])
        $('#p_kpi').html(formated_text[0])
        $('#p_eq').html(formated_text[3])
        $('#role_reso').html(role_res)
        $('#loc_s').html(lstate)
        $('#d_rept').html(d_rep)
        $('#ind_mat').html(ind_mat)
        $('#loc').html(l_hq)
        $('#team_s').html(t_size)
        $('#divi').html(divi)
        $('#refe').html(refe)



      

      
        var pdf_cont=$('#printpdf').printThis()
    })


    
    
   
    $(document).on('click', '.delete', function() {
      var row = $(this).closest('tr');
      var r_id = $(this).attr('r_id');
      var level = $(this).attr('level');
  
    
      if (level === '') {
         
          $.ajax({
              url: 'your_delete_endpoint',
              method: 'POST',
              data: { r_id: r_id },
              success: function(response) {
                  Swal.fire({
                      title: 'Success!',
                      text: 'Row deleted successfully.',
                      icon: 'success',
                      confirmButtonText: 'OK'
                  }).then(function() {
                      row.remove();
                  });
              },
              error: function(xhr, status, error) {
                  Swal.fire({
                      title: 'Error!',
                      text: 'Error deleting row: ' + error,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
              }
          });
      } else {
         
          Swal.fire({
              title: 'Error!',
              text: `You cann't delete this candidtate ID ${level}`,
              icon: 'error',
              confirmButtonText: 'OK'
          });
      }
  });
  
  // ---------------------------------------------------
  // ---------------------------------------------------
  // ---------------------------------------------------

  $(document).on('input','#cand_mobl_no',function(){
    let cand_mobile=$(this)
    let cand_mobile_val=$(this).val()
  
    // mobile number will starts with 6,7,8 or 9 number digits and you can only type numaric number
    // for only numeric number condition you can use /[0-9]/g
    let number_cndt=cand_mobile_val.match(/^[6789][0-9]*$/)

    if(number_cndt==null || number_cndt==''){
      cand_mobile.val(number_cndt)
    }
    
    else{

        let number_cndt2=(number_cndt.toString()).replaceAll(',','')
        cand_mobile.val(number_cndt2)

        }

    if(cand_mobile_val.length>10){
      let cand_mobl_val2=cand_mobile_val.slice(0,10)
      cand_mobile.val(cand_mobl_val2)
    }

  })

  // ---------------------------------------------------
  // ---------------------------------------------------



  $(document).on('click', '#eyes_icon' , function(){
    $('html,body').animate({
      scrollTop: $("#assign_interview_div").offset().top},
      'slow');
      
  })