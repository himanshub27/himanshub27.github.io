let runningTotal = 0;
let buffer  = "0";
/*buffer means the stuff present on the screen 
 like whatever we type on the keypad it store in buffer
 and will display on the screen
*/
let previousOperator = null;

const screen = document.querySelector('.screen');


function buttonClick(value){
	debugger;
     if( isNaN(value)){
     	//this is not a number
     	handleSymbol(value);
     } else{
     	//this is a number
     	handleNumber(value);
     } 
      screen.innerText = buffer; 
}

function handleSymbol(symbol){
switch (symbol) {
	case 'C':
	    buffer = '0';
	    runningTotal = 0;
		break;
	case '=':
	  if (previousOperator === null){
        // need 2 numbers to do math
        return;
	  }	
	  flushOperation(parseInt(buffer));
	  previousOperator = null;
	  buffer  = runningTotal;
	  runningTotal = 0;
	  break;
	case '←':
	  if (buffer.length === 1){
	  	buffer = '0';
	  } else {
	  	buffer = buffer.substring(0, buffer.length - 1);
	  } 
	  break;
	case '+':
	case '-':
	case '×':
	case '÷':
	handleMath(symbol);
	break;	
	}
}

function handleMath(symbol){
	if(buffer === '0'){
		//do nothing
		return;
	}

	const intBuffer = parseInt(buffer);

	if (runningTotal === 0){
      runningTotal = intBuffer;
	}else{
		//the actual maths will be done by flushOperation
		flushOperation(intBuffer);
	}

	previousOperator = symbol;

	buffer = "0";
}


function flushOperation(intBuffer){
	if (previousOperator === '+'){
		runningTotal += intBuffer;
	}
	else if (previousOperator === '-'){
		runningTotal -= intBuffer;
	}
	else if (previousOperator === '×'){
		runningTotal *= intBuffer;
	}
	else {
		runningTotal /= intBuffer;
	}
}


function handleNumber(numberString){
	if(buffer === "0"){
		buffer = numberString;
	}else{
		buffer = buffer + numberString;
	}
	
}

function init(){
   document.querySelector('.calc-buttons')
   //this selects the query(the buttons)
   .addEventListener('click', function(event){
   	//click here is an event which will target and execute the buttonclick function
   	buttonClick(event.target.innerText);
   })
}

init();