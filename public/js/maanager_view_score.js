function viewPdf(pdfUrl) {
  // Open the PDF in a new tab/window
  window.open(pdfUrl, '_blank');
}


$(document).on('click', '.button1', function() {

  document.getElementById("formContainer").style.display = "block";
  // Automatically scroll down to the form container

  document.getElementById("formContainer").scrollIntoView({ behavior: 'smooth' });

  // rid data 
  var tr=$(this).closest('tr')
  var td=tr.find('td').eq(0)
  var r_id1 = (td.text())

  

  let r_id = $(this).attr("data-rc_id");
  let levels = $(this).attr("data-level");
  
  document.getElementById("r_id").value ="";
  document.getElementById("r_id").value =`${r_id}`;


  var empconcet =$('#empconcet').val();


  $.ajax({
      url:"/api/disable/enable/form_data_1",
      method:"POST",
      data:{
          r_id:r_id,
          levels:levels
      },
      success:function(res){
          $('#tbl_unique_02').empty();
          $("#tbl_unique_02").append(`<table class="table questions_table">
          <thead>
              <tr class="f_16 fw_700 text-center">
                  <th class="bg-secondary-subtle vertl_mdl">Attributes</th>
                  <th class="bg-secondary-subtle vertl_mdl" >  <span class="py-1 border-bottom border-dark border-2">Interviewer 1 </span>
                  <br> Score </th>
                  <th class="bg-secondary-subtle vertl_mdl">  <span class="py-1 border-bottom border-dark border-2">Interviewer 2</span> <br> Score 
                   </th>
                  <th class="bg-secondary-subtle vertl_mdl"> <span class="py-1 border-bottom border-dark border-2">Interviewer 3 </span>
                  <br> Score </th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Relevance of Qualification & Experience
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Does his qualifications enable him to handle the job? Can he fulfill the assignment?
                      </span>                                
                  </td>

                  

                  <td class="py-0 score_input" id="score_01">                                

                  </td>

                  <td class="py-0 score_input" id="score_02">                                

                  </td>
                  <td class="py-0 score_input" id="score_03">          

                  </td>

                
                
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Personality
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Grooming, Mannerism , Appearance, Disposition, Body Language.
                      </span>                                
                  </td>
                  <td class="py-0 score_input"  id="score_02_01">                                

                  </td>
                  <td class="py-0 score_input" id="score_02_02">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_02_03">                                
                     
                  </td>
                 
  
              </tr>
              
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Communication
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Ability to express clearly. Can he understand & respond objectively? Is he clear on his goals?
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_03_01">                                
                      
                  </td>

                  <td class="py-0 score_input" id="score_03_02">                                

                  </td>
                  <td class="py-0 score_input" id="score_03_03">                                

                  </td>
  
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Job Knowledge
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Conceptual  clarity, command over the subject, Knowledge of practical aspects.
                      </span>                                
                  </td>
                  <td class="py-0 score_input"  id="score_04_01">                                
                      
                  </td>
                 <td class="py-0 score_input" id="score_04_02">                                
                     
                  </td>
                  <td class="py-0 score_input" id="score_04_03">                                
                     
                  </td>
  
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Interpersonal Skills
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Ability to get along with people and elicit co-operation and support. Is he a Team Player?
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_05_01">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_05_02">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_05_03">                                
                     
                  </td>
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Job Stability
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          How stable in earlier jobs? Does he really need the job? Will he be committed & stable?
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_06_01">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_06_02">                                
                   
                  </td>
                  <td class="py-0 score_input" id="score_06_03">                                
                     
                  </td>
  
              </tr>

              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Adaptibility
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Cultural Fit /  Suitability.
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_07_01">                                
                     
                  </td>
                  <td class="py-0 score_input" id="score_07_02">                                
                     
                  </td>
                  <td class="py-0 score_input" id="score_07_03">                                
                     
                  </td>
  
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Creativity/Initiatives
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Tend to think out-of-the-box and to try out innovative, new ways in solving issues.
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_08_01">  

                  </td>
                  <td class="py-0 score_input" id="score_08_02">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_08_03">                                
                      
                  </td>
  
              </tr>
  
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Realistic Career Goals
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Knowledge of his strengths and weaknesses. Practical in setting priorities and goals.
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_09_01">                                
                     
                  </td>
                  <td class="py-0 score_input" id="score_09_02">                                
                      
                  </td>
                  <td class="py-0 score_input" id="score_09_03">                                
                     
                  </td>
              </tr>
              
              <tr>
                  <td >
                      <span class="f_13 fw_700 d-flex justify_content_start">
                          Leadership Skills
                      </span>
                      <br>
                      <span class="f_10 d-flex justify_content_start">
                          Able to build, motivate, direct and drive a team to achieve the set goals.
                      </span>                                
                  </td>
                  <td class="py-0 score_input" id="score_10_01">                                
                     
                  </td>
                  <td class="py-0 score_input" id="score_10_02">                                
                     
                  </td>
                  <td class="py-0 score_input"  id="score_10_03">                                
                      
                  </td>
  
              </tr>

              <tr class="text-center">
                  <td class="f_14 fw_700 text-center p-0 bg-secondary-subtle">
                      Total Score                                
                  </td>
                  
                  <td class="bg-secondary-subtle text-center" id="total_cell">
                  
                  </td>

                  <td class="bg-secondary-subtle" id="total_cell1">
                 
                  </td>

                  <td class="bg-secondary-subtle text-center" id="total_cell2">
                  
                  </td>

              </tr>
  
              <tr>
                  <td class="f_14 fw_700 text-center p-0 bg-secondary-subtle">
                      Percentage Score                                
                  </td>
                  <td class="bg-secondary-subtle text-center" id="percentage_Cell"> 
                 
                  </td>
                  <td class="bg-secondary-subtle" id="percentage_Cell1" >
                  
                   </td>
                  <td class="bg-secondary-subtle" id="percentage_Cell2"> 
                  
                  </td>
              </tr>
          </tbody>
      </table>  

      <div class="row border_3 py-2 f_13 fw-bold">
      <div class="col-md-4 ">
          Recommendation (pls Tick)
      </div>
      <div class="col-md-2">
          Suitable
      </div>
      <div class="col-md-2">
          Back-up
      </div>
      <div class="col-md-2">
          Hold
      </div>
      <div class="col-md-2">
          Not Suitable
      </div>
  </div>
  


  <div class="row mt-4 d-flex justify-content-between">
    
      <div class="col-md-4 mb-2 mb-md-0 px-3 ">
      
      <div class="row border_3">
          <div class="col-12">
              <div class="row border_bottom_3">
                  <div class="col-12 text-center fw_700">INTERVIEWER 1</div>
                  
              </div>
              
              <div class="row f_13 border_bottom_3">
                  <div class="col-3 d_flex_center fw-bold f_12">Name:-</div>
                  <div class="col-9 py-2 hrempname">
                     
                  </div>
              </div>
              <div class="row f_13 border_bottom_3">
                  <div class="col-3 d_flex_center fw-bold">Date:-</div>
                  <div class="col-9 py-2" id="date_time">
                     
                  </div>
              </div>
              <div class="row f_13 ">
                  <div class="col-3 d_flex_center fw-bold ps_24">Remarks:-</div>
                  <div class="col-9 py-2" id="remarks">
                  
                  </div>
              </div>


          </div>
      </div>

      </div>
  
      <div class="col-md-4 mb-2 mb-md-0 px-3">
          <div class="row border_3">
              <div class="col-12">
                  <div class="row border_bottom_3">
                      <div class="col-12 text-center fw_700">INTERVIEWER 2</div>
                  </div>
                 
                  <div class="row f_13 border_bottom_3">
                      <div class="col-3 d_flex_center fw-bold">Name:-</div>
                      <div class="col-9 py-2 emp_name1">
                          
                      </div>
                  </div>
                  <div class="row f_13 border_bottom_3">
                      <div class="col-3 d_flex_center fw-bold">Date:-</div>
                      <div class="col-9 py-2" id="date_time1">
                          
                      </div>
                  </div>
                  <div class="row f_13 ">
                      <div class="col-3 d_flex_center fw-bold ps_24">Remarks:-</div>
                      <div class="col-9 py-2" id="remarks1">
                          
                      </div>
                  </div>
              </div>
          </div>     
      
      </div>
  
      <div class="col-md-4 mb-2 mb-md-0 px-3  ">
         
          <div class="row border_3">
              <div class="col-12">
                  <div class="row border_bottom_3">
                      <div class="col-12 text-center fw_700">INTERVIEWER 3</div>
                  </div>
                  
                  <div class="row f_13 border_bottom_3">
                      <div class="col-3 d_flex_center fw-bold">Name:-</div>
                      <div class="col-9 py-2 emp_name2">
                        
                      </div>
                  </div>
                  <div class="row f_13 border_bottom_3">
                      <div class="col-3 d_flex_center fw-bold">Date:-</div>
                      <div class="col-9 py-2" id="date_time2">
                    
                      </div>
                  </div>
                  <div class="row f_13 ">
                      <div class="col-3 d_flex_center fw-bold ps_24">Remarks:-</div>
                      <div class="col-9 py-2" id="remarks2">
                         
                      </div>
                  </div>
              </div>
          </div>
      </div>

  </div>`)

          if(res.level == "Interviewer-1"){

              $("#score_01").append(`<input type="number" disabled id="score1" class="fw-bold text-center" value="${res.l1_score[0].S_1}" name="S_1" oninput="validateScore(this)" onblur="calculateSum()">`);
              $("#score_02").append(`<input type="number" id="score_0_1" disabled class="fw-bold text-center" onblur="calculateSums()">`);
              $("#score_03").append(`<input type="number" id="score_001" disabled class="fw-bold text-center" onblur="calculateSums1()">`);

              $("#score_02_01").append(`<input type="number" disabled id="score2" class="fw-bold text-center" value="${res.l1_score[0].S_2}" name="S_2" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_02_02").append(`<input type="number" disabled id="score_0_2" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_02_03").append(`<input type="number" id="score_002" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_03_01").append(`<input type="number" disabled id="score3" class="fw-bold text-center" value="${res.l1_score[0].S_3}" name="S_3" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_03_02").append(`<input type="number" disabled id="score_0_3" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_03_03").append(`<input type="number"  id="score_003" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_04_01").append(`<input type="number" disabled id="score4" class="fw-bold text-center" value="${res.l1_score[0].S_4}" name="S_4" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_04_02").append(`<input type="number" id="score_04" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_04_03").append(`<input type="number"  id="score_004" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_05_01").append(`<input type="number" disabled id="score5" class="fw-bold text-center" value="${res.l1_score[0].S_5}" name="S_5" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_05_02").append(`<input type="number" id="score_05" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_05_03").append(`<input type="number" id="score_005" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_06_01").append(`<input type="number" disabled id="score6" class="fw-bold text-center" value="${res.l1_score[0].S_6}" name="S_6" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_06_02").append(`<input type="number" id="score_06" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_06_03").append(`<input type="number" id="score_006" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_07_01").append(`<input type="number" disabled id="score8" class="fw-bold text-center" value="${res.l1_score[0].S_7}" name="S_7" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_07_02").append(`<input type="number" id="score_08" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_07_03").append(`<input type="number" id="score_008" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_08_01").append(`<input type="number" disabled id="score9" class="fw-bold text-center" value="${res.l1_score[0].S_8}" name="S_8" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_08_02").append(`<input type="number" id="score_09" disabled class="fw-bold text-center"onblur="calculateSums()" >`)
              $("#score_08_03").append(`<input type="number" id="score_009" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_09_01").append(`<input type="number" disabled id="score10" class="fw-bold text-center" value="${res.l1_score[0].S_9}" name="S_9" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_09_02").append(`<input type="number" id="score_010" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_09_03").append(`<input type="number" id="score_0010" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_10_01").append(`<input type="number" disabled id="score11" class="fw-bold text-center" value="${res.l1_score[0].S_10}" name="S_10" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_10_02").append(`<input type="number" id="score_011" disabled class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_10_03").append(`<input type="number" id="score_0011" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $('#total_cell').append(`<input id="totalCell" type="number" value="${res.l1_totalScore}" disabled>`);
              $('#percentage_Cell').append(`<input id="percentageCell" value="${res.l1_percentage}" type="nymber" value=0.00% disabled>`);

              $('#total_cell1').append(`<input id="totalCell1" type="number" value="" disabled>`);
              $('#percentage_Cell1').append(`<input id="percentageCell1" value="" type="nymber" value=0.00% disabled>`);
              
              $('#total_cell2').append(`<input id="totalCell2" type="number" value="" disabled>`);
              $('#percentage_Cell2').append(`<input id="percentageCell2" value="" type="nymber" value=0.00% disabled>`);


                  
              $('.hrempname').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l1_score_by}" id="empname" disabled>`)
              $('#date_time').append(` <input type="text" name="date_time" class="form-control f_12 p-1 input_border" value="${res.l1_score_date}" disabled>`)
              $('#remarks').append(`<textarea name="" id="remarks_" class="form-control f_12 input_border"disabled>${res.l1_manager_remarks}</textarea>`)
             

              $('.emp_name1').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${empconcet}" disabled>`);
              $('#date_time1').append(` <input type="text" name="date_time1" class="form-control f_12 p-1 input_border" disabled >`)
              $('#remarks1').append(`<textarea name="" id="remarks_1" class="form-control f_12 input_border" disabled></textarea>`)

              $('.emp_name2').append(`<input type="text" class="form-control f_12 p-1 input_border" disabled>`);
              $('#date_time2').append(` <input type="text" class="form-control f_12 p-1 input_border" disabled>`)
              $('#remarks2').append(`<textarea name="" id="remarks_2" class="form-control f_12 input_border " disabled></textarea>`)



          }else if(res.level == "Interviewer-2"){
             
           
              $("#score_01").append(`<input type="number" disabled id="score1" value="${res.l1_score[0].S_1}" class="fw-bold text-center" name="S_1" oninput="validateScore(this)" onblur="calculateSum()">`);
              $("#score_02").append(`<input type="number" disabled id="score_0_1" value="${res.l2_score[0].S_1}" class="fw-bold text-center" onblur="calculateSums()">`);
              $("#score_03").append(`<input type="number" disabled id="score_001" class="fw-bold text-center" onblur="calculateSums1()">`);
             
              $("#score_02_01").append(`<input type="number" disabled id="score2" class="fw-bold text-center" value="${res.l1_score[0].S_2}" name="S_2" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_02_02").append(`<input type="number" id="score_0_2" disabled value="${res.l2_score[0].S_2}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_02_03").append(`<input type="number" id="score_002" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_03_01").append(`<input type="number" disabled id="score3" class="fw-bold text-center" value="${res.l1_score[0].S_3}" name="S_3" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_03_02").append(`<input type="number" id="score_0_3" disabled value="${res.l2_score[0].S_3}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_03_03").append(`<input type="number" id="score_003" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_04_01").append(`<input type="number" disabled id="score4" class="fw-bold text-center" value="${res.l1_score[0].S_4}" name="S_4" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_04_02").append(`<input type="number" id="score_04" disabled value="${res.l2_score[0].S_4}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_04_03").append(`<input type="number" id="score_004" disabled class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_05_01").append(`<input type="number" disabled id="score5" class="fw-bold text-center" value="${res.l1_score[0].S_5}" name="S_5" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_05_02").append(`<input type="number" disabled id="score_05" value="${res.l2_score[0].S_5}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_05_03").append(`<input type="number" id="score_005" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_06_01").append(`<input type="number" disabled id="score6" class="fw-bold text-center" value="${res.l1_score[0].S_6}" name="S_6" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_06_02").append(`<input type="number" id="score_06" disabled value="${res.l2_score[0].S_6}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_06_03").append(`<input type="number" id="score_006" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_07_01").append(`<input type="number" disabled id="score8" class="fw-bold text-center" value="${res.l1_score[0].S_7}" name="S_7" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_07_02").append(`<input type="number" disabled id="score_08" value="${res.l2_score[0].S_7}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_07_03").append(`<input type="number" id="score_008" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              
              $("#score_08_01").append(`<input type="number" disabled id="score9" class="fw-bold text-center" value="${res.l1_score[0].S_8}" name="S_8" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_08_02").append(`<input type="number" id="score_09" disabled value="${res.l2_score[0].S_8}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_08_03").append(`<input type="number" id="score_009" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_09_01").append(`<input type="number" disabled id="score10" class="fw-bold text-center" value="${res.l1_score[0].S_9}" name="S_9" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_09_02").append(`<input type="number" id="score_010" disabled value="${res.l2_score[0].S_9}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_09_03").append(`<input type="number" id="score_0010" disabled class="fw-bold text-center" onblur="calculateSums1()">`)

              
              $("#score_10_01").append(`<input type="number" disabled id="score11" class="fw-bold text-center" value="${res.l1_score[0].S_10}" name="S_10" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_10_02").append(`<input type="number" disabled id="score_011" value="${res.l2_score[0].S_10}" class="fw-bold text-center"onblur="calculateSums()" >`)
              $("#score_10_03").append(`<input type="number" disabled id="score_0011" class="fw-bold text-center" onblur="calculateSums1()">`)


              $('#total_cell').append(`<input id="totalCell" type="number" value="${res.l1_totalScore}" disabled>`);
              $('#percentage_Cell').append(`<input id="percentageCell" value="${res.l1_percentage}" type="nymber" value=0.00% disabled>`);

              $('#total_cell1').append(`<input id="totalCell1" type="number" value="${res.l2_totalScore}" disabled>`);
              $('#percentage_Cell1').append(`<input id="percentageCell1" value="${res.l2_percentage}" type="nymber" value=0.00% disabled>`);
              
              $('#total_cell2').append(`<input id="totalCell2" type="number" value="" disabled>`);
              $('#percentage_Cell2').append(`<input id="percentageCell2" value="" type="nymber" value=0.00% disabled>`);


          
            
              $('.hrempname').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l1_score_by}" disabled>`)  
              $('#date_time').append(`<input type="text" name="date_time" class="form-control f_12 p-1 input_border" value="${res.l1_score_date}" disabled>`)
              $('#remarks').append(`<textarea id="remarks_" class="form-control f_12 input_border" disabled>${res.l1_manager_remarks}</textarea>`)
          

              $('.emp_name1').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l2_score_by}" disabled>`);
              $('#date_time1').append(`<input type="text" name="date_time1" class="form-control f_12 p-1 input_border"  value="${res.l2_score_date}" disabled >`)
              $('#remarks1').append(`<textarea name="" id="remarks_1" class="form-control f_12 input_border" disabled>${res.l2_manager_remarks}</textarea>`)

              $('.emp_name2').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${empconcet}" disabled>`);
              $('#date_time2').append(`<input type="text"  name="date_time2" disabled class="form-control f_12 p-1 input_border">`)
              $('#remarks2').append(`<textarea name="" id="remarks_2" disabled class="form-control f_12 input_border "></textarea>`)


          }else if(res.level == "Interviewer-3"){

             
              $("#score_01").append(`<input type="number" value="${res.l1_score[0].S_1}" disabled id="score1" class="fw-bold text-center" name="S_1" oninput="validateScore(this)" onblur="calculateSum()">`);
              $("#score_02").append(`<input type="number" value="${res.l2_score[0].S_1}" id="score_0_1" disabled class="fw-bold text-center" onblur="calculateSums()">`);
              $("#score_03").append(`<input type="number" value="${res.l3_score[0].S_1}" disabled id="score_001" class="fw-bold text-center" onblur="calculateSums1()">`);

              $("#score_02_01").append(`<input type="number" disabled id="score2" class="fw-bold text-center" value="${res.l1_score[0].S_2}" name="S_2" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_02_02").append(`<input type="number" disabled id="score_0_2" value="${res.l2_score[0].S_2}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_02_03").append(`<input type="number" disabled id="score_002" value="${res.l3_score[0].S_2}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_03_01").append(`<input type="number" disabled id="score3" class="fw-bold text-center" value="${res.l1_score[0].S_3}" name="S_3" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_03_02").append(`<input type="number" disabled id="score_0_3" value="${res.l2_score[0].S_3}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_03_03").append(`<input type="number" disabled id="score_003" value="${res.l3_score[0].S_2}" class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_04_01").append(`<input type="number" disabled id="score4" class="fw-bold text-center" value="${res.l1_score[0].S_4}" name="S_4" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_04_02").append(`<input type="number" disabled id="score_04" value="${res.l2_score[0].S_4}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_04_03").append(`<input type="number" disabled id="score_004" value="${res.l3_score[0].S_4}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_05_01").append(`<input type="number" disabled id="score5" class="fw-bold text-center" value="${res.l1_score[0].S_5}" name="S_5" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_05_02").append(`<input type="number" disabled id="score_05" value="${res.l2_score[0].S_5}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_05_03").append(`<input type="number" disabled id="score_005" value="${res.l3_score[0].S_5}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_06_01").append(`<input type="number" disabled id="score6" class="fw-bold text-center" value="${res.l1_score[0].S_6}" name="S_6" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_06_02").append(`<input type="number" disabled id="score_06" value="${res.l2_score[0].S_6}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_06_03").append(`<input type="number" disabled id="score_006" value="${res.l3_score[0].S_6}" class="fw-bold text-center" onblur="calculateSums1()">`)


              $("#score_07_01").append(`<input type="number" disabled id="score8" class="fw-bold text-center" value="${res.l1_score[0].S_7}" name="S_7" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_07_02").append(`<input type="number" disabled id="score_08" value="${res.l2_score[0].S_7}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_07_03").append(`<input type="number" disabled id="score_008" value="${res.l3_score[0].S_7}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_08_01").append(`<input type="number" disabled id="score9" class="fw-bold text-center" value="${res.l1_score[0].S_8}" name="S_8" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_08_02").append(`<input type="number" disabled id="score_09" value="${res.l2_score[0].S_8}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_08_03").append(`<input type="number" disabled id="score_009" value="${res.l3_score[0].S_8}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_09_01").append(`<input type="number" disabled id="score10" class="fw-bold text-center" value="${res.l1_score[0].S_9}" name="S_9" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_09_02").append(`<input type="number" disabled id="score_010" value="${res.l2_score[0].S_9}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_09_03").append(`<input type="number" disabled id="score_0010" value="${res.l3_score[0].S_9}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $("#score_10_01").append(`<input type="number" disabled id="score11" class="fw-bold text-center" value="${res.l1_score[0].S_10}" name="S_10" oninput="validateScore(this)" onblur="calculateSum()">`)
              $("#score_10_02").append(`<input type="number" disabled id="score_011" value="${res.l2_score[0].S_9}" class="fw-bold text-center" onblur="calculateSums()">`)
              $("#score_10_03").append(`<input type="number" disabled id="score_0011" value="${res.l3_score[0].S_9}" class="fw-bold text-center" onblur="calculateSums1()">`)

              $('#total_cell').append(`<input id="totalCell" type="number" value="${res.l1_totalScore}" disabled>`);
              $('#percentage_Cell').append(`<input id="percentageCell" value="${res.l1_percentage}" type="nymber" value=0.00% disabled>`);

              $('#total_cell1').append(`<input id="totalCell1" type="number" value="${res.l2_totalScore}" disabled>`);
              $('#percentage_Cell1').append(`<input id="percentageCell1" value="${res.l2_percentage}" type="nymber" value=0.00% disabled>`);
              
              $('#total_cell2').append(`<input id="totalCell2" type="number" value="${res.l3_totalScore}" disabled>`);
              $('#percentage_Cell2').append(`<input id="percentageCell2" value="${res.l3_percentage}" type="nymber" value=0.00% disabled>`);


              $('.hrempname').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l1_score_by}" disabled>`)
              $('#date_time').append(` <input type="text" name="date_time" class="form-control f_12 p-1 input_border" value="${res.l1_score_date}" disabled>`)
              $('#remarks').append(`<textarea name="" id="remarks_" class="form-control f_12 input_border"disabled>${res.l1_manager_remarks}</textarea>`)
             

              $('.emp_name1').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l2_score_by}" disabled>`);
              $('#date_time1').append(` <input type="text" name="date_time1" class="form-control f_12 p-1 input_border"  value="${res.l2_score_date}" disabled >`)
              $('#remarks1').append(`<textarea name="" id="remarks_1" class="form-control f_12 input_border" disabled>${res.l2_manager_remarks}</textarea>`)

              $('.emp_name2').append(`<input type="text" class="form-control f_12 p-1 input_border" value="${res.l3_score_by}" disabled>`);
              $('#date_time2').append(` <input type="text" disabled  name="date_time2" class="form-control f_12 p-1 input_border" value="${res.l3_score_date}">`)
              $('#remarks2').append(`<textarea name="" id="remarks_2" disabled class="form-control f_12 input_border ">${res.l3_manager_remarks}</textarea>`)

          }
      }
  });

  let jd_id1=tr.find('td').eq(10).find('#jd_id1').val()
  let level1=tr.find('td').eq(10).find('#level1').val()

 
  let name1=tr.find('td').eq(10).find('#NAME1').val()
  let date1=tr.find('td').eq(10).find('#DATE1').val()
  let source1=tr.find('td').eq(10).find('#SOURCE1').val()
  let vertical1=tr.find('td').eq(10).find('#vertical1').val()
  let interview_mode1=tr.find('td').eq(10).find('#interview_mode1').val()
  let division1=tr.find('td').eq(10).find('#division1').val()

  let jd_id=$('#jd_id').val(jd_id1)
  let level=$('#level').val(level1)
  let vertical=$('#vertical').val(vertical1)
  let name=$('#NAME').val(name1)
  let date=$('#DATE').val(date1)
  let source=$('#SOURCE').val(source1)
  let interview_mode=$('#interview_mode').val(interview_mode1)
  let division=$('#division').val(division1)
})


$(document).ready(function(){


    
    $('#table1').DataTable({
  
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
       initComplete: function() {   
           $(".no-sorting").removeClass('sorting_asc');
       }
    }) 


  })