<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../css/home.css">
    <title>Quiz - Home</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<div class="content">
    <button id="createQuiz"><a href="/rwa/admin/quizzes/create"> CREATE </a></button>
</div>
<div class="nav-wrapper">
    <div class="navigation">
        <ul>
            <li class="list active">
                <a href="#" id="home">
                    <span class="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span class="text">Home</span>
                </a>
            </li>
            <li class="list">
                <a href="#" id="play">
                    <span class="icon">
                        <ion-icon name="game-controller-outline"></ion-icon>
                    </span>
                    <span class="text">Play</span>
                </a>
            </li>
            <li id="quizzes" class="list">
                <a href="#">
                    <span class="icon">
                        <ion-icon name="albums-outline"></ion-icon>
                    </span>
                    <span class="text">Quizzes</span>
                </a>
            </li>
            <li class="list" id="profile">
                <a href="#">
                    <span class="icon">
                        <ion-icon name="person-outline"></ion-icon>
                    </span>
                    <span class="text">Profile</span>
                </a>
            </li>
            <li class="list">
                <a href="#" id="settings">
                    <span class="icon">
                        <ion-icon name="settings-outline"></ion-icon>
                    </span>
                    <span class="text">Settings</span>
                </a>
            </li>
            <div class="indicator"></div>
        </ul>
    </div>
</div>

<script src="../js/navigation.js"></script>
<script src="../js/quizzesPanel.js"></script>
<script src="../js/profileInfo.js"></script>
<script src="../js/profileSettings.js"></script>
<script src="../js/validatePinInputHome.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

</body>
</html>
