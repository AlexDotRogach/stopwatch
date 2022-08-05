import { Observable } from "rxjs";

const controler = document.querySelector("#controler");
const wait = document.querySelector("#wait");
const reset = document.querySelector("#reset");
const minutes = document.querySelector("#minute");
const seconds = document.querySelector("#seconds");
let minutesTime = 0;
let secondsTime = 0;
let counterClick = 0; // for wait

let isWorking = true; // status
let timerId; // interval

const observable = new Observable((subscriber) => {
  subscriber.next(0);
  controler.addEventListener("click", () => {
    if (isWorking) {
      timerId = setInterval(() => {
        isWorking = false;
        subscriber.next(++secondsTime);
      }, 100);
    } else {
      isWorking = true;
      seconds.textContent = secondsTime;
      clearInterval(timerId);
    }
  });

  wait.addEventListener("click", () => {
    ++counterClick;

    setTimeout(() => {
      counterClick = 0;
    }, 500);

    if (counterClick === 2) {
      clearInterval(timerId);
      isWorking = true;
    }
  });

  reset.addEventListener("click", () => {
    minutes.textContent = seconds.textContent = "00";
    minutesTime = secondsTime = 0;
    isWorking = true;
    clearInterval(timerId);
  });
});

observable.subscribe({
  next(x) {
    if (x % 60 === 0 && x != 0) {
      if (minutesTime < 10) addZero(minutes, (minutesTime += 1));
      if (minutesTime > 10) minutes.textContent = minutesTime + 1;
    }
    if (x === 60) x = 0;
    if (x < 10) addZero(seconds, (secondsTime = x));
    if (x >= 10) seconds.textContent = secondsTime = x;
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  },
});

function addZero(elem, value) {
  elem.textContent = `0${value}`;
}
