// -----------datepicker function js start----------
// -----------datepicker function js start----------
$(document).on('focus', '#from_date', function() {
  $(this).datepicker({
      dateFormat: 'dd-mm-yy'
  }).datepicker('show');
  });
  
  $(document).on('focus', '#to_date', function() {
  $(this).datepicker({
      dateFormat: 'dd-mm-yy'
  }).datepicker('show');
  });

// -----------datepicker function js end----------
// -----------datepicker function js end----------


// --------------DataTable function js start---------------
// --------------DataTable function js start---------------
  function dataTable(){
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
              "targets": [0,1,2,3,8,9],
               "className": "no-sorting"
           }],
           initComplete: function() {   
               $(".no-sorting").removeClass('sorting_asc');
           }
        }) 
  }
  
  $(document).ready(function(){
      dataTable()
  })
// --------------DataTable function js end---------------
// --------------DataTable function js end---------------


$(document).on('click', '#button', function(){
  
  var tr=$(this).closest('tr')
  
  var r_id_val=tr.find('td').eq(1).text()
  var jd_id=tr.find('td').eq(3).text()
  var level_val=tr.find('td').eq(2).text()
 
  
  
var status_val=tr.find("#status_id").val()
var candidate_name=tr.find('td').eq(6).text()
var candidate_email=tr.find('td').eq(7).text()
var candidate_mobile=tr.find('td').eq(8).text()
      // var status = tr.find('select[name="status"]').val();

console.log(status_val,r_id_val,level_val,candidate_name,candidate_email,candidate_mobile,"option uggigiufuyfufu")

  







  $.ajax({
      url:"/interview_manage",
      type:"post",
      data: {r_id:r_id_val,jd_id:jd_id,level:level_val,status:status_val,candidate_name:candidate_name,candidate_email:candidate_email,candidate_mobile:candidate_mobile,},
      success: function(res) {
          if (res === "success") {
              swal.fire({
                  title: "Successful!",
                  text: "Successfully Inserted",
                  icon: "success"
              })
              .then(function(){
                location.reload()
              })
              .then(function(){

                $.ajax({
                  url:'/send_interview_status_mail',
                  method:'post',
                  data:{
                    jd_id:jd_id,
                    r_id_val:r_id_val,
                    status_val:status_val,
                    level_val:level_val,
                    candidate_name:candidate_name,
                    candidate_email:candidate_email,
                    candidate_mobile:candidate_mobile
                  },
                  success:function(res){
                    console.log('mail sent successfully')
                  }
                })


              })
          } else {
              swal.fire({
                  title: "Error",
                  text: "Fail",
                  icon: "error"
              });
          }
      }


}
  )

})





// ------------------status function js start----------------- 
// ------------------status function js start----------------- 

$(document).on('focus','#status_id',function(){
  let tr=$(this).closest('tr')
  let td_val=tr.find('td').find('#status_id').val().trim()
  console.log(td_val,'td_val_111')

  let next_level=tr.find('td').find('#status_id').find('option').eq(1)
  let hold=tr.find('td').find('#status_id').find('option').eq(2)
  let short_listed=tr.find('td').find('#status_id').find('option').eq(3)
  let not_short_listed=tr.find('td').find('#status_id').find('option').eq(4)
 

  if(td_val=="Next Level"){
      // $(next_round).removeAttr('hidden')
      $(hold).removeAttr('hidden').addClass('hold_style')
      $(short_listed).removeAttr('hidden').addClass('short_listed_style')
      $(not_short_listed).removeAttr('hidden').addClass('not_short_listed_style')
  }
  else if(td_val=="Hold"){
      $(next_level).removeAttr('hidden').addClass('next_round_style')
      // $(hold).removeAttr('hidden')
      $(short_listed).removeAttr('hidden').addClass('short_listed_style')
      $(not_short_listed).removeAttr('hidden').addClass('not_short_listed_style')
      
  }
  else if(td_val=="Short Listed"){
      $(next_level).removeAttr('hidden').addClass('next_round_style')
      $(hold).removeAttr('hidden').addClass('hold_style')
      // $(selected).removeAttr('hidden')
      $(not_short_listed).removeAttr('hidden').addClass('not_short_listed_style')

  }
  else if(td_val=="Not Short Listed"){
      $(next_level).removeAttr('hidden').addClass('next_round_style')
      $(hold).removeAttr('hidden').addClass('hold_style')
      $(short_listed).removeAttr('hidden').addClass('short_listed_style')
      // $(rejected).removeAttr('hidden')
   
  }
  else if(td_val=="Select any status"){
      $(next_level).removeAttr('hidden').addClass('next_round_style')
      $(hold).removeAttr('hidden').addClass('hold_style')
      $(short_listed).removeAttr('hidden').addClass('short_listed_style')
      $(not_short_listed).removeAttr('hidden').addClass('not_short_listed_style')
    
  }
})


$(document).on('change', '#status_id', function() {

  let selectedOption = $(this).val().trim();
  console.log(selectedOption,'selectedOption11wwww')
  $(this).removeClass('next_round_style hold_style short_listed_style not_short_listed_style');
  
  if(selectedOption == 'Next Level') {
      
    $(this).addClass('next_round_style')
    console.log('entry1')

  } 
  else if(selectedOption == 'Hold') {
      $(this).addClass('hold_style')
    console.log('entry2')

  }
  else if(selectedOption == 'Short Listed') {
    $(this).addClass('short_listed_style')
    console.log('entry3')

  }
  else if(selectedOption == 'Not Short Listed') {
    $(this).addClass('not_short_listed_style')
    console.log('entry4')

  }
  
  });
  

  
  function status_color(){
  let tr = $('#jd_table tbody tr'); 
  
  tr.each(function(){
    let options = $(this).find('#status_id');   
    let options_val = options.find('option')
    
    let  options_val11=options_val[0].innerHTML.trim()
  //   options.removeClass('next_round_style hold_style short_listed_style not_short_listed_style'); 

  
    if(options_val11 == 'Next Level') {
      options.addClass('next_round_style')
    } 
    else if(options_val11 == 'Hold') {
      options.addClass('hold_style')
  }
    else if(options_val11 == 'Short Listed') {
      options.addClass('short_listed_style')
    }
    else if(options_val11 == 'Not Short Listed') {
      options.addClass('not_short_listed_style')
    }
    
  });
  }
  

$(document).ready(function(){
  status_color()
  disable_td()
})



$(document).on('click','.table_1 #jd_table_length select',function(){
  status_color()
  disable_td()
})


$(document).on('input','#jd_table_filter input',function(){
status_color()
disable_td()
})

$(document).on('click','.paginate_button ',function(){
  status_color()
  disable_td()
})
$(document).on('click','#jd_table thead tr',function(){
  status_color()
  disable_td()
})



// $(document).on('click',function(){
//     status_color()
// })


// $(document).on('change',function(){
//     status_color()
// })

// ------------------status function js end----------------- 
// ------------------status function js end----------------- 



// --------------------filter js start------------------ 
// --------------------filter js start------------------ 
$(document).on('click','#search_btn',function(){
  let from_date=$('#from_date').val().trim()
  let to_date=$('#to_date').val().trim()
  let status_val= $('#status_filter').val().trim()
  console.log(from_date,'from_date')
  console.log(to_date,'to_date')
  console.log(status_val,'status_val')
  
    $.ajax({
      url:'/interview_manage_filter',
      method:'post',
      data:{
        from_date:from_date,
        to_date:to_date,
        status_val:status_val
      },
      success:function(res){
        console.log(res.data1,'data1111')
  
      //   $('#jd_table').DataTable().distroy()
          let table = $('#jd_table').DataTable();
          table.destroy();
        $('#jd_table tbody').empty()
        
        for(let i=0; i<res.data1.length; i++){
        
          $('#jd_table tbody').append(
          `
          <tr>
                <td>${i+1}</td>
                <td>${ res.data1[i].r_id}</td>
                <td>${ res.data1[i].level}</td>
                <td>${ res.data1[i].level}</td>
                <td>${ res.data1[i].Emp_Name}</td>
                <td>${ res.data1[i].Formated_Interview_Date}</td>
                <td>${ res.data1[i].Candidate_Name}</td>
                <td>${ res.data1[i].Candidate_email}</td>
                <td>${ res.data1[i].Candidate_mobile}</td>
                <td>${ res.data1[i].Mode_of_Interview}</td>
                <td>${ res.data1[i].source_of_profile}</td>
                <td>${ res.data1[i].score}</td>




                <td>
                    <select name="status" id="status_id" class="form-select "  >
                        <% console.log(all_data[i].status,'ddddddddddddddd' )%>
                        <option selected value="${ res.data1[i].status}"> ${ res.data1[i].status}</option>
                        <option hidden value="Next Level" >Next Level</option>
                        <option hidden value="Hold" >Hold</option>
                        <option hidden value="Short Listed" >Short Listed</option>
                        <option hidden value="Not Short Listed" >Not Short Listed</option>
                      
                    </select>
                </td>

                <td><button type="submit" id="button">Save</button></td>
              </tr>
          `
          )
        }
        
        dataTable()
        status_color()
        disable_td()
  
      },
      error(err){
        console.log(err,'err')
      }
  
    })
  
  })
  
  $(document).on('click','#reset_btn',function(){
  location.reload()
  })
// --------------------filter js end------------------ 
// --------------------filter js end------------------ 
  
  

// $(document).ready(function(){
//   disable_td()
// })

function disable_td(){
let tr=$('#tbody_1 tr')
console.log(tr.length,'length')

tr.each(function(){  
  let status =$(this).find('td').eq(12).find('select')
  let status_val =status.val()
  let submit_btn =$(this).find('td').eq(13).find('button')
  console.log(status_val,'status_val_11')
  if(status_val=='Next Level' ){
    status.attr('disabled',true)
    submit_btn.attr('disabled',true)
  }
})
}

