document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle password visibility
    function togglePasswordVisibility(passwordInput, eyeIcon) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.remove("bi-eye-slash");
            eyeIcon.classList.add("bi-eye");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("bi-eye");
            eyeIcon.classList.add("bi-eye-slash");
        }
    }

    // Add event listeners to toggle password visibility
    const togglePasswordIcons = document.querySelectorAll(".togglePassword");
    togglePasswordIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            const passwordFieldId = this.dataset.target;
            const passwordInput = document.getElementById(passwordFieldId);
            togglePasswordVisibility(passwordInput, this);
        });
    });

    // Handle form submission
    document.getElementById("changePasswordForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        var oldPassword = document.getElementById("oldPassword").value;
        var newPassword = document.getElementById("newPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        // Perform client-side validation (e.g., password length, match with confirm password)
        if (newPassword !== confirmPassword) {
            // alert("New password and confirm password do not match.");
            swal.fire({
                title: "Error",
                text: "New password and confirm password do not match.",
                icon: "error",
            })
            return;
        }

        // Check if the old password matches
        try {
            const response = await fetch("/checkOldPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ oldPassword: oldPassword })
            });
            const data = await response.json();
            if (data.success) {
                // Old password matches, make AJAX request to change password
                const changePasswordResponse = await fetch("/changePassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
                });
                if (changePasswordResponse.status === 200) {
                    // alert("Password updated successfully");
                    swal.fire({
                        title: "Password Changed",
                        text: "Successfully",
                        icon: "success",
                    })
                    // Logout and redirect to login page
                    window.location.href = "/logout";
                } else {
                    // alert("Failed to update password. Please try again.");
                    swal.fire({
                        title: "Error",
                        text: "Failed to change password",
                        icon: "error",
                    })
                }
            } else {
                // alert("Wrong password");
                swal.fire({
                    title: "Error",
                    text: "Old password does not match",
                    icon: "error",
                })
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error checking old password. Please try again.");
            
        }
    });
});
