
// --------------datatable function js start---------------
// --------------datatable function js start---------------
function datatable(){
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
        "targets": [0,1,2,3,8,9,11],
         "className": "no-sorting"
     }],
     order: [[0, 'desc']],
     initComplete: function() {   
         $(".no-sorting").removeClass('sorting_asc');
     }
  }) 
  
  
}

$(document).ready(function(){
  datatable()
})

// --------------datatable function js end---------------
// --------------datatable function js end---------------





$(document).on('click','.update_j',function(){
      var jd_id=$(this).attr('jd_id')
      var k_per=$(this).attr('k_per')
      var jtitle=$(this).attr('jtitle')
      var func=$(this).attr('func')
      var business=$(this).attr('business')
      var about=$(this).attr('about')
      var role_s=$(this).attr('role_s')
      var role_res=$(this).attr('role_res')
      var edu=$(this).attr('edu')

  



      console.log(jd_id,k_per,jtitle,func)
      $('#jdid').val(jd_id)
      $('#Job_title').val(jtitle)
      $('#function').val(func)
      $('#Business').val(business)
      $('#role').val(role_s)
      $('#aboutUs').html(about)
      $('#responsibility').val(role_res)
      $('#key_performance').val(k_per)
      $('#Qualification').val(edu)
      // for(var i=0; cls_tr.length>i; i++){
      
      // }
      
      
})


$(document).on('click','#update_jd',function(){
  var jd_id =$('#jdid').val().slice(5)   
  var jd_id11 =$('#jdid').val()   
  var j_title=$('#Job_title').val()
  var fuc=$('#function').val()
  var buis=$('#Business').val()
  // var au=$('#aboutUs').val()
  var role=$('#role').val()
  var resp=$('#responsibility').val()
  var kp=$('#key_performance').val()
  var quali=$('#Qualification').val()


  console.log(jd_id,'1')
  console.log(jd_id11,'11111')
  console.log(j_title,'2')
  console.log(fuc,'3')
  console.log(buis,'4')
  // console.log(au,'5')
  console.log(role,'6')
  console.log(resp,'7')
  console.log(kp,'8')
  console.log(quali,'9')
    
    
    
    
    
    
    
    
  Swal.fire({
      title: "Are you sure?",
      text: "You want to update JD",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update"
    }).then((result) => {
      if (result.isConfirmed) {
            $.ajax({
      url:'/jd_updation',
      type:'POST',
      data:{jd_id:jd_id,job_title:j_title,funct:fuc,business:buis,role_s:role,role_res:resp,key_per:kp,edu_qual:quali},
      success:function(res){
if(res=="success"){
  Swal.fire({
      title: "Successfull!",
      text: "Data updated successfully!",
      icon: "success"
    }).then(() => {
      location.reload(); // Reload the page after the Swal dialog is dismissed
    });
}
else{
  Swal.fire({
      title: "Error!",
      text: "Some error occured!",
      icon: "error"
    });
}
      }
  })
      }
    });


})


///pdf work
$(document).ready(function(){
$(document).on('click','.dwnld',function(){
var get_data=$(this).parent().prev().find('.update_j')
console.log(get_data)
// var jd_id=$(this).attr('jd_id')
var k_per=$(get_data).attr('k_per')
var jtitle=$(get_data).attr('jtitle')
var func=$(get_data).attr('func')
var business=$(get_data).attr('business')
var about=$(get_data).attr('about')
var role_s=$(get_data).attr('role_s')
var role_res=$(get_data).attr('role_res')
var edu=$(get_data).attr('edu')
console.log(edu)

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
var pdf_cont=$('#printpdf').printThis()
})
})





$(document).on ('click', '#button' ,function(){


// Find the nearest <td> element next to the <tr>
let tr = $(this).closest('tr');
let td = tr.find('td').eq(0).text();

// Store JD ID in variable jdid
var jdid = td;

// Get the value from element with ID 'options'
var status = tr.find('#options').val();

// Log status, JD ID, and a message to the console
console.log(status, jdid, 'hlooooooooooooooooooooo');


$.ajax({
  url:'/status',
  method:'POST',
  data:{jdid:jdid, status:status},
  success: function(res){
    if(res=="success"){
    swal.fire({
      icon: "success",
      title: "Successfully Updated!",
     text:"successfully inserted a data"
    
    })
    .then(function(){
      location.reload()
    })


  }
  else{
    swal.fire({
      icon: "error",  
      title: "Oops...Something went wrong!",
      text:"Please try again!"
   
    })
  }
   
  }
})
})
// function openAndPrintEJS() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'template.ejs', true);
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//           if (xhr.status === 200) {
//               var templateContent = xhr.responseText;
//               var data = { name: 'World' }; // Your data object
//               var renderedHtml = ejs.render(templateContent, data);
//               var printWindow = window.open('', '_blank');
//               printWindow.document.open();
//               printWindow.document.write(renderedHtml);
//               printWindow.document.close();
//               // Trigger print dialog after window content is loaded
//               printWindow.onload = function() {
//                   printWindow.print();
//               };
//           } else {
//               console.error('Error fetching template:', xhr.statusText);
//           }
//       }
//   };
//   xhr.send();
// }



