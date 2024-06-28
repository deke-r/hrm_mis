$(document).on('click', '#submit_btn' , function(){

          let tr=$(this).closest('tr')
          let emp_id=tr.find('td').eq(0).text().trim()
         
          var status = tr.find('#STATUS').val();
         
  

   


     $.ajax({
        url: '/admin_status',
        type: 'POST',
        data: {emp_id:emp_id ,status:status},

        success: function(res){
            if(res=="success"){
            swal.fire({
              icon: "success",
              title: "Successfully Updated Status!",
             text:"Successfully Upadate a data"
            
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
                "targets": [0,1,2,3],
            
                 "className": "no-sorting"
             }],
             
             initComplete: function() {   
                 $(".no-sorting").removeClass('sorting_asc');
             }
          }) 
        })
        
        

        
// $(document).on('focus','#STATUS',function(){
//   let tr=$(this).closest('tr');
 
//   let status_td=$(tr).find('td').eq(13).find('select')
//   console.log(status_td,"ddujdjuf") 
//   let option_val_1=status_td.find('option').eq(0).val();
//   let option_2=status_td.find('option').eq(1)
//   let option_val_2=status_td.find('option').eq(1).val();
//   let option_3=status_td.find('option').eq(2)
//   let option_val_3=status_td.find('option').eq(2).val();
//   console.log(option_val_1,'option_val_1_1')
//   console.log(option_val_2,'option_val_2_2')
//   console.log(option_val_3,'option_val_3_3')
  
  
//   if(option_val_1=='1'){
//     $(option_3).removeAttr('hidden').addClass('active_style')
//   }
  
//   else if(option_val_1=='0'){
//     $(option_2).removeAttr('hidden').addClass('in_active_style')
//   }
  
  
//   })
  
  
  
  
//   // --------------------status function js start--------------------
//   // --------------------status function js start--------------------
//   $(document).on('change', '#STATUS ', function() {
  
//   let selectedOption = $(this).val();
//   console.log(selectedOption,'qq')
//   $(this).removeClass('active_style in_active_style');
  
//   if(selectedOption == '1') {
//     console.log('entry1')
//     $(this).addClass('active_style')
//   } else if(selectedOption == '0') {
//     console.log('entry2')
  
//     $(this).addClass('in_active_style')
//   }
  
  
//   });
  
  
//   function status_color(){
//   let tr = $('#jd_table tbody tr'); 
  
//   tr.each(function(){
//     let options = $(this).find('#STATUS');   
//     let options_val = options.find('STATUS')
    
//     let  options_val11=options_val[0].innerHTML.trim()
//     // options.removeClass('active_style in_active_style'); 
    
//     if(options_val11 == '1') {
//       options.addClass('active_style');
//     } else if(options_val11 == '0') {
//       options.addClass('in_active_style');
//     }
    
//   });
//   }
  
          
$(document).ready(function() {
  // Function to initially set colors based on status
  function status_color() {
      $('#jd_table tbody tr').each(function() {
          let options = $(this).find('.status-dropdown');
          let status = options.data('status');

          options.removeClass('active_style in_active_style');

          if (status == '1') {
              options.addClass('active_style');
          } else if (status == '0') {
              options.addClass('in_active_style');
          }
      });
  }

  // Highlight rows based on initial status
  status_color();

  // Change event for status dropdown
  $(document).on('change', '.status-dropdown', function() {
      let selectedOption = $(this).val();
      $(this).removeClass('active_style in_active_style');

      if (selectedOption == '1') {
          $(this).addClass('active_style');
      } else if (selectedOption == '0') {
          $(this).addClass('in_active_style');
      }
  });
});
