
function logout() {
 
  window.location.href = "/logout"; 
}

document.addEventListener("DOMContentLoaded", function() {
  fetch("/code_of_conduct_onload", {
    method: "POST"
  })
  .then(response => response.json())
  .then(res => {
    if (res.candidate && Object.keys(res.candidate).length > 0) {
      document.getElementById('codeOfConductItem').classList.add('d-none');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});