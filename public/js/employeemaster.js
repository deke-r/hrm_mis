function readFile(input) {
  const file = input.files[0];

  if (!file) {
    // Display a message on the page instead of an alert
    document.getElementById('uploadMessage').textContent = 'No File Selected.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const fileData = e.target.result;
 


    // Process CSV data using Papa Parse
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        const headers = Object.keys(results.data[0]);
        // console.log(headers)
        const tableHeaders = document.querySelector('#dataTable thead tr');
        tableHeaders.innerHTML = ''; // Clear existing headers

        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header.trim(); // Trimmed to remove any leading or trailing whitespaces
          tableHeaders.appendChild(th);
        });
        const totalCount = getTotalFieldCount(results.data);

        // Display total count to the user
        document.getElementById('totalCount').textContent = totalCount;
        populateTableData(results.data);
        console.log(results.data)
      }
    });

    // Display the uploaded file name
    const fileName = file.name;
    document.getElementById('showfilename').textContent = fileName;

    // Clear the upload message
    document.getElementById('uploadMessage').textContent = '';
  };

  reader.readAsText(file);
}

function getTotalFieldCount(data) {
  return data.length;
}

function populateTableData(data) {
  const dataBody = document.getElementById('dataBody');
  dataBody.innerHTML = '';

  data.forEach(row => {
    const tableRow = document.createElement('tr');

    Object.values(row).forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell.trim(); // Trimmed to remove any leading or trailing whitespaces
      tableRow.appendChild(td);
    });

    dataBody.appendChild(tableRow);
  });

  // Enable save button if there is data in the table
  const saveButton = document.getElementById('saveButton');
  saveButton.disabled = data.length === 0;
}

// $(document).on('click','#saveButton',function(){
//  var all_tr= $('#databody').find('tr')
//  var arr1=[]
//  all_tr.each(function(i){
//   var td=$(all_tr[i]).find(td)
//       var arr2=[]
//   arr2.push(all_tr[i])


//  })
// console.log(arr1)
// })
$(document).ready(function(){
  $(document).on('click','#saveButton',function(){
    $('#bod').addClass('class1')
    $('#loader').toggleClass('d-none d-flex').addClass('class2')
const tableRows = document.querySelectorAll('#dataBody tr');
  const xldata = [];

  tableRows.forEach(row => {
    const rowData = [];
    row.querySelectorAll('td').forEach(cell => {
      rowData.push(cell.textContent);
    });
    xldata.push(rowData);
  });
// var stringi=JSON.stringify(xldata)
  $.ajax({
    url:'/saveDataToDatabase',
    type:'post',
    dataType:'json',
    data:{form_data:xldata},
    success:function(res){
    if(res.count_insert||res.count_update){
      console.log(res)
      $('#bod').removeClass('class1')
      $('#loader').toggleClass('d-none d-flex').removeClass('class2')
      Swal.fire({
        title: "Success!",
        text: `${res.count_insert} new employee added , ${res.count_update} Employee Updated`,
        icon: "success"
      }).then(() => {
        location.reload(); // Reload the page after the Swal dialog is dismissed
      });
    }
    else if(res.dup=='duplic'){
      $('#bod').removeClass('class1')
      $('#loader').toggleClass('d-none d-flex').removeClass('class2')
      Swal.fire({
        title: "Warning!",
        text: `Duplicate E_id found : ${res.Duplicate.toString()}`,
        icon: "warning"
      }).then(() => {
        location.reload(); // Reload the page after the Swal dialog is dismissed
      });;
    }
    else{
      $('#bod').removeClass('class1')
      $('#loader').toggleClass('d-none d-flex').removeClass('class2')
      Swal.fire({
        title: "Error!",
        text: `Failed to upload Employee Master`,
        icon: "error"
      });
    }
    } 


  })
})

})



// Add this JavaScript code to handle search functionality
$(document).ready(function() {
  // Function to filter table rows based on search input
  function filterTableRows() {
      var input, filter, table, tr, td, i, j, txtValue;
      input = document.getElementById("searchInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("dataBody"); // Assuming table body ID is "dataBody"
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
          var found = false;
          for (j = 0; j < tr[i].cells.length; j++) {
              td = tr[i].cells[j];
              if (td) {
                  txtValue = td.textContent || td.innerText;
                  if (txtValue.toUpperCase().indexOf(filter) > -1) {
                      found = true;
                      break; // Break loop if match found in current cell
                  }
              }
          }
          if (found) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }

  // Event listener for search input
  $('#searchInput').on('input', function() {
      filterTableRows();
  });
});


// function saveDataToDatabase() {
//   // Collect data from the table and send it to the backend

//   // Sending data to the backend
//   fetch('/saveDataToDatabase', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => {
//     if (response.ok) {
//       alert('Data saved successfully!');
//       window.location.reload();
//     } else {
//       throw new Error('Failed to save data');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     alert('Failed to save data');
//   });
// }