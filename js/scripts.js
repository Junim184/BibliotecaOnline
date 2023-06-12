class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    validate(form) {

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');

        let inputsArray = [...inputs];
        inputsArray.forEach(function(input) {
            
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {

                    let method = this.validations[i].replace('data-','').replace("-",'');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);

                }           
            }

        }, this);

    }

    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMenssage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMenssage);
        }

    }

    maxlength(input, maxValue) {
        
        let inputLength = input.value.length;

        let errorMenssage = `O campo precisa ter menos ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMenssage);
        }

    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMenssage = `Insira um e-mail no padrao matheus@gmail.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMenssage);
        }
    }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMenssage = `Este campo nao aceita numeros nem caracteres especiais`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMenssage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa esta igual ao ${inputName}`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input) {
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMenssage = `A senha precisa de um caractere maiusculo e um numero`;

            this.printMessage(input, errorMenssage);
        }

    }

    printMessage(input, msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;
    
            let inputParent = input.parentNode;
    
            template.classList.remove('template');
    
            inputParent.appendChild(template);
        }
        
    }

    required(input) {
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMenssage = `Este campo é obrigatorio`;

            this.printMessage(input, errorMenssage);
        }
    }

    cleanValidations(validations) {
    validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);
});