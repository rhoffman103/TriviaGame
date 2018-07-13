$(document).ready(function() {

    var player = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        answer: "",
        unanswered: 0,

        displayTally: function() {
            $(".card").hide();
        }
    }

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
            question:   "What did Abradolf Lincler sacrifrifice himself for in order for rick to save the party?",
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
            $(".card-img-top").attr({src: this.currentImage});
        },

        getQuestionCard: function() {
            if (this.totalQuestions.length == 0) {
                player.displayTally();
            } else {
                this.getQuestion();
                displayQuestionAndAnswers();
            }
        },

        randomlyOrderAnswerList: function() {
            var j = 0;
            var order = [0, 1, 2, 3];
    
            for (var i = 0; i < 4; i++) {
                j = Math.ceil(Math.random() * (3 - i));
            }
        },

    }

    const displayQuestionAndAnswers = function() {
        questionCard.setImage();
        $("#question").text(questionCard.currentQuestion);
        $("#choiceA").text(questionCard.currentChoices[0]);
        $("#choiceB").text(questionCard.currentChoices[1]);
        $("#choiceC").text(questionCard.currentChoices[2]);
        $("#choiceD").text(questionCard.currentChoices[3]);
    }

    // Start Trivia Game
    questionCard.setTotalQuestionsArray();
    questionCard.getQuestionCard();

    // Events
    $(".list-group-item").on("click", function() {
        if (questionCard.answers.includes($(this).html())) {
            player.correctAnswers++;
        } else {
            player.incorrectAnswers++;
        }
        questionCard.getQuestionCard();
    })

})