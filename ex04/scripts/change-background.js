/**
 * Changes the background of the page depending on the time of day
 */
function changeBackground()
{
    let currentDate = new Date();
    let currentTime = currentDate.getHours();
    let body = document.querySelector("body");
    let date = document.querySelector(".date");

    if (currentTime >=4 && currentTime <= 9) {
        body.classList.remove("back22-3");
        body.classList.add("back10-15");
    } else if (currentTime >= 10 && currentTime <= 15) {
        body.classList.remove("back4-9");
        body.classList.add("back10-15");
    } else if (currentTime >= 16 && currentTime <= 21) {
        body.classList.remove("back10-15");
        body.classList.add("back16-21");
    } else {
        body.classList.remove("back16-21");
        body.classList.add("back22-3");
    }

    date.innerHTML = currentDate.toDateString();
}

window.addEventListener('load', () => {
    changeBackground();
});