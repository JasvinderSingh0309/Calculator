let btns = document.querySelectorAll("button");
let display = document.querySelector(".display");
let calc = localStorage.getItem("c") || "";
let decimalPoint = document.querySelector(".btns>.btn-row:nth-child(4)>button:nth-child(1)");

function showError() {
  display.textContent = "E";
  localStorage.setItem("c",`E`);
  calc = "";
}

function contentToCalculate(value) {
  if(value === "delete") {
    let arr = calc.split('');
    arr.pop();
    calc = arr.join('');
    display.textContent = calc;
    localStorage.setItem('c',calc);
    if(!calc) display.textContent = 0;
  }else if(value === "clear") {
    display.textContent = 0;
    localStorage.setItem("c","");
    calc = "";
    decimalPoint.disabled = false;
  }else if(value === "="){
    if(localStorage.getItem("c") === "E") {
      return;
    }
    if(!calc){
      display.textContent = 0;
    }else{
      let firstLetter = calc[0];
      let lastLetter = calc[calc.length-1];

      if(lastLetter === "+" || lastLetter === "-" || lastLetter === "/" || lastLetter === "*" || lastLetter === ".") {
        showError();
      } else if(firstLetter === "*" || firstLetter === "/") {
        showError();
      } else { 
        let flag = true;
        for(let i=1;i<calc.length;i++) {
          if((calc[i] === '+' || calc[i] === '-' || calc[i] === '*' || calc[i] === '/' || calc[i] === '.') && (calc[i-1] === '+' || calc[i-1] === '-' || calc[i-1] === '*' || calc[i-1] === '/' || calc[i-1] === '.')) {
            flag = false;
          }
        }

        if(flag) {
          let result = eval(localStorage.getItem("c"));
        
          if(!Number.isInteger(result)) {
            result = result.toFixed(3);
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
            decimalPoint.disabled = true;
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
    decimalPoint.disabled = false;
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
      if(value === "+" || value === "-" || value === "/") 
        decimalPoint.disabled = false;
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


