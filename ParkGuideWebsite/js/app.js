console.log("Park Guide Management System Loaded.");

// Add event listener for the entire document to handle multiple pages
document.addEventListener("DOMContentLoaded", function() {

    // Handle Admin Dashboard functionality
    if (document.body.classList.contains('admin-dashboard')) {
        const guideLinks = document.querySelectorAll('.list-group-item a');
        guideLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Placeholder for handling navigation to other pages
                console.log(`Navigating to ${e.target.innerText}`);
            });
        });
    }

    // Handle Register New Park Guide Page functionality
    if (document.body.classList.contains('register-guide')) {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (username && email && password) {
                    console.log(`Registering new park guide: ${username}`);
                    alert('Guide Registered Successfully!');
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    }

    // Handle Update Park Guide Details Page functionality
    if (document.body.classList.contains('update-guide')) {
        const updateForm = document.getElementById('update-form');
        if (updateForm) {
            updateForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const guideId = document.getElementById('guide-id').value;
                const updatedName = document.getElementById('guide-name').value;
                const updatedEmail = document.getElementById('guide-email').value;

                if (guideId && updatedName && updatedEmail) {
                    console.log(`Updating guide: ${guideId}`);
                    alert('Guide details updated successfully!');
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    }

    // Handle Track & Renew Certifications Page functionality
    if (document.body.classList.contains('track-renewal')) {
        const renewalButtons = document.querySelectorAll('.renew-certification');
        renewalButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const guideId = e.target.dataset.guideId; // Assuming the button contains data-attribute for guide ID
                console.log(`Renewing certification for guide with ID: ${guideId}`);
                alert('Certification Renewed Successfully!');
            });
        });
    }

    // Handle Manage Training Programs Page functionality
    if (document.body.classList.contains('manage-trainings')) {
        const trainingForm = document.getElementById('training-form');
        if (trainingForm) {
            trainingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const trainingName = document.getElementById('training-name').value;
                const trainingDate = document.getElementById('training-date').value;

                if (trainingName && trainingDate) {
                    console.log(`Managing training program: ${trainingName}`);
                    alert('Training program managed successfully!');
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    }

    // Handle Send Renewal Reminders Page functionality
    if (document.body.classList.contains('send-renewal-reminders')) {
        const reminderForm = document.getElementById('reminder-form');
        if (reminderForm) {
            reminderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const guideId = document.getElementById('guide-id').value;

                if (guideId) {
                    console.log(`Sending renewal reminder to guide with ID: ${guideId}`);
                    alert('Renewal reminder sent successfully!');
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert('Please enter a valid guide ID.');
                }
            });
        }
    }

    // Handle Manage User Roles Page functionality
    if (document.body.classList.contains('manage-roles')) {
        const roleForm = document.getElementById('role-form');
        if (roleForm) {
            roleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const userId = document.getElementById('user-id').value;
                const newRole = document.getElementById('new-role').value;

                if (userId && newRole) {
                    console.log(`Updating role for user: ${userId} to ${newRole}`);
                    alert('User role updated successfully!');
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    }
});
