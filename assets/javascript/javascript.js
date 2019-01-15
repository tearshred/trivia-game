var trivia = $('#trivia');

//CLICK EVENTS

$(document).on('click', '#start', function (e) {
    start();
});

$(document).on('click', '#submit', function (e) {
    submit();
});

//Questions

var questions = [{
    question: "1 . Which year did Metallica publish 'The Black Album'?",
    answers: ["1984", "1991", "1997", "2013"],
    correctAnswer: "1991"
}, {
    question: "2 . 'Slippery when wet' is a rock album from which band?",
    answers: ["Bon Jovi", "Pearl Jam", "Journey", "Def Leppard"],
    correctAnswer: "Bon Jovi"
}, {
    question: "3 . Who sings 'Panama'?",
    answers: ["Patsy Cline", "Van Halen", "Dolly Parton", "Steve Miller"],
    correctAnswer: "Van Halen"
}, {
    question: "4 . Which year did Def Leppard publish 'Love Bites'?",
    answers: ["1987", "1982", "1993", "2015"],
    correctAnswer: "1987"
}, {
    question: "5 . Who sings 'Whole Lotta Love'?",
    answers: ["Led Zeppelin", "Deep Purple", "Alice in Chains", "Ugly Kid Joe"],
    correctAnswer: "Led Zeppelin"
}];

var correct = 0;
var incorrect = 0;
var counter = 61;

function countdown() {
    counter--;
    $('#counter-number').html(counter);

    var downloadTimer = setInterval(function(){
        counter--;
        document.getElementById("counter-number").textContent = counter;
        if(counter === 0) {
            clearInterval(downloadTimer);
            console.log(counter);
            console.log('TIME UP');
            timeup();
        }
        },1000);
}

function start() {
    timer = setInterval(countdown(), 1000);

    $('#wrapper').prepend('<h2>Time Remaining: <span id="counter-number">60</span> Seconds</h2>');
    $('#start').remove();


    for (var i = 0; i < questions.length; i++) {
        trivia.append('<h2>' + questions[i].question + '</h2>');
        for (var j = 0; j < questions[i].answers.length; j++) {
            trivia.append('<input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
        }
    }

    trivia.append('<button id="submit">Submit</button>');
}

function submit() {
    for (var i = 0; i < 10; i++) {
        $.each($("input[name='question-" + i + "']:checked"), function () {
            if ($(this).val() == questions[i].correctAnswer) {
                correct++;
            } else {
                incorrect++;
            }
        });
    }

    this.result();
}

function result() {

    clearInterval(timer);

    $('#wrapper h2').remove();
    trivia.html('<h2>Congrats!</h2>');
    trivia.append('<h3> Correct Answers: ' + this.correct + '</h3>');
    trivia.append('<h3> Incorrect Answers: ' + this.incorrect + '</h3>');
    trivia.append('<h3> Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');
}

function timeup() {

    clearInterval(timer);

    $('#wrapper h2').remove();
    trivia.html('<h2>Time Is Up!</h2>');
    trivia.append('<h3> Correct Answers: ' + this.correct + '</h3>');
    trivia.append('<h3> Incorrect Answers: ' + this.incorrect + '</h3>');
    trivia.append('<h3> Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');
}