$(document).ready(function () {
  const carouselElement = $("#carouselExample");
  const checkbox = $("#slideCheckbox");
  const carousel = new bootstrap.Carousel(carouselElement[0], {
    interval: false,
    ride: false,
  });

  let autoSlideInterval = setInterval(() => {
    if (!isLastSlide()) {
      carousel.next();
    } else {
      clearInterval(autoSlideInterval);
    }
  }, 60000);

  function isLastSlide() {
    const totalItems = $(".carousel-item").length;
    const currentIndex = $(".carousel-item.active").index() + 1;
    return currentIndex === totalItems;
  }

  function slideImmediately() {
    if (!isLastSlide()) {
      carousel.next();
      checkbox.prop("checked", false);
    }
  }

  checkbox.change(function () {
    if (checkbox.is(":checked")) {
      slideImmediately();
    }
  });

  carouselElement.on("slid.bs.carousel", function () {
    if (isLastSlide()) {
      carouselElement.find(".carousel-control-next").hide();
      checkbox.addClass("d-none");
      $("#lbsl").addClass("d-none");
      clearInterval(autoSlideInterval);
    } else {
      carouselElement.find(".carousel-control-next").show();
      checkbox.removeClass("d-none");
      $("#lbsl").removeClass("d-none");
    }
  });
});

$(document).on("focus", ".datepicker1", function () {
  $(this).datepicker({
    dateFormat: "dd-mm-yy",
  });
});

$(document).ready(function () {
  $("#submitBtn").click(function () {
      var firstName = $("#firstName").val();
      var lastName = $("#lastName").val();
      var employeeNo = $("#employeeNo").val();
      var department = $("#department").val();
      var date = $("#date").val();
      var signatureFile = $("#signature")[0].files[0];
      
      if (!firstName || !lastName || !employeeNo || !department || !date || !signatureFile) {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please fill all the fields!",
          });
          return;
      }

      var formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("employeeNo", employeeNo);
      formData.append("department", department);
      formData.append("date", date);
      formData.append("signature", signatureFile);
      
      $.ajax({
          url: "/code_of_conduct",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function (response) {
              Swal.fire({
                  title: "Good job!",
                  text: "Submitted!",
                  icon: "success",
              }).then(function() {
                  window.location.href = "/candidate_documents"; 
              });
          }
      });
  });
});

  