// JavaScript to handle toggle button functionality
// const toggleButton = document.getElementById('toggleButton');
// toggleButton.addEventListener('change', function() {
//     const options = document.getElementById('options');
//     if (this.checked) {
//         options.value = "Active";
//     } else {
//         options.value = "Inactive";
//     }
// });


$(document).on('focus','#options',function(){
let tr=$(this).closest('tr');
let status_td=$(tr).find('td').eq(10).find('select')
let option_val_1=status_td.find('option').eq(0).val();
let option_2=status_td.find('option').eq(1)
let option_val_2=status_td.find('option').eq(1).val();
let option_3=status_td.find('option').eq(2)
let option_val_3=status_td.find('option').eq(2).val();
console.log(option_val_1,'option_val_1_1')
console.log(option_val_2,'option_val_2_2')
console.log(option_val_3,'option_val_3_3')


if(option_val_1=='Active'){
  $(option_3).removeAttr('hidden').addClass('active_style')
}

else if(option_val_1=='Inactive'){
  $(option_2).removeAttr('hidden').addClass('in_active_style')
}


})




// --------------------status function js start--------------------
// --------------------status function js start--------------------
$(document).on('change', '#options ', function() {

let selectedOption = $(this).val();
console.log(selectedOption,'qq')
$(this).removeClass('active_style in_active_style');

if(selectedOption == 'Active') {
  console.log('entry1')
  $(this).addClass('active_style')
} else if(selectedOption == 'Inactive') {
  console.log('entry2')

  $(this).addClass('in_active_style')
}


});


function status_color(){
let tr = $('#jd_table tbody tr'); 

tr.each(function(){
  let options = $(this).find('#options');   
  let options_val = options.find('option')
  
  let  options_val11=options_val[0].innerHTML.trim()
  // options.removeClass('active_style in_active_style'); 
  
  if(options_val11 == 'Active') {
    options.addClass('active_style');
  } else if(options_val11 == 'Inactive') {
    options.addClass('in_active_style');
  }
  
});
}


$(document).ready(function(){
status_color()
});



$(document).on('click','.table_1 #jd_table_length select',function(){
  status_color()
})

$(document).on('input','#jd_table_filter input',function(){
  status_color()
})

$(document).on('click','.paginate_button ',function(){
  status_color()
})
$(document).on('click','#jd_table thead tr',function(){
  status_color()
})

// $(document).on('click',function(){
// status_color()
// })



// $(document).on('change',function(){
// status_color()
// })
// --------------------status function js end--------------------
// --------------------status function js end--------------------













// ----------------datepicker function js start------------------
// ----------------datepicker function js start------------------
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
// ----------------datepicker function js end------------------
// ----------------datepicker function js end------------------




// -------------------------filter js start---------------------
// -------------------------filter js start---------------------
$(document).on('click','#search_btn',function(){
let from_date=$('#from_date').val().trim()
let to_date=$('#to_date').val().trim()
let status_val= $('#status_filter').val().trim()
console.log(from_date,'from_date')
console.log(to_date,'to_date')
console.log(status_val,'status_val')

  $.ajax({
    url:'/manage_jd_filter',
    method:'post',
    data:{
      from_date:from_date,
      to_date:to_date,
      status_val:status_val
    },
    success:function(res){
      console.log(res.data1,'data1111')

      let table=$('#jd_table').DataTable()
      table.destroy()
      $('#jd_table tbody').empty()
      
      for(let i=0; i<res.data1.length; i++){
      
        $('#jd_table tbody').append(
        `
        <tr>          
        <td >${res.data1[i].prefix.concat(res.data1[i].jd_id)}</td>
        <td>${res.data1[i].job_title}</td>
        <td>${res.data1[i].function}</td>
        <td>${res.data1[i].business}</td>
        <td>${res.data1[i].creation_date}</td>
        <td class="date">${res.data1[i].created_by}</td>
        <td>${res.data1[i].modified_date}</td>
        <td>${res.data1[i].modified_by}</td>
        <td><i class="fas fa-edit update_j" data-bs-toggle="modal" data-bs-target="#exampleModal" jd_id="${res.data1[i].prefix.concat(res.data1[i].jd_id)}" jtitle="${res.data1[i].job_title}" func="${res.data1[i].function}"   business="${res.data1[i].business}" about="${res.data1[i].about_us}" role_s="${res.data1[i].role_summary}" role_res="${res.data1[i].role_nd_responsibilites}"
         k_per="${res.data1[i].key_performance}" edu="${res.data1[i].education_qualification}"></i></td>
         <td>
        <i class="fa-solid fa-file-pdf dwnld" ></i>
            <!-- <a href="/pdf"onclick="openAndPrintEJS()" rel="noopener noreferrer"><i class="fa-solid fa-file-pdf" ></i></a> -->
        </td>
    
      
    
      
        <td>
            <select name="options" id="options" class="form-select">
            <option  selected disabled value="${res.data1[i].jd_status}">${res.data1[i].jd_status}</option>
        
            <option hidden  value="Active">Active</option>
            <option hidden  value="Inactive">Inactive</option>
            </select>
        </td>
        <td><button id="button" >Save</button></td>
    
    
        
        
        
    
    </tr>

        `
      )


      }

      datatable()
      status_color()



    },
    error(err){
      console.log(err,'err')
    }

  })

})

$(document).on('click','#reset_btn',function(){
location.reload()
})
// -------------------------filter js end---------------------
// -------------------------filter js end---------------------

