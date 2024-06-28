// ---------------------member sign image js start--------------------- 
// ---------------------member sign image js start--------------------- 


$(document).ready(function(){
    $(document).on('click','#member_sign_box',function(){
        $('#member_sign_input').click()
    })

})


$(document).on('change','#member_sign_input',function(){
    let member_sign_img=$(this)[0].files[0]
    console.log(member_sign_img,'member_sign_img')
        
    let reader=new FileReader()
        reader.onload=function(e){
            $('#member_sign_img').removeAttr('hidden')
            $('#member_sign_img').attr('src','')
            $('#member_sign_img').attr('src',e.target.result)            
        }
        reader.readAsDataURL(member_sign_img)
    
})
// ---------------------member sign image js end--------------------- 
// ---------------------member sign image js end--------------------- 


// ---------------------employer sign image js start--------------------- 
// ---------------------employer sign image js start--------------------- 

$(document).ready(function(){
    $(document).on('click','#employer_sign_box',function(){
        $('#employer_sign_input').click()
    })

})


$(document).on('change','#employer_sign_input',function(){
    let employer_sign_img=$(this)[0].files[0]
    console.log(employer_sign_img,'employer_sign_img')
        
    let reader=new FileReader()
        reader.onload=function(e){
            $('#employer_sign_img').removeAttr('hidden')
            $('#employer_sign_img').attr('src','')
            $('#employer_sign_img').attr('src',e.target.result)            
        }
        reader.readAsDataURL(employer_sign_img)
    
})
// ---------------------employer sign image js end--------------------- 
// ---------------------employer sign image js end--------------------- 








$(document).on('click','#father',function(){
    $('#spouse').prop('checked',false)
})
$(document).on('click','#spouse',function(){
    $('#father').prop('checked',false)
})
$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
        dateFormat: "dd-mm-yy",
    });
});


