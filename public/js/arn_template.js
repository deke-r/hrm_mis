$(document).on("focus", ".datepicker1", function () {
    $(this).datepicker({
      dateFormat: "dd-mm-yy",
    });
  });



  $(document).ready(function () {
    $("#submitBtn").click(function () {
      var c_id=$('#c_id').text()
        var name = $("#name").val();
        var place = $("#place").val();
        var date = $("#date").val();
        var signatureFile = $("#signature")[0].files[0];
        
        if (!name || !place || !date || !signatureFile) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all the fields !",
              })
            return;
        }

        var formData = new FormData();
        formData.append("name", name);
        formData.append("place", place);
        formData.append("date", date);
        formData.append("signature", signatureFile);
        
        $.ajax({
            url: "/arn_template",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
              Swal.fire({
                  title: "Good job!",
                  text: "Submitted !",
                  icon: "success"
                }).then((result) => {
                  if (result.isConfirmed) {
                      window.location.href = `/arn_template_pdf/${c_id}`;
                  }
              });
          },
            error: function (xhr, status, error) {
                swal("Error", "Failed to submit form. Please try again later.", "error");
                console.error(xhr.responseText);
            }
        });
    });
});