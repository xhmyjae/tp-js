class questionnaire
{
    constructor(questions, correctAnswers, inputAnswers, score) {
        this.questions = questions;
        this.correctAnswers = correctAnswers;
        this.inputAnswers = inputAnswers;
        this.score = score;
    }

    /**
     * It loops through each question, finds all the inputs, pushes the correct inputs into an array, and then pushes that
     * array into an object
     */
    getCorrectAnswer()
    {
        this.questions.forEach( question => {
            let inputs = question.querySelectorAll('input');
            let arr = [];

            inputs.forEach( input => {
                if (input.value === 'correct') {
                    arr.push(input);
                }
            });

            this.correctAnswers[question.className] = arr;
        });
        console.log(Object.keys(this.correctAnswers).length);
        console.log(this.correctAnswers);
    }

    /**
     * It loops through each question, then loops through each input, then pushes the correct inputs into an array, then
     * pushes that array into an object
     */
    checkAnswer()
    {
        this.questions.forEach( question => {
            let inputs = question.querySelectorAll('input');
            let arr = [];

            inputs.forEach( input => {
                if (input.value === 'correct' && input.checked) {
                    arr.push(input);
                    console.log(input)
                }
            });

            this.inputAnswers[question.className] = arr;
        });
        console.log(Object.keys(this.inputAnswers).length);
        console.log(this.inputAnswers);
    }

    /**
     * If the length of the inputAnswers array is equal to the length of the correctAnswers array, then increment the score
     * by 1
     */
    calculateScore()
    {
        this.questions.forEach( question => {
            if (this.inputAnswers[question.className].length === this.correctAnswers[question.className].length) {
                this.score++;
            }
        });
    }
}

let quizz = document.getElementById('quizz');

/* Listening for the submit event on the form, then it is preventing the default action, then it is selecting
all the questions, then it is creating a new questionnaire object, then it is calling the getCorrectAnswer method, then
calling the checkAnswer method, then it is calling the calculateScore method, then it is selecting the score-board
class, then it is setting the display to flex, then it is selecting the score class, then it is setting the innerHTML to
the score. */
quizz.addEventListener('submit', e => {
    var q1 = document.forms['quizz']['answer1Q1'].value;

    e.preventDefault();
    let questions = document.querySelectorAll('.questions');

    let results = new questionnaire(questions, {}, {}, 0);
    results.getCorrectAnswer();
    results.checkAnswer();
    results.calculateScore();

    let scoreContent = document.querySelector('.score-board');
    scoreContent.style.display = 'flex';
    let score = document.querySelector('.score');
    score.innerHTML = results.score;
});
