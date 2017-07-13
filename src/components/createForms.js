import checkboxWrapper from './form/inputCheckbox'
import selectWrapper from './form/select'
import { inputRender, inputTextWrapper } from './form/inputText'

function createRequestForm(data) {
    let myInput = '';

    let requestFields = data.request_fields;
    let userFields = data.user_fields;

    for (var x = 0; x < requestFields.length; x++) {
        var input = requestFields[x];

        if (input.type === 'enumerable' && input.allow_multiple_value === true) {
            myInput += checkboxWrapper(input, myInput);
        } else if (input.type === 'enumerable' && input.allow_multiple_value === false) {
            myInput += selectWrapper(input);
        } else {
            myInput += inputTextWrapper(input);
        }

        if (x+ 1 === requestFields.length) {
            return myInput;    
        }
    }

    for (var x = 0; x < userFields.length; x++) {
        var input = userFields[x];
        myInput += inputTextWrapper(input);

        return myInput;
    }
}

function createUserForm(data) {
    let myInput2 = '';

    myInput2 += `<div class="form-service__description">
                            <h3>Falta pouco!</h3>
                            <small>Preencha mais algumas informações para que os profissionais indicados possam entrar em contato.</small>
                        </div>`

    let userFields = data.user_fields;

    for (var x = 0; x < userFields.length; x++) {
        var input = userFields[x];
        myInput2 += inputTextWrapper(input);

        if (x+ 1 === userFields.length) {
            return myInput2;    
        }
    }
}

export { createRequestForm, createUserForm }