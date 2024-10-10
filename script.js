let a = "";
let b = "";
let sign = "";
let finish = false;
const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "*", "/"];

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}
const ac = document.querySelector(".ac");

ac.addEventListener("click", clearAll);
const button = (event) => {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;

  const key = event.target.textContent;
  if (digit.includes(key)) {
    // Убираем ведущие нули
    if (b === "" && sign === "") {
      // Если a пустое или равно "0", заменяем его на новую цифру
      a = a === "" || a === "0" ? key : a + key;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      // Если b пустое или равно "0", заменяем его на новую цифру
      b = b === "" || b === "0" ? key : b + key;
      out.textContent = b;
    }
    console.log(a, sign, b);
    return;
  }

  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(a, sign, b);
    return;
  }

  // нажато =
  if (key === "=") {
    if (b === "") {
      b = a;
    }
    switch (sign) {
      case "+":
        a = +a + +b;
        break;

      case "-":
        a = a - b;
        break;

      case "*":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.log(a, sign, b);
  }
  // нажато +/-
  if (key === "+/-") {
    if (out.textContent === a) {
      a = a * -1;
      out.textContent = a;
      console.log(a, sign, b);
    } else {
      b = b * -1;
      out.textContent = b;
      console.log(a, sign, b);
    }
  }

  // нажатто %
  if (key === "%") {
    if (out.textContent === a) {
      a = a / 100;
      out.textContent = a;
      console.log(a, sign, b);
    } else {
      b = a * (b / 100);
      out.textContent = b;
      console.log(a, sign, b);
    }
  }
};
document.querySelector(".buttons").addEventListener("click", button);

