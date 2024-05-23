document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.querySelector('#username').value.trim();
            const password = document.querySelector('#password').value.trim();

            if (username && password) {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to log in.');
                }
            }
        });
    }

    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.querySelector('#username').value.trim();
            const password = document.querySelector('#password').value.trim();
            const errorElement = document.querySelector('#signup-error');

            if (username && password) {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();

                if (response.ok) {
                    document.location.replace('/');
                } else {
                    errorElement.textContent = data.message; 
                }
            }
        });
    }

    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/login');
            } else {
                alert('Failed to log out.');
            }
        });
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard'); 
            } else {
                alert('Failed to delete post.');
            }
        });
    });
});
