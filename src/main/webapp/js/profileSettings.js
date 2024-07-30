$(document).ready(function() {
    $('#settings').click(function() {
        $.ajax({
            url: '/rwa/admin/settings',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('.content').html(`
                    <div class="profile-card">
                        <div class="profile-header">
                            <h1>Settings</h1>
                        </div>
                        <div class="profile-stats">
                            <div class="stat-set">
                                <table class="settings-table">
                                    <tr>
                                        <td>Change Username</td>
                                        <td><input type="text" id="newUsername" value="${data.username}" class="input-box" /></td>
                                    </tr>
                                    <tr>
                                        <td>Change Password</td>
                                        <td><input type="password" id="newPassword" class="input-box" /></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="text-right"><button id="saveChanges" class="save-changes-btn">Save Changes</button></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `);

                $('#saveChanges').click(function() {
                    $.ajax({
                        url: '/rwa/admin/settings',
                        type: 'POST',
                        data: {
                            username: $('#newUsername').val(),
                            password: $('#newPassword').val()
                        },
                        success: function(data) {
                            alert("Settings updated successfully!");
                        },
                        error: function(xhr, status, error) {
                            console.error('Error updating settings:', status, error);
                            $('.content').html('<h1>Error updating settings</h1>');
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching settings:', status, error);
                $('.content').html('<h1>Error fetching settings</h1>');
            }
        });
    });
});
