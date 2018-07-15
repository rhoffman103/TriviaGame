$(document).ready(function() {

    var player = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        answer: "",
        unanswered: 0,

        displayTally: function() {
            $(".questions-card").hide();
            $(".tally-card").show();
            $("#correct").text(this.correctAnswers);
            $("#incorrect").text(this.incorrectAnswers);
            $("#unanswered").text(this.unanswered);
        }
    };

    var questionCard = {
        currentImage:    "",
        currentQuestion: "",
        totalQuestions:  [],
        currentChoices:  [],

        answers: ["Mega Seeds", 'Squanchy and Birdperson', "Unity", "Wubba Lubba Dub Dub!", "Kalaxian Crystals"],

        questions: [{
            question:   "What did Rick ask Morty to smuggle through interdimensional customs?",
            answerList: ["Schmeckles", "Mega Seeds", "Concentrated Dark Matter", "Crystallized Anthenite"],
            image:      "./assets/images/mega-seeds.jpg",
        },{
            question:   "Who are Ricks two best friends?",
            answerList: ["Mr. Beauregard and Jerry", "Mr. Poopybutthole and Pencilvester", "Gearhead and Abradolf Lincler", "Squanchy and Birdperson"],
            image:      "./assets/images/squanchy-birdperson.png",
        },{
            question:   "Who is Ricks former lover?",
            answerList: ["Jessica", "Tammy", "Unity", "Donna Gueterman"],
            image:      "./assets/images/unity.png",
        },{
            question:   "What is Ricks most famous catch phrase?",
            answerList: ["Uh-oh, summersalt jump!", "Grassss, Tastes Bad", "Wubba Lubba Dub Dub!", "Shum Shum, Shlippity Dop!"],
            image:      "./assets/images/wubba-lubba.jpg"
        },{
            question:   "What did Abradolf Lincler sacrifrifice himself for to save Ricks party?",
            answerList: ["Kalaxian Crystals", "Flurbo", "Crystallized Anthenite", "Ionic Defibulizer"],
            image:      "./assets/images/rick-high.jpg"
        }],

        setTotalQuestionsArray: function() {
            for (i = 0; i < this.questions.length; i++) {
                this.totalQuestions.push(i);
            }
        },

        // non-repeating, randomly ordered questions
        getQuestion: function() {
            var num = Math.ceil(Math.random() * (this.totalQuestions.length) - 1);
            this.currentQuestion = this.questions[this.totalQuestions[num]].question;
            this.currentChoices = this.questions[this.totalQuestions[num]].answerList;
            this.currentImage = this.questions[this.totalQuestions[num]].image;
            this.totalQuestions.splice(num, 1);
        },

        setImage: function() {
            $(".img-question").attr({src: this.currentImage});
        },

        getQuestionCard: function() {
            if (this.totalQuestions.length == 0) {
                player.displayTally();
                timer.stop();
            } else {
                this.getQuestion();
                displayQuestionAndAnswers();
            }
            timer.reset();
            timer.start();
        },

        randomlyOrderAnswerList: function() {
            var j = 0;
            var order = [0, 1, 2, 3];
    
            for (var i = 0; i < 4; i++) {
                j = Math.ceil(Math.random() * (3 - i));
            }
        },

    };

    var timer = {
        time: 10000,
        intervalId: 0,
        timeLeft: 0,
        timerRunning: false,

        reset: function() {
            timer.time = 10000;
            $("#timer").text("00:10");
        },

        start: function() {
            if (!timer.timerRunning) {
                timer.intervalId = setInterval(timer.countDown, 1000);
                timerRunning = true;
            }
        },

        stop: function() {
            timer.timeLeft = (timer.time) / 1000;
            clearInterval(timer.intervalId);
            timerRunning = false;
            console.log(timer.timeLeft);
        },

        countDown: function() {
            timer.time -= 1000;
            var convertToSeconds = timer.timeConvert(timer.time);
            $("#timer").text(convertToSeconds);
            if (timer.time == 0) {
                timer.stop();
                player.unanswered++;
                questionCard.getQuestionCard();
            }
        },

        timeConvert: function(t) {
            var seconds = Math.floor(t / 1000);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return "00:" + seconds;
        }
    }

    const resetGame = function() {
        player.correctAnswers =   0;
        player.incorrectAnswers = 0;
        player.unanswered =       0;
        questionCard.setTotalQuestionsArray();
        questionCard.getQuestionCard();
        $(".tally-card").hide();
        $(".questions-card").show();
    };

    const displayQuestionAndAnswers = function() {
        questionCard.setImage();
        $("#question").text(questionCard.currentQuestion);
        $("#choiceA").text(questionCard.currentChoices[0]);
        $("#choiceB").text(questionCard.currentChoices[1]);
        $("#choiceC").text(questionCard.currentChoices[2]);
        $("#choiceD").text(questionCard.currentChoices[3]);
    };

    // Start Trivia Game
    resetGame();

    // Events
    $(".choices").on("click", function() {
        if (questionCard.answers.includes($(this).html())) {
            player.correctAnswers++;
        } else {
            player.incorrectAnswers++;
        }
        timer.stop();
        questionCard.getQuestionCard();
    });

    $(".try-again").on("click", function() {
        resetGame();
    })

})