// mobile number js start        
// mobile number js start        
  $(document).on('input','#mobile_no',function(){
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
// mobile number js end        
// mobile number js end        


// yes or no check or uncheck function js start
// yes or no check or uncheck function js start
        $(document).on('click','.yes_check',function(){

            let no=$(this).closest('tr').find('td').find('.no_check')

            no.prop('checked',false)
        })
        $(document).on('click','.no_check',function(){

            let yes=$(this).closest('tr').find('td').find('.yes_check')

            yes.prop('checked',false)
        })


// yes or no check or uncheck function js end
// yes or no check or uncheck function js end





// -----------international_worker condition js start-------------
// -----------international_worker condition js start-------------


$(document).ready(function(){
    international_worker_condition()  
})


$(document).on('change', '#international_work_yes, #international_work_no', function(){
    international_worker_condition()  
});


function international_worker_condition(){
    let international_work_yes = $('#international_work_yes').prop('checked');
    let international_work_no = $('#international_work_no').prop('checked');

    if (international_work_no || !international_work_yes) {
        $('#country_name, #passport_no, #passport_issue_date, #passport_expiry_date').prop('disabled', true);
        $('#country_name, #passport_no, #passport_issue_date, #passport_expiry_date').val('');
    } 
    else if(!international_work_no && !international_work_yes){
        $('#country_name, #passport_no, #passport_issue_date, #passport_expiry_date').prop('disabled', true);
    }
    else {
        $('#country_name, #passport_no, #passport_issue_date, #passport_expiry_date').prop('disabled', false);
    }
}

// -----------international_worker condition js end-------------
// -----------international_worker condition js end-------------



$(document).on('click','#submit_btn',function(){    
    let candidate_id=$('#candidate_id').val()
    let emp_code=$('#emp_code').val()
    let company=$('#company').val()
    let candidate_name=$('#candidate_name').val()
    let father_spouse_name=$('#father_spouse_name').val()
    let candidate_DOB=$('#candidate_DOB').val()
    let candidate_gender=$('#candidate_gender').val()
    let candidate_marital_status=$('#candidate_marital_status').val()
    let candidate_email_id=$('#candidate_email_id').val()
    let candidate_mobile_no=$('#candidate_mobile_no').val()    
    let member_of_epfs_1952=get_member_of_epfs_1952()
    let member_of_eps_1995=get_member_of_eps_1995()
    let uan_no=$('#uan_no').val()
    let pre_pf_acc_no=$('#pre_pf_acc_no').val()
    let date_of_exit_from_prev=$('#date_of_exit_from_prev').val()
    let scheme_certificate_no=$('#scheme_certificate_no').val()
    let pension_payment_order_no=$('#pension_payment_order_no').val()
    let international_worker=get_international_worker()
    let country_name=$('#country_name').val()
    let passport_no=$('#passport_no').val()
    let passport_issue_date=$('#passport_issue_date').val()
    let passport_expiry_date=$('#passport_expiry_date').val()
    let bank_acc_no=$('#bank_acc_no').val()
    let ifs_code=$('#ifs_code').val()
    let aaddhar_no=$('#aaddhar_no').val()
    let pan_no=$('#pan_no').val()
    let undertaking_date=$('#undertaking_date').val()
    let undertaking_place=$('#undertaking_place').val()
    let member_sign_input=$('#member_sign_input')[0].files[0]
    let candidate_joining_date=$('#candidate_joining_date').val()
    let alloted_pf_no=$('#alloted_pf_no').val()
    let alloted_uan_no=$('#alloted_uan_no').val()
    let declaration_date=$('#declaration_date').val()
    let employer_sign_input=$('#employer_sign_input')[0].files[0]
    
    let declaration_b_checkbox=$('#declaration_b_checkbox_val').val()
    let declaration_c_checkbox=$('#declaration_c_checkbox_val').val()

console.log(international_worker,'international_worker')


    if(!emp_code || !company || !candidate_name || !father_spouse_name || !candidate_DOB || !candidate_gender || !candidate_marital_status || !candidate_email_id || !candidate_mobile_no || !member_of_epfs_1952 || !member_of_eps_1995 || !uan_no || !pre_pf_acc_no || !date_of_exit_from_prev || !scheme_certificate_no || !pension_payment_order_no || !international_worker || !bank_acc_no || !ifs_code || !aaddhar_no || !pan_no || !undertaking_date || !undertaking_place || !member_sign_input || !candidate_joining_date || !alloted_pf_no || !alloted_uan_no || !declaration_date || !employer_sign_input || !declaration_b_checkbox || !declaration_c_checkbox){
        swal.fire({
            title: "Error!",
            text: "Please fill all fields1111",
            icon: "error"
        })   
    }
    else if(international_worker=='Yes' && (!country_name || !passport_no || !passport_issue_date || !passport_expiry_date)){        
            swal.fire({
                title: "Error!",
                text: "Please fill all fields2222",
                icon: "error"
            })           
    }

    else{

    
    let formData=new FormData()
    formData.append('candidate_id',candidate_id)
    formData.append('emp_code',emp_code)
    formData.append('company',company)
    formData.append('candidate_name',candidate_name)
    formData.append('father_spouse_name',father_spouse_name)
    formData.append('candidate_DOB',candidate_DOB)
    formData.append('candidate_gender',candidate_gender)
    formData.append('candidate_marital_status',candidate_marital_status)
    formData.append('candidate_email_id',candidate_email_id)
    formData.append('candidate_mobile_no',candidate_mobile_no)
    formData.append('member_of_epfs_1952',member_of_epfs_1952)
    formData.append('member_of_eps_1995',member_of_eps_1995)
    formData.append('uan_no',uan_no)
    formData.append('pre_pf_acc_no',pre_pf_acc_no)
    formData.append('date_of_exit_from_prev',date_of_exit_from_prev)
    formData.append('scheme_certificate_no',scheme_certificate_no)
    formData.append('pension_payment_order_no',pension_payment_order_no)
    formData.append('international_worker',international_worker)
    formData.append('country_name',country_name)
    formData.append('passport_no',passport_no)
    formData.append('passport_issue_date',passport_issue_date)
    formData.append('passport_expiry_date',passport_expiry_date)
    formData.append('bank_acc_no',bank_acc_no)
    formData.append('ifs_code',ifs_code)
    formData.append('aaddhar_no',aaddhar_no)
    formData.append('pan_no',pan_no)
    formData.append('undertaking_date',undertaking_date)
    formData.append('undertaking_place',undertaking_place)
    formData.append('member_sign_input',member_sign_input)
    formData.append('candidate_joining_date',candidate_joining_date)
    formData.append('alloted_pf_no',alloted_pf_no)
    formData.append('alloted_uan_no',alloted_uan_no)
    formData.append('declaration_date',declaration_date)
    formData.append('employer_sign_input',employer_sign_input)
    formData.append('declaration_b_checkbox',declaration_b_checkbox)
    formData.append('declaration_c_checkbox',declaration_c_checkbox)

    
    


        $.ajax({
            url:'/candidate_pf_form11',
            method:'post',
            data:formData,
            processData:false,
            contentType:false,
            success:function(res){
                if (res === "success") {
                    swal.fire({
                        title: "Successful!",
                        text: "Successfully Inserted",
                        icon: "success"
                    })
                    .then(() => {
                        window.location.href='/candidate_pf_form11_pdf'
                    });
                }

            },
            error:function(err){
                console.log(err)
            }
        })
    }

})



// yes or no text get from this function js start
// yes or no text get from this function js start

function get_member_of_epfs_1952(){
    let {yes_status,no_status}=yes_no_status('.yes_check_epfs','.no_check_epfs')

    if(yes_status){
       return member_of_epfs_1952=$('#member_of_epfs_1952_yes').text()
    }
    else if(no_status){

        return member_of_epfs_1952=$('#member_of_epfs_1952_no').text()
    }
    else{
        return ''
    }

}


function get_member_of_eps_1995(){
    let {yes_status,no_status}=yes_no_status('.yes_check_eps','.no_check_eps')

    if(yes_status){
       return member_of_eps_1995=$('#member_of_eps_1995_yes').text()
    }
    else if(no_status){

        return member_of_eps_1995=$('#member_of_eps_1995_no').text()
    }
    else{
        return ''
    }

}



function get_international_worker(){
    let {yes_status,no_status}=yes_no_status('.yes_check_international_worker','.no_check_international_worker')

    if(yes_status){
       return member_of_epfs_1952=$('#international_work_span_id_yes').text()
    }
    else if(no_status){

        return member_of_epfs_1952=$('#international_work_span_id_no').text()
    }
    else{
        return ''
    }

}


function yes_no_status(yesSelector,noSelector){
    let yes_status=$(yesSelector).prop('checked')
    let no_status=$(noSelector).prop('checked')
    return {
        yes_status:yes_status,
        no_status:no_status
    }
}

// yes or no text get from this function js end
// yes or no text get from this function js end



// declaration_b_option
// declaration_c_option


$(document).on('click','#declaration_b_checkbox1',function(){
    $('#declaration_b_checkbox_val').val('checked-1')
    $('#declaration_b_checkbox2').prop('checked',false)
    $('#declaration_b_checkbox3').prop('checked',false)
})

$(document).on('click','#declaration_b_checkbox2',function(){
    $('#declaration_b_checkbox_val').val('checked-2')
    $('#declaration_b_checkbox1').prop('checked',false)
    $('#declaration_b_checkbox3').prop('checked',false)
})

$(document).on('click','#declaration_b_checkbox3',function(){
    $('#declaration_b_checkbox_val').val('checked-3')
    $('#declaration_b_checkbox1').prop('checked',false)
    $('#declaration_b_checkbox2').prop('checked',false)
})




$(document).on('click','#declaration_c_checkbox1',function(){
    $('#declaration_c_checkbox_val').val('checked-1')
    $('#declaration_c_checkbox2').prop('checked',false)
})
$(document).on('click','#declaration_c_checkbox2',function(){
    $('#declaration_c_checkbox_val').val('checked-2')
    $('#declaration_c_checkbox1').prop('checked',false)
})

















