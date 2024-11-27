



const inputs = document.querySelectorAll('.input')
const bill = document.querySelector('#bill')
const people = document.querySelector('#people')
const tips = document.querySelectorAll('.tip')
const errorlabels = document.querySelectorAll('.error-label')
const tip_result = document.querySelector('#tip-amount-result')
const total_result = document.querySelector('#total-amount-result')
const reset = document.querySelector('#reset')
const allinputs = document.querySelectorAll('input')

reset.onclick = function(){
    allinputs.forEach((input)=>{
        input.textContent = ''
        input.value =''
    })
    tip_result.textContent = '0'
    total_result.textContent = '0'
}

function setActiveElement(e){
    tips.forEach((tip)=>{
        tip.classList.remove('active-tip')
    })
    e.target.classList.add('active-tip')
    if(validate()){
        let tip  = document.querySelector('.active-tip')
        if(tip.classList.contains('custom-tip')){
            tip  = document.querySelector('.active-tip')
            tip.oninput = function(){
                calcResults(bill.value , people.value , tip.value)
            }
        }else{
            calcResults(bill.value , people.value , tip.textContent)
        }
    }
}
tips.forEach((el)=>{
    el.addEventListener('click' , setActiveElement)
})


function showErrorMassage( i , massage){
    errorlabels[i].classList.add('error-label')
    errorlabels[i].textContent  = massage
    inputs[i].classList.add('error-input')
}

function clearErrormassage(i , el){
    errorlabels[i].classList.remove('error-label')
    errorlabels[i].textContent  = ""
    inputs[i].classList.remove('error-input')
}

function validInput(el , i){
    if(el.value.trim() == '' || Number(el.value) == 0){
        showErrorMassage( i , "Can't be zero")
        return false
    }else{ 
        clearErrormassage(i)
        return true
    }
}
function validate() {
    let valid = true
    inputs.forEach((el , i)=>{
        if(validInput(el,i) == false){
            valid = false
        }
    })
    return valid
}

function calcResults(bill , people , tip){
    bill = parseFloat(bill)
    people = parseFloat(people)
    tip = parseFloat(tip)
    tip_result.textContent = (bill * tip / 100 / people).toFixed(2) 
    total_result.textContent = ((bill * tip / 100 / people) + (bill / people)).toFixed(2)
}

inputs.forEach((el , i )=>{
    el.oninput = function (e){
        if(validate()){
            let tip  = document.querySelector('.active-tip')
            if(tip.classList.contains('custom-tip')){
                tip  = document.querySelector('.active-tip')
                calcResults(bill.value , people.value , tip.value)
            }else{
                calcResults(bill.value , people.value , tip.textContent)
            }
        }
    }
})