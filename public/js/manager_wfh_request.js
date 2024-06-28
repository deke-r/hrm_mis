

let previousDate1 = null;
let previousDate2 = null;

$(function () {
    $("#datepicker").datepicker({
        minDate: "0D",
        dateFormat: 'dd-mm-yy',
        onSelect: function (dateText) {
            var selectedDate = $(this).datepicker('getDate');
            $("#datepicker2").datepicker("option", "minDate", selectedDate);
            compareDates();
        }
    });

    $("#datepicker2").datepicker({
        minDate: "0D",
        dateFormat: 'dd-mm-yy',
        onSelect: function (dateText) {
            compareDates();
        }
    });
});




$("#datepicker3").datepicker({
    minDate: "0D",
});


$(document).on('change', '#date_type', function () {
    let date_type = $('#date_type').val();
    if (date_type === 'Customize') {
        $('#fday').empty();
        $('#tday').empty();
        $('#dynamicContent').empty()
        $('.datepicker3').removeClass('d-none')
        $('.d22').removeClass('d-none')





    } else {
        location.reload()
    }
});





$(document).ready(function () {
    $("#datepicker3").datepicker({
        dateFormat: 'dd-mm-yy'
    });

    $("#button-addon2").click(function () {
        var selectedDate = $("#datepicker3").datepicker("getDate");
        var selectedType = $("select[name='multi_date_type']").val();
        if (selectedDate) {
            var formattedDate = $.datepicker.formatDate("dd-mm-yy", selectedDate);
            var newOption = $("<option></option>").text(formattedDate + ": " + selectedType);
            $(".custom-select-appended").append(newOption);
            $(".datepicker3").removeClass("d-none");
            $("#datepicker3").val("");

            var inputValue = $("#datesfrom").val();
            if (inputValue !== "") {
                inputValue += ", ";
            }
            inputValue += formattedDate + ": " + selectedType;
            $("#datesfrom").val(inputValue);
        } else {
            alert("Please select a date.");
        }
    });

    $("#button-delete2").click(function () {
        var selectedOption = $(".custom-select-appended option:selected");
        if (selectedOption.length > 0) {
            selectedOption.each(function () {
                $(this).remove();

                var valueToRemove = $(this).text();
                var inputValue = $("#datesfrom").val();
                inputValue = inputValue.replace(valueToRemove + ", ", "");
                inputValue = inputValue.replace(valueToRemove, "");
                $("#datesfrom").val(inputValue);
            });
        } else {
            alert("Please select an option to delete.");
        }
    });
});
















function compareDates() {
    var date1 = $("#datepicker").datepicker("getDate");
    var date2 = $("#datepicker2").datepicker("getDate");

    if (date1 && date2) {
        var day1 = date1.getDate();
        var month1 = date1.getMonth();
        var year1 = date1.getFullYear();

        var day2 = date2.getDate();
        var month2 = date2.getMonth();
        var year2 = date2.getFullYear();

        if (day1 === day2 && month1 === month1 && year1 === year2) {
            if (previousDate1 !== date1 || previousDate2 !== date2) {
                $("#dynamicContent").empty();
                appendRowWithDropdown(formatDate(date1), formatDate(date2));
                previousDate1 = date1;
                previousDate2 = date2;
            }
        } else {
            $("#dynamicContent").empty();
            previousDate1 = null;
            previousDate2 = null;
        }
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        diffDays++;

        $("#numDays").val(diffDays);

    }
}

function formatDate(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;
}

function appendRowWithDropdown(fromDate, toDate) {
    var container = $("#dynamicContent");
    var newRow = $(`
        <div class="row my-3 mt-4">
            <div class="col-md-4 my_cols">
                <h6 class="fw_bold f_13 ms-1">Day Type:</h6>
                <select name='day_type' class="form-select border-leftb box_sdw11 f_13 fw_600 day-type-select" aria-label="Default select example">
                    <option selected disabled>Select</option>
                    <option value="Half day">Half Day</option>
                    <option value="Full day">Full Day</option>
                </select>
            </div>
            <div class="col-md-4 my_cols" id="hff"></div>
        </div>
    `);
    container.append(newRow);

    newRow.find('.day-type-select').on('change', function () {
        var selectedValue = $(this).val();
        if (selectedValue === "Half day") {
            appendHalfDayDropdown(newRow.find('#hff'));
        } else {
            newRow.find('#hff').empty();
        }
    });
}

function appendHalfDayDropdown(container) {
    var halfDayDropdown = `
        <h6 class="fw_bold f_13 ms-1">Half Day Type:</h6>
        <select name='half_day_type' class="form-select border-leftb box_sdw11 f_13 fw_600" aria-label="Half day select">
            <option selected disabled>Select</option>
            <option value="First half">First Half</option>
            <option value="Second half">Second Half</option>
        </select>`;
    container.html(halfDayDropdown);
}


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


$(document).ready(function () {
    $("#myTextarea").on("keyup", function () {
        charCount(this);
    });
});


$(document).on('change', '.updateSelection', function () {
    var selected = [];
    $('.updateSelection:checked').each(function () {
        selected.push($(this).val());
    });

    var buttonText = selected.length > 0 ? selected.join(', ') : 'Select';
    $("#dpt").text(buttonText);
});





$(document).ready(function () {
    $('form').submit(function (event) {
        $('#loader-div').removeClass('d-none');
        event.preventDefault();
        var formData = new FormData($(this)[0]);



        var mailCC = [];
        $('.updateSelection:checked').each(function () {
            mailCC.push($(this).val());
        });
        formData.append('mailCC', mailCC.join(', '));

        $.ajax({
            type: 'POST',
            url: '/manager_wfh_request',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                $('#loader-div').addClass('d-none');
                if (res && res.success) {
                    Swal.fire({
                        title: "Good job!",
                        html: `Work From Home Request Sent Successfully <br> Request Id : ${res.success}`,
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            },
            error: function (error) {
                $('#loader-div').addClass('d-none');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        });
    });
});




$(document).ready(function () {
    $.ajax({
        url: "/manager_mail_cc",
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


