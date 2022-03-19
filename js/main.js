(function () {

    // Selecting the required elements
    const previousOperandElement = document.querySelector('.prev_operand');
    const currentOperandElement = document.querySelector('.current_operand');

    const allClearBtn = document.getElementById('all_clear');
    const deleteBtn = document.getElementById('delete');
    const equalBtn = document.getElementById('equal');

    const operatorButtons = document.querySelectorAll('.operator');
    const numberButtons = document.querySelectorAll('.number')


    let prevOperand = '';
    let currentOperand = '';
    let addingOperator = '';


    // Show in UI
    function displayUpdate() {
        currentOperandElement.innerHTML = outputFormat(currentOperand);
        previousOperandElement.innerHTML = `${outputFormat(prevOperand)} ${addingOperator}`;
    }


    // 
    function outputFormat(numb) {
        let output = Number(numb).toLocaleString('en');
        if (output !== '0') {
            return output;
        }
        else {
            return '';
        }
    }


    // 
    function appendNumber(number) {
        currentOperand += number;
    }

    // 
    function selectOperator(operator) {

        if (prevOperand) {
            prevOperand = calculation();
        }
        else {
            prevOperand = currentOperand;
        }
        addingOperator = operator;
        currentOperand = '';
    }


    // 
    function calculation() {
        switch (addingOperator) {
            case '÷':
                return Number(prevOperand) / Number(currentOperand);
                break;

            case '*':
                return Number(prevOperand) * Number(currentOperand);
                break;

            case '-':
                return Number(prevOperand) - Number(currentOperand);
                break;

            case '+':
                return Number(prevOperand) + Number(currentOperand);
                break;
            default:
                return 0;
        };
    }


    // Get number button event
    numberButtons.forEach((numberBtn) => {
        numberBtn.addEventListener('click', function (e) {
            if (this.textContent === "." && currentOperand.includes(".")) return;
            appendNumber(this.textContent);
            displayUpdate();
        })
    })


    // Get operator button event
    operatorButtons.forEach((operatorBtn) => {
        operatorBtn.addEventListener('click', function (e) {
            if (!currentOperand) return;
            selectOperator(this.textContent);
            displayUpdate();
        })
    })


    // Get equal button event
    equalBtn.addEventListener('click', function (e) {
        if (!prevOperand) return;
        if (currentOperand) {
            currentOperand = calculation();
        }
        else {
            currentOperand = prevOperand;
        }

        prevOperand = '';
        addingOperator = '';
        displayUpdate();
    })


    // All clear button event
    allClearBtn.addEventListener('click', function (e) {
        currentOperand = '';
        prevOperand = '';
        addingOperator = '';
        displayUpdate();
    })


    // Delete button event
    deleteBtn.addEventListener('click', function (e) {
        currentOperand = currentOperand.slice(0, -1);
        displayUpdate();
    })

})()






