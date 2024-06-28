document.addEventListener("DOMContentLoaded", function() {
    var today = new Date().toISOString().split('T')[0];

    document.getElementById("from_date").setAttribute('min', today);
    document.getElementById("to_date").setAttribute('min', today);
});



$(document).ready(function(){
    $(document).on('click','#sub_btn',function(){
        let from_date=$('#from_date').val()
        let to_date=$('#to_date').val()
let annoucement=$('#annoucement').val()




$.ajax({
    url:'/annoucement_add',
    method:'POST',
    data:{
from_date:from_date,
to_date:to_date,
annoucement:annoucement
    },
    success:function(res){
if(res && res.success){
    Swal.fire({
        title: "Good job!",
        text: `${res.success}`,
        icon: "success"
      }).then(()=>{
        location.reload()
      })
}
    }

})
    })




$(document).on('click', '#delete', function() {
    let announcement_id = $(this).attr('announcement_id');
    
    $.ajax({
        url: '/announcement_delete',
        type: 'DELETE',
        data: { announcement_id: announcement_id },
        success: function(res) {
            if(res && res.success){
                Swal.fire({
                    title: "Good job!",
                    text: `${res.success}`,
                    icon: "success"
                  }).then(()=>{
                    location.reload()
                  })
            }
        },

    });
});

})


