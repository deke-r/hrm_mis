$(document).ready(function(){
    var body=$('.dyn_height')
    var height=body.height;
$('.height_vh').css('height',)
    
    })

$(document).on('click','#create',function(){
   
    var j_title=$('#Job_title').val()
    var fuc=$('#function').val()
    var buis=$('#Business').val()
    var au=$('#aboutUs').val()
    var role=$('#role').val()
    var resp=$('#responsibility').val()
    var kp=$('#key_performance').val()
    var quali=$('#Qualification').val()


    $.ajax({
        url:'/jd_creation',
        type:'POST',
        data:{
          job_title: j_title,
          funct: fuc,
          business: buis,
          about: au,
          role_s: role,
          role_res: resp,
          key_per: kp,
          edu_qual: quali
        },
        success: function(res) {
          if (res.success) {
            Swal.fire({
              title: "Successful!",
              text: `Your JD ID is MIS${res.jdid}`,
              icon: "success"
            }).then(() => {
              location.reload();
            });
          } else {
            alert('Fail');
          }
        },
        error: function() {
          alert('Error occurred while submitting the form.');
        }
      });
    })      