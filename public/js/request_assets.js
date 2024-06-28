




$(document).on('change', '.updateSelection', function () {
    var selected = [];
    $('.updateSelection:checked').each(function () {
        selected.push($(this).val());
    });

    var buttonText = selected.length > 0 ? selected.join(', ') : 'Select';
    $("#dpt").text(buttonText);
});






$(document).ready(function () {
    $.ajax({
        url: "/mail_cc",
        method: 'POST',
        success: function (res) {
            let dropdownMenu = $('#emailDropdown');
            dropdownMenu.empty(); 

            for (let i = 0; i < res.length; i++) {
                dropdownMenu.append(`
                    <li>
                        <label class="mx-2 f_13 fw_600">
                            <input type="checkbox" class="updateSelection" value="${res[i]}">
                            <span class="ms-2 mb-2">${res[i]}</span>
                        </label>
                    </li>
                `);
            }
        },
        error: function (err) {
            console.error('Error:', err);
        }
    });
});




$(document).on('click','#sub_btn',function(event){
    event.preventDefault();
    let asset_type=$('#asset_type').val()
    let mail_to=$('#mail_to').val()
    let remarks=$('#remarks').val()
    
    let mail_cc = [];
    $('.updateSelection:checked').each(function () {
        mail_cc.push($(this).val());
    });
    
    
    let mail_cc_join=mail_cc.join(';')
    // let mail_cc_join="yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com"
    
    console.log(remarks,'remarks')
    console.log(mail_to,'mail_to')
    console.log(asset_type,'asset_type')
    console.log(mail_cc_join,'mail_cc_join')

    if(!asset_type  || !remarks){
        console.log('ddd')
        Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please fill mandatory fields",
          });
     return;   
    }

    $.ajax({
        url:'/request_assets',
        method:'post',
        data:{
            asset_type:asset_type,
            mail_to:mail_to,
            remarks:remarks,
            mail_cc_join:mail_cc_join   
        },
        success:function(res){
            console.log(res.assets_req_id,'ddddddd')
            if(res.status=='success'){
                Swal.fire({
                    title: "Good job!",
                    html: `Assets Request Successfully sent <br> Request Id : ${res.assets_req_id}`,
                    icon: "success"
                }).then(function(){
                    location.href='/request_assets'
                })
            }
            
        }
    })
})



$(document).ready(function () {
    $("#remarks").on("keyup", function () {
        charCount(this);
    });
});



function charCount(textarea) {
    var max = 500;
    var length = textarea.value.length;
    var remaining = max - length;

    if (remaining < 0) {
        textarea.value = textarea.value.substring(0, max);
        $("#textcount").text('0').addClass('text-danger');
    } else {
        if (remaining < 20) {
            $("#textcount").addClass('text-danger');
        } else {
            $("#textcount").removeClass('text-danger');
        }
        $("#textcount").text(remaining);
    }
}