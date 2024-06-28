$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
        dateFormat: "dd-mm-yy",
    });
});


// ------------family_detl_tbl js start---------------
// ------------family_detl_tbl js start---------------


function updateSerialNumbers() {
    $("#family_detl_tbl tbody tr").each(function (index) {
        $(this).find('td').eq(0).text(index + 1);
    });
}

$(document).on("click", "#family_detl_btn", function () {
    let lastIndex = $("#family_detl_tbl tbody tr").length;
    let newIndex = lastIndex + 1;
    $("#family_detl_tbl tbody").append(
        `
        <tr class="text-center table_width">
                    <td>${newIndex}</td>

        <td><input type="text" name="" id="" class="form-control"></td>
        <td><input type="text" name="" id="" class="form-control"></td>
        <td><input type="date" name="" id="" class="form-control"></td>
        <td colspan="2"><input type="text" name="" id="" class="form-control"></td>
        <td><i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i></td>
</tr>
        `
    );
});

$(document).on("click", "#family_detl_tbl tbody tr td:nth-child(6) #delete_btn", function () {
    $(this).closest('tr').remove();
    updateSerialNumbers();
});

// ------------family_detl_tbl js end---------------
// ------------family_detl_tbl js end---------------

// ------------family_detl_tbl_1 js start---------------
// ------------family_detl_tbl_1 js start---------------


function updateSerialNumbers() {
    $("#family_detl_tbl_1 tbody tr").each(function (index) {
        $(this).find('td').eq(0).text(index + 1);
    });
}

$(document).on("click", "#family_detl_btn_1", function () {
    let lastIndex = $("#family_detl_tbl_1 tbody tr").length;
    let newIndex = lastIndex + 1;
    $("#family_detl_tbl_1 tbody").append(
        `
        <tr class="text-center table_width">
                    <td><input type="text" name="" id="" class="form-control"></td>

        <td><input type="text" class="form-control f_13 datepicker1" placeholder="Enter Date Of Birth...."></td>
        <td><input type="text" name="" id="" class="form-control"></td>
        <td><i class="fa-solid fa-trash-can text-danger" id="delete_btn"></i></td>
</tr>
        `
    );
});

$(document).on("click", "#family_detl_tbl_1 tbody tr td:nth-child(4) #delete_btn", function () {
    $(this).closest('tr').remove();
    updateSerialNumbers();
});

// ------------family_detl_tbl_1 js end---------------
// ------------family_detl_tbl_1 js end---------------



document.getElementById('pdf_generat').addEventListener('click', function() {
    const element = document.getElementById('content-pdf');
      const opt = {
      margin: 0.5,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  

    html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
      const formData = new FormData();
      formData.append('pdf', pdfBlob, 'candidate_document.pdf');
      $.ajax({
        type: 'POST',
        url: '/candidate_new_form_1_pdf',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if(res.success){
            Swal.fire({
              title: "Good job!",
              text: "Pdf Submitted",
              icon: "success"
            }).then((result)=>{
              if(result.isConfirmed){
                window.location.href='#'
              }
            })
          }
              },
        error: function(error) {
          console.error('Error uploading PDF:', error);
        }
      });
    });
  });

