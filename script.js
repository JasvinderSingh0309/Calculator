let btns = document.querySelectorAll("button");
let display = document.querySelector(".display");

let calc = "";

function contentToCalculate(value) {
  if(value === "Clear") {
    display.textContent = 0;
    calc = "";
  }else if(value === "="){
    if(!calc) {
      display.textContent = 0;
    }else {
      let lastLetter = calc[calc.length-1];
      let secLastLetter = calc[calc.length-2];

      if(lastLetter === "+" || lastLetter === "-" || lastLetter === "/" || lastLetter === "*" || lastLetter === "%") {
        display.textContent = "E";
        calc = "";
      }else if(lastLetter === "0" && secLastLetter === "/") {
        display.textContent = "E";
        calc = "";
      }else { 
        let flag = true;
        for(let i=1;i<calc.length;i++) {
          if((calc[i] === '+' || calc[i] === '-' || calc[i] === '*' || calc[i] === '/' || calc[i] === '%') && (calc[i-1] === '+' || calc[i-1] === '-' || calc[i-1] === '*' || calc[i-1] === '/' || calc[i-1] === '%')) {
            flag = false;
          }
        }
        if(flag) {
          let result = eval(calc);
          if(!Number.isInteger(result)) {
            let check = (Math.floor(result * 10000))%10;
            if(check !== 0) {
              result = (Math.floor(result * 1000))/1000;
            }
          }
          display.textContent = result;
          calc = "";
        }else {
          display.textContent = 'E';
          calc = "";
        }
      }
    }
  }else if(value === "x") {
    calc += "*";
    display.textContent = calc;
  }else{
    calc += value;
    display.textContent = calc;
  }
}

btns.forEach( btn => {
  btn.addEventListener("click", () => {
    contentToCalculate(btn.textContent);
  })
})