$(document).ready(function() {

    var player = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        answer: "",
        unanswered: 0,

        displayTally: function() {
            $(".img-question").hide();
            $(".tally-gif").show();
            $("li").removeClass("choices").empty();
            $("li").eq(0).text(`Answered Cor-Rickly: ${this.correctAnswers}`);
            $("li").eq(1).text(`Morty-fied: ${this.incorrectAnswers}`);
            $("li").eq(2).text(`Unanswered: ${this.unanswered}`);
            $("li").eq(3).addClass("try-again").text("Try Again???");
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
            choiceList: ["Schmeckles", "Mega Seeds", "Concentrated Dark Matter", "Crystallized Anthenite"],
            image:      "./assets/images/mega-seeds.jpg",
        },{
            question:   "Who are Ricks two best friends?",
            choiceList: ["Mr. Beauregard and Jerry", "Mr. Poopybutthole and Pencilvester", "Gearhead and Abradolf Lincler", "Squanchy and Birdperson"],
            image:      "./assets/images/squanchy-birdperson.png",
        },{
            question:   "Who is Ricks former lover?",
            choiceList: ["Jessica", "Tammy", "Unity", "Donna Gueterman"],
            image:      "./assets/images/unity.png",
        },{
            question:   "What is Ricks most famous catch phrase?",
            choiceList: ["Uh-oh, summersalt jump!", "Grassss, Tastes Bad", "Wubba Lubba Dub Dub!", "Shum Shum, Shlippity Dop!"],
            image:      "./assets/images/wubba-lubba.jpg"
        },{
            question:   "What did Abradolf Lincler sacrifrifice himself for to save Ricks party?",
            choiceList: ["Kalaxian Crystals", "Flurbo", "Crystallized Anthenite", "Ionic Defibulizer"],
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
            this.currentChoices = this.questions[this.totalQuestions[num]].choiceList;
            this.currentImage = this.questions[this.totalQuestions[num]].image;
            this.totalQuestions.splice(num, 1);
        },

        setImage: function() {
            $(".img-question").attr({src: this.currentImage});
        },

        getQuestionCard: function() {
            if (this.totalQuestions.length == 0) {
                timer.stop();
                player.displayTally();
            } else {
                this.getQuestion();
                this.shuffleChoiceList();
                displayQuestionAndAnswers();
                timer.reset();
                timer.start();
            }
        },

        shuffleChoiceList: function() {
            var currentPass = this.currentChoices.length
            var index, temp;

            while (currentPass > 0) {
                index = Math.floor(Math.random() * currentPass);
                currentPass--;
                temp = this.currentChoices[currentPass];
                this.currentChoices[currentPass] = this.currentChoices[index];
                this.currentChoices[index] = temp;
            }
        },

        setQuestionCard: function() {
            $(".tally-gif").hide();
            $("li").empty().addClass("choices");
        }

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
                timer.timerRunning = true;
            }
        },

        stop: function() {
            this.timeLeft = (this.time) / 1000;
            clearInterval(this.intervalId);
            this.timerRunning = false;
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
        questionCard.setQuestionCard();
        questionCard.setTotalQuestionsArray();
        questionCard.getQuestionCard();
        $(".questions-card").show();
    };

    const displayQuestionAndAnswers = function() {
        questionCard.setImage();
        $(".question").text(questionCard.currentQuestion);
        $("li").eq(0).text(questionCard.currentChoices[0]);
        $("li").eq(1).text(questionCard.currentChoices[1]);
        $("li").eq(2).text(questionCard.currentChoices[2]);
        $("li").eq(3).text(questionCard.currentChoices[3]);
    };

    // Events
    $(document).on("click", ".choices", function() {
        if (questionCard.answers.includes($(this).html())) {
            player.correctAnswers++;
        } else {
            player.incorrectAnswers++;
        }
        timer.stop();
        questionCard.getQuestionCard();
    });

    $(document).on("click", ".try-again", function() {
        resetGame();
    })

    $("button").on("click", function() {
        $("button").hide();
        resetGame();
    })

})