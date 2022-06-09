let questions = document.querySelectorAll('.questions');
let questionsArray = Array.from(questions);
let next = document.querySelector('.next-button');
let previous = document.querySelector('.previous-button');

questions[0].classList.toggle('hide');
previous.style.visibility = 'hidden';

/* Event listener for the next button. It is making the previous button visible, selecting the current
question, and then finding the index of the current question. If the current question index is equal to the length of
the questions array minus 2, then the next button is hidden. Then the current question is toggled to hide, and the next
question is toggled to show. */
next.addEventListener('click', e => {
    previous.style.visibility = 'visible';

    let currentQuestion = document.querySelector('.questions:not(.hide)');

    let currentQuestionIndex = questionsArray.indexOf(currentQuestion);
    if (currentQuestionIndex === questionsArray.length - 2) {
        next.style.visibility = 'hidden';
    }
    questions[currentQuestionIndex].classList.toggle('hide');
    questions[currentQuestionIndex + 1].classList.toggle('hide');
});

/* Event listener for the previous button. It is making the next button visible, selecting the current
question, and then finding the index of the current question. If the current question index is equal to 1, then the
previous button is hidden. Then the current question is toggled to hide, and the previous
question is toggled to show. */
previous.addEventListener('click', e => {
    next.style.visibility = 'visible';

    let currentQuestion = document.querySelector('.questions:not(.hide)');

    let currentQuestionIndex = questionsArray.indexOf(currentQuestion);
    if (currentQuestionIndex === 1) {
        previous.style.visibility = 'hidden';
    }
    questions[currentQuestionIndex].classList.toggle('hide');
    questions[currentQuestionIndex - 1].classList.toggle('hide');
});