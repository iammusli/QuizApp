<!DOCTYPE html>
<head>
    <title>Quiz - Create</title>
    <link rel="stylesheet" href="../../css/createQuiz.css">
</head>
<body>
<div id="wrapper">
    <div id="main-content">
        <div id="left-side-content">
            <div class="left-side-quiz-space" >
                <div class="headline">
                    <h1>Create a quiz</h1>
                </div>
                <div class="quiz-space">
                    <div class="quiz-details">
                        <label for="quiz-name">Quiz name</label>
                        <input type="text" id="quiz-name" class="quiz-input-field">
                        <label for="quiz-category">Quiz category</label>
                        <input type="text" id="quiz-category" class="quiz-input-field">
                    </div>
                    <div class="quiz-buttons">
                        <button id="create-question-btn" class="button">Create question</button>
                        <button id="create-quiz-btn" class="button">Create quiz</button>
                        <button id="cancel-btn" class="button">Cancel</button>
                    </div>
                </div>
            </div>
            <div class="right-side-quiz-space">
                <div class="question-container">

                </div>
            </div>
        </div>
        <div id="right-side-content">
            <div class="box">
                <div id="id" class="card">
                    <div class="front">
                        <div class="quiz-category">
                            <h3 id="quiz-card-category"></h3>
                        </div>
                        <div>
                            <img class="quiz-picture" src ="../../assets/background2.jpg" alt="bg">
                        </div>
                        <div class="quiz-details">
                            <h3 id="quiz-card-name"></h3>
                            <h5 id="question-number"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../../js/createQuiz.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>

