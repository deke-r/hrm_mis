document.getElementById('generate-pdf').addEventListener('click', function() {
  const element = document.getElementById('content-pdf');
    const opt = {
    margin: 0.5,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
};


  html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'candidate_document.pdf');
    $.ajax({
      type: 'POST',
      url: '/candidate_documents_pdf',
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