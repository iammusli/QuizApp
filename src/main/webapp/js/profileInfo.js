$(document).ready(function() {
    $('#profile').click(function() {
        $.ajax({
            url: '/rwa/admin/profile',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('.content').html(`
                    <div class="profile-card">
                        <div class="profile-header">
                            <h1>Profile Info</h1>
                            <p>Username: ${data.username}</p>
                        </div>
                        <!-- Dummy values -->
                        <div class="profile-stats">
                            <div class="stat">
                                <p>#99</p>
                                <p>World rank</p>
                            </div>
                            <div class="stat">
                                <p>250</p>
                                <p>Games played</p>
                            </div>
                            <div class="stat">
                                <p>1,084</p>
                                <p>Points total</p>
                            </div>
                            <div class="stat">
                                <p>82%</p>
                                <p>Completion rate</p>
                            </div>
                            <div class="stat">
                                <p>62%</p>
                                <p>Correct answers</p>
                            </div>
                            <div class="stat">
                                <p>38%</p>
                                <p>Incorrect answers</p>
                            </div>
                        </div>
                    </div>
                `);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching profile:', status, error);
                $('.content').html('<h1>Error fetching profile</h1>');
            }
        });
    });

    $('#home, #play, #quizzes, #settings').click(function() {
        $('.content').empty();
    });
});
