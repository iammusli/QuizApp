<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../css/home.css">
    <title>Quiz - Home</title>
</head>
<body>
<div class="content">

    <div class="box">
        <div class="card">
            <div class="front">
                <div class="quiz-category">
                    <h3 id="quiz-category">Quiz category</h3>
                </div>
                <div>
                    <img id="quiz-picture" src="../assets/background1.jpg" alt="background">
                </div>
                <div class="quiz-details">
                    <h3 id="quiz-name">Quiz name</h3>
                    <h5 id="question-number">10 questions</h5>
                </div>
            </div>
            <div class="back">
                <button class="card-button">Play</button>
                <button class="card-button">Edit</button>
                <button class="card-button">Delete</button>
            </div>
        </div>
    </div>

</div>
<div class="nav-wrapper">
    <div class="navigation">
        <ul>
            <li class="list active">
                <a>
                            <span class="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                    <span class="text">Home</span>
                </a>
            </li>
            <li class="list">
                <a>
                            <span class="icon">
                                <ion-icon name="game-controller-outline"></ion-icon>
                            </span>
                    <span class="text">Play</span>
                </a>
            </li>
            <li class="list">
                <a>
                            <span class="icon">
                                <ion-icon name="albums-outline"></ion-icon>
                            </span>
                    <span class="text">Quizzes</span>
                </a>
            </li>
            <li class="list">
                <a>
                            <span class="icon">
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                    <span class="text">Profile</span>
                </a>
            </li>
            <li class="list">
                <a>
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

<script src="../js/home.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
