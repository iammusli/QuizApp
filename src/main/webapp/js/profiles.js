$(document).ready(function() {
    $('#profile').click(function() {
        $.ajax({
            url: '/rwa/admin/profile',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const username = data.username;

                $('.content').html(`
                    <div class="profile-body">
                        <div class="profile-user-list" id="profile-user-list">
                            <div class="profile-user profile-my-profile" data-username="${username}" data-rank="#99" data-games="250" data-points="1,084" data-completion="82%" data-correct="62%" data-incorrect="38%">My profile</div>
                            <div class="profile-user" data-username="user1" data-rank="#101" data-games="100" data-points="500" data-completion="75%" data-correct="70%" data-incorrect="30%">User 1</div>
                            <div class="profile-user" data-username="user2" data-rank="#150" data-games="200" data-points="800" data-completion="80%" data-correct="60%" data-incorrect="40%">User 2</div>
                            <div class="profile-user" data-username="user3" data-rank="#200" data-games="300" data-points="1,200" data-completion="85%" data-correct="65%" data-incorrect="35%">User 3</div>
                        </div>
                        <div class="profile-card" id="profile-card">
                            <div class="profile-header" id="profile-header">
                                <h1>Profile Info <span id="edit-icon" class="profile-edit-icon"><i class="fas fa-pencil-alt"></i></span></h1>
                                <p id="profile-username">Username: ${username}</p>
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
                            <input type="text" id="new-username" class="profile-new-username" placeholder="Enter new username" value="${username}">
                            
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

                function updateProfileCard(user) {
                    const username = user.getAttribute('data-username');
                    const rank = '#99';
                    const games = '250';
                    const points = '1,084';
                    const completion = '82%';
                    const correct = '62%';
                    const incorrect = '38%';

                    profileHeader.querySelector('h1').innerHTML = `Profile Info <span id="edit-icon" class="profile-edit-icon"><i class="fas fa-pencil-alt"></i></span>`;
                    profileHeader.querySelector('#profile-username').textContent = `Username: ${username}`;
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
                        newPasswordInput.value = '';
                        roleSwitch.checked = roleDisplay.textContent === 'Admin'; // Set default role based on current role
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
                    const role = roleSwitch.checked ? 'Admin' : 'Editor';

                    console.log(`New Username: ${newUsername}`);
                    console.log(`New Password: ${newPassword}`);
                    console.log(`Selected Role: ${role}`);

                    roleDisplay.textContent = role;

                    modal.style.display = 'none';
                });

                roleSwitch.addEventListener('change', () => {
                    roleDisplay.textContent = roleSwitch.checked ? 'Admin' : 'Editor';
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
        $('.profile-content').empty();
    });
});
