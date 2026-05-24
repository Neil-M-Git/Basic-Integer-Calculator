let Running_Tot = 0; //calculator memory. eg: 5 + then => val stored = "5", then if 5 + 3 then => val = "8"
let buffer = "0"; //str val of what the user is currently typing
let prev_operator = null; //stores last math op pressed
let resetScreen = false; //used to clear screen ONLY when next number is typed
const screen = document.querySelector('.screen'); //displays answers of calculations on the "screen"


function btn_click(val){ //checks what btn is clicked
    if(isNaN(val)){ //checks if a val is a no. OR NOT
        handleSymbol(val); //runs code for ops including <- and C
    }

    else{
        handleNum(val); //if val = no.
    }
    screen.innerText = buffer; //updating calculator answer screen
}

function handleSymbol(sym){
    switch(sym){
        case 'C': //clear btn
            buffer = '0';
            Running_Tot = 0;
            prev_operator = null;
            resetScreen = false;
            break;

        case '=': // = btn
            if(prev_operator === null){
                return; //prevents invalid calculations
            }

            flushOp(parseInt(buffer)); //actual calculation performed
            prev_operator = null; //clear prev operator
            buffer = Running_Tot.toString(); //result into buffer
            Running_Tot = 0; //running total, keeps on updating
            break;

        case '←':
            if(buffer.length === 1){ //if only 1 number or char
                buffer = '0'; //clear it
            }

            else{
                buffer = buffer.substring(0, buffer.length - 1); //erase the prev char (num/sym)
            }
            break;

        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(sym);
            break;
    }
}

function handleMath(sym){
    if(buffer === '0'){
        return; //exit fn immediately
    }

    const intBuffer = parseInt(buffer); //str to num

    if(Running_Tot === 0){
        Running_Tot = intBuffer; //if NO stored val yet, store current no. as starting tot
    }

    else{
        flushOp(intBuffer); //otherwise do the op
    }

    prev_operator = sym; //storing just pressed operator
    resetScreen = true; //screen clears only when next num is typed
}

function flushOp(intBuffer){
    if(prev_operator === '+'){
        Running_Tot += intBuffer;
    }

    else if(prev_operator === '-'){
        Running_Tot -= intBuffer;
    }

    else if(prev_operator === '×'){
        Running_Tot *= intBuffer;
    }

    else if(prev_operator === '÷'){
        Running_Tot /= intBuffer;
    }
}

function handleNum(num_str){
    if(resetScreen){
        buffer = num_str;
        resetScreen = false;
        return;
    }

    if(buffer === "0"){
        buffer = num_str;
    }

    else{
        buffer += num_str;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        btn_click(event.target.innerText);
    });
}

init();