//Elementos del DOM
let num = document.getElementsByClassName("num");
let signoHtml = document.getElementsByClassName("signo");
let pantallaHtml = document.getElementsByClassName("number-pantalla");
let signoPantalla = document.getElementsByClassName("signoPantalla");
let equal = document.getElementsByClassName("number-equal");
let point = document.getElementsByClassName("number-point");
let reset = document.getElementsByClassName("number-reset");
let deleteNumber = document.getElementsByClassName("number-Del");

//variables
let operation = null; //registra el numero que se marca en la calculadora
let signo; // se convierte en la operar a realizar
let numbersToOperate = []; //array que almacena los dos valores a operar.

/*evento para cada numero, se concatenarán hasta que le indiquemos el tipo de operación que queramos hacer.
muestra por pantalla su valor.
se asigna a operation el numero que iremos selecionando en la calculadora */
for (let i = 0; i < num.length; i++) {
  let numbers = num[i];
  let numbe = numbers.innerText;
  numbers.addEventListener("click", function () {
    operation = operation == null ? numbe : operation.concat(numbe);
    pantallaHtml[0].innerHTML = `<p class="pantalla">${operation}</p>`;
  });
}

/*evento para asignar el tipo de operacion a realizar , signo será la funcion elegida
se agrega a un array el valor del primer numero a operar y se reasigna en null la variable para albergar el segundo numero para operar.*/
for (let i = 0; i < signoHtml.length; i++) {
  let signo2 = signoHtml[i];
  let signoPantalla = document.getElementsByClassName("signoPantalla");
  signo2.addEventListener("click", function () {
    if (operation !== null) {
      numbersToOperate.push(operation);
      operation = null;
    }
    if (numbersToOperate.length == 1) {
      if (signo2.innerText == "+") {
        signo = function sum(a, b) {
          return a + b;
        };
      }
      if (signo2.innerText == "-") {
        signo = function rest(a, b) {
          return a - b;
        };
      }
      if (signo2.innerText == "/") {
        signo = function division(a, b) {
          return a / b;
        };
      }
      if (signo2.innerText == "*") {
        signo = function multiply(a, b) {
          return a * b;
        };
      }
      signoPantalla[0].innerHTML = `<p>${signo2.innerText}</p>`;
    } else if (numbersToOperate.length > 1) {
      let result = signo(+numbersToOperate[0], +numbersToOperate[1]);
      pantallaHtml[0].innerHTML = `<p class="pantalla">${result}</p>`;
      operation = result.toString();
      numbersToOperate = [];
      signoPantalla[0].innerText = " ";
      console.log(result);
    }
  });
}

//evento para el boton de = en la calculadora,
equal[0].addEventListener("click", function () {
  if (operation !== null) {
    numbersToOperate.push(operation);
    if (numbersToOperate.length > 1) {
      let result = signo(+numbersToOperate[0], +numbersToOperate[1]);
      if (isNaN(result)) {
        result = 0;
      }
      if (esNumeroDecimal(result) == true) {
        pantallaHtml[0].innerHTML = `<p class="pantalla">${result.toFixed(
          2
        )}</p>`;
        operation = result.toFixed(2);
      } else {
        pantallaHtml[0].innerHTML = `<p class="pantalla">${result}</p>`;
        operation = result.toString();
      }
      numbersToOperate = [];
      signoPantalla[0].innerText = " ";
    } else {
      pantallaHtml[0].innerHTML = `<p class="pantalla">0</p>`;
      operation = null;
      numbersToOperate = [];
    }
  }
});

//evento para asignarle un punto a los numeros, para manejar decimales
point[0].addEventListener("click", function () {
  let punto = ".";
  if (operation !== false) {
    operation = operation.concat(punto);
    pantallaHtml[0].innerHTML = `<p class="pantalla">${operation}</p>`;
  }
});

//funcion para saber si un numero es decimal
function esNumeroDecimal(valor) {
  return !isNaN(valor) && valor % 1 !== 0;
}

//evento que resetea la calculadora poniendola en 0
reset[0].addEventListener("click", function () {
  operation = null;
  numbersToOperate = [];
  pantallaHtml[0].innerHTML = `<p class="pantalla">0</p>`;
});

//evento para poder eliminar un numero en caso de querer rectificar.
deleteNumber[0].addEventListener("click", function () {
  if (operation != null) {
    operation = operation.toString();
    operation = operation.substring(0, operation.length - 1);

    pantallaHtml[0].innerHTML = `<p class="pantalla">${operation}</p>`;
  }
});
