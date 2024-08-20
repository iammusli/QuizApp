$(document).ready(function() {
    $('#profile').click(function() {
        $.ajax({
            url: '/rwa/admin/profile',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("Received JSON:", data);
                const userListHtml = data.map(user => `
                    <div class="profile-user" 
                    data-id="${user.id}" 
                    data-username="${user.username}" 
                    data-password="${user.password}" 
                    data-rank="#${user.id}" 
                    data-games="100" 
                    data-points="500" 
                    data-completion="75%" 
                    data-correct="70%" 
                    data-incorrect="30%"
                    data-isAdmin="${user.isAdmin}">
            ${user.username}
        </div>
                `).join('');

                $('.content').html(`
                    <div class="profile-body">
                        <div class="profile-user-list" id="profile-user-list">
                            ${userListHtml}
                        </div>
                        <div class="profile-card" id="profile-card">
                            <div class="profile-header" id="profile-header">
                                <h1>Profile Info <span id="edit-icon" class="profile-edit-icon"><i class="fas fa-pencil-alt"></i></span></h1>
                                <p id="profile-username">Username: </p>
                                <p id="profile-admin">Admin: </p>
                            </div>
                            <div class="profile-stats">
                                <div class="profile-stat">
                                    <p id="profile-rank">#99</p>
                                    <p>World rank</p>
                                </div>
                                <div class="profile-stat">
                                    <p id="profile-games">250</p>
                                    <p>Games played</p>
                                </div>
                                <div class="profile-stat">
                                    <p id="profile-points">1,084</p>
                                    <p>Points total</p>
                                </div>
                                <div class="profile-stat">
                                    <p id="profile-completion">82%</p>
                                    <p>Completion rate</p>
                                </div>
                                <div class="profile-stat">
                                    <p id="profile-correct">62%</p>
                                    <p>Correct answers</p>
                                </div>
                                <div class="profile-stat">
                                    <p id="profile-incorrect">38%</p>
                                    <p>Incorrect answers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="profile-edit-modal" class="profile-edit-modal">
                        <div class="profile-modal-content">
                            <span class="profile-close">&times;</span>
                            <h2>Edit Username</h2>
                            <input type="text" id="new-username" class="profile-new-username" placeholder="Enter new username" value="">
                            
                            <h2>Edit Password</h2>
                            <input type="password" id="new-password" class="profile-new-password" placeholder="Enter new password">

                             <h2>Set User Role</h2>
                            <div class="profile-role-switch">
                                <label class="profile-switch">
                                    <input type="checkbox" id="role-switch" checked>
                                    <span class="profile-slider round"></span>
                                </label>
                            </div>
                            
                            <button id="save-username" class="profile-save-username">Save</button>
                        </div>
                    </div>
                `);

                const userList = document.getElementById('profile-user-list');
                const profileCard = document.getElementById('profile-card');
                const profileHeader = document.getElementById('profile-header');
                const modal = document.getElementById('profile-edit-modal');
                const closeModal = document.querySelector('.profile-close');
                const saveUsernameButton = document.getElementById('save-username');
                const newUsernameInput = document.getElementById('new-username');
                const newPasswordInput = document.getElementById('new-password');
                const roleSwitch = document.getElementById('role-switch');
                const roleDisplay = document.getElementById('role-display');
                let currentUserId;

                function updateProfileCard(user) {
                    const id = user.getAttribute('data-id');
                    const username = user.getAttribute('data-username');
                    const password = user.getAttribute('data-password');
                    const rank = user.getAttribute('data-rank');
                    const games = user.getAttribute('data-games');
                    const points = user.getAttribute('data-points');
                    const completion = user.getAttribute('data-completion');
                    const correct = user.getAttribute('data-correct');
                    const incorrect = user.getAttribute('data-incorrect');
                    const isAdmin = user.getAttribute('data-isAdmin') === 'true';

                    currentUserId = id;

                    profileHeader.querySelector('h1').innerHTML = `Profile Info <span id="edit-icon" class="profile-edit-icon"><i class="fas fa-pencil-alt"></i></span>`;
                    profileHeader.querySelector('#profile-username').textContent = `Username: ${username}`;
                    profileHeader.querySelector('#profile-admin').textContent = `Admin: ${isAdmin ? 'True' : 'False'}`;

                    document.getElementById('profile-rank').textContent = rank;
                    document.getElementById('profile-games').textContent = games;
                    document.getElementById('profile-points').textContent = points;
                    document.getElementById('profile-completion').textContent = completion;
                    document.getElementById('profile-correct').textContent = correct;
                    document.getElementById('profile-incorrect').textContent = incorrect;

                    const editIcon = document.getElementById('edit-icon');
                    editIcon.addEventListener('click', () => {
                        modal.style.display = 'block';
                        newUsernameInput.value = username;
                        newPasswordInput.value = "";
                       // roleSwitch.checked = roleDisplay.textContent === 'Admin';
                        roleSwitch.checked = roleDisplay.textContent = isAdmin ? 'Admin' : 'User';

                    });
                }

                userList.addEventListener('click', (event) => {
                    if (event.target.classList.contains('profile-user')) {
                        updateProfileCard(event.target);
                    }
                });

                closeModal.addEventListener('click', () => {
                    modal.style.display = 'none';
                });

                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });

                saveUsernameButton.addEventListener('click', () => {
                    const newUsername = newUsernameInput.value;
                    const newPassword = newPasswordInput.value;
                    const isAdmin = roleSwitch.checked;

                    $.ajax({
                        url: '/rwa/admin/profile',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: currentUserId,
                            username: newUsername,
                            password: newPassword,
                            isAdmin: isAdmin
                        }),
                        success: function(data) {
                            alert("Profile updated successfully!");
                            location.reload();
                        },
                        error: function(xhr, status, error) {
                            console.error('Error updating profile:', status, error);
                            alert('Error updating profile');
                        }
                    });

                    modal.style.display = 'none';
                });


                roleSwitch.addEventListener('change', () => {
                    roleDisplay.textContent = roleSwitch.checked ? 'Admin' : 'User';
                });

                const firstUser = userList.querySelector('.profile-user');
                if (firstUser) {
                    updateProfileCard(firstUser);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching profile:', status, error);
                $('.profile-content').html('<h1>Error fetching profile</h1>');
            }
        });
    });

    $('#home, #play, #quizzes, #settings').click(function() {
        $('.content').empty();
    });
});
