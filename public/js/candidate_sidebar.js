$(document).on('click','.offbtn',function(){
    $('.dyn_row').toggleClass('justify-content-end')
    $('.dyn_col').toggleClass('col-xl-10 col-md-9 col-8 col-12')
   
  // if(nav_w==$('.change_width').width()){
  //   var get_width=$('#offcanvasWithBothOptions').width()
  //   // var nav_width=$('.change_width').width()
  // var cal_wid=Number(nav_w-get_width);
  // console.log(cal_wid)
  // $('.change_width').css({'width':cal_wid+'px' ,'margin-left':'auto'})
  // }
  // else{
  //   $('.change_width').css({'width':nav_w+'px'})
  
  // }
  })


  // $(document).ready(function () {
  //   $.ajax({
  //     url: "/code_of_conduct_onload",
  //     method: "POST",
  //     success: function (res) {

  //       if (res.candidate && Object.keys(res.candidate).length > 0) {
  //         $('#codeOfConductItem').addClass('d-none')
  //       }
  //     }
  //   });
  // });