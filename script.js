let btns = document.querySelectorAll("button");
let display = document.querySelector(".display");
let calc = localStorage.getItem("c") || "";

function showError() {
  display.textContent = "E";
  localStorage.setItem("c",`E`);
  calc = "";
}

function contentToCalculate(value) {
  if(value === "clear") {
    display.textContent = 0;
    localStorage.setItem("c","");
    calc = "";
  }else if(value === "="){
    if(localStorage.getItem("c") === "E") {
      return;
    }
    if(!calc){
      display.textContent = 0;
    }else{
      let firstLetter = calc[0];
      let lastLetter = calc[calc.length-1];
      let secLastLetter = calc[calc.length-2];

      if(lastLetter === "+" || lastLetter === "-" || lastLetter === "/" || lastLetter === "*" || lastLetter === "%" || lastLetter === ".") {
        showError();
      } else if(lastLetter === "0" && secLastLetter === "/") {
        showError();
      } else if(firstLetter === "*" || firstLetter === "/") {
        showError();
      } else { 
        let flag = true;
        for(let i=1;i<calc.length;i++) {
          if((calc[i] === '+' || calc[i] === '-' || calc[i] === '*' || calc[i] === '/' || calc[i] === '%' || calc[i] === '.') && (calc[i-1] === '+' || calc[i-1] === '-' || calc[i-1] === '*' || calc[i-1] === '/' || calc[i-1] === '%' || calc[i-1] === '.')) {
            flag = false;
          }
        }

        if(flag) {
          let result = eval(localStorage.getItem("c"));
        
          if(!Number.isInteger(result)) {
            let check = (Math.floor(result * 10000))%10;
            if(check !== 0) {
              result = (Math.floor(result * 1000))/1000;
            }
          }

          if(`${result}` === "Infinity" || `${result}` === "NaN" || `${result}` === "null") {
            showError();
            return;
          }
          
          display.textContent = result;
          if(result === 0) {
            localStorage.setItem("c",'');
            calc = "";
          }else{
            localStorage.setItem("c",`${result}`);
            calc = `${result}`;
          }
        }else {
          showError();
        }
      }
    }
  }else if(value === "x") {
    calc = localStorage.getItem("c");
    if(calc === "E") {
      calc = "";
    }
    calc += "*";
    display.textContent = calc;
    localStorage.setItem("c",`${calc}`);
  }else{
    if(value === '0' && (!localStorage.getItem("c") || localStorage.getItem("c") === 'E')) {
      if(calc === "" && display.textContent !== "0") {
        localStorage.setItem("c","E");
        return;
      }
      localStorage.setItem("c",``);
    }else{
      if(calc === 'E') {
        calc = "";
      }
      calc += value;
      display.textContent = calc;
      localStorage.setItem("c",`${calc}`);
    }
  }
}

btns.forEach( btn => {
  btn.addEventListener("click", () => {
    contentToCalculate(btn.textContent);
  })
})

window.addEventListener("load",() => {
  if(localStorage.getItem("c") && localStorage.getItem("c") !== "0")
    display.textContent = localStorage.getItem("c");
})


