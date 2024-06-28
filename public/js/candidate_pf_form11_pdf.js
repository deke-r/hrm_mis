
document.getElementById('generatePdfBtn').addEventListener('click', function() {

    const element = document.getElementById('pdf_cont');
    const opt = {
      margin: 0.2,
      filename: 'candidate_pf_form11_pdf.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    
    html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
    
        const formData = new FormData();
      formData.append('pdf', pdfBlob, 'candidate_pf_form11_pdf.pdf'); 
  console.log(formData,'formData11')
      $.ajax({
        type: 'POST',
        url: '/candidate_pf_form11_pdf',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            if(res=='success'){
                alert('pdf successfully uploaded')
            }
        },
        error: function(error) {
            console.log(err)
        }
      });
    });
  });


// ---------------------------------------------------------------
// ---------------------------------------------------------------

// document.getElementById('generatePdfBtn').addEventListener('click', function() {

//     const element = document.getElementById('pdf_cont');
//     const opt = {
//       margin: 0.5,
//       filename: 'candidate_pf_form11_pdf.pdf',
//       image: { type: 'jpeg', quality: 1.0 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
    
    
//     html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
        
//         const formData = new FormData();
//       formData.append('pdf', pdfBlob, 'candidate_pf_form11_pdf.pdf'); 
//       console.log(formData,'formData11')
//       $.ajax({
//           type: 'POST',
//           url: '/candidate_pf_form11_pdf',
//           data: formData,
//           processData: false,
//           contentType: false,
//           success: function(res) {
//               if(res=='success'){
//                   alert('pdf successfully uploaded')
//                 }
//             },
//             error: function(error) {
//                 console.log(err)
//             }
//         });
//     });
// });
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------







// document.getElementById('generatePdfBtn').addEventListener('click', function() {
//     // Select the HTML element to be converted to PDF
//     const element = document.getElementById('pdf_cont');

//     // Options for PDF generation
//     const options = {
//         margin: 0.5,
//         filename: 'document.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     // Generate PDF
//     html2pdf().from(element).set(options).save();
// });


// document.getElementById('generatePdfBtn').addEventListener('click', function() {
//     // Select the HTML element to be converted to PDF
//     const element = document.getElementById('pdf_cont');

//     // Options for PDF generation
//     const options = {
//         margin: 0.5,
//         filename: 'document.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };


//     html2pdf().set(options).from(element).output('blob').then(function(pdfBlob) {
//         const formData = new FormData();
//         formData.append('pdf', pdfBlob, 'candidate_pf_form11_pdf.pdf'); 
    
//         $.ajax({
//           type: 'POST',
//           url: '/candidate_pf_form11_pdf',
//           data: formData,
//           processData: false,
//           contentType: false,
//           success: function(res) {
//               if(res=='success'){
//                   alert('pdf successfully uploaded')
//               }
//           },
//           error: function(error) {
//               console.log(error)
//           }
//         });
//       });


// })









// document.getElementById('generate-pdf').addEventListener('click', function() {
//     const element = document.getElementById('content');
//     const opt = {
//       margin: 1,
//       filename: 'candidate_document.pdf',
//       image: { type: 'jpeg', quality: 1.0 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
  
//      html2pdf().set(opt).from(element).save()

// });








//   ----------------------------------
//   ----------------------------------
//   ----------------------------------
//   ----------------------------------
//   ----------------------------------
//   ----------------------------------
//   ----------------------------------

// document.getElementById('generate-pdf').addEventListener('click', function() {
//     const element = document.getElementById('pdf_content');
//     const opt = {
//       margin: 1,
//       filename: 'candidate_pf_form11_pdf.pdf',
//       image: { type: 'jpeg', quality: 1.0 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
  
//     html2pdf().set(opt).from(element).output('blob').then(function(pdfBlob) {
//       const formData = new FormData();
//       formData.append('pdf', pdfBlob, 'candidate_pf_form11_pdf.pdf'); 
  
//       $.ajax({
//         type: 'POST',
//         url: '/candidate_pf_form11_pdf',
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function(res) {
//             if(res=='success'){
//                 alert('pdf successfully uploaded')
//             }
//         },
//         error: function(error) {
//             console.log(err)
//         }
//       });
//     });
//   });


//   ----------------------------------
//   ----------------------------------
//   ----------------------------------




