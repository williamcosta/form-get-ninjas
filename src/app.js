function getInputs(){
    return fetch('../fields.json')
        .then(data => data.json())
		.then(data => data._embedded);
}

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

function checkboxWrapper(input) {
    return(`
        <div class="form-service__fields">
            <label>${input.label}</label>
            <ul class="form-service__inputs">
            ${Object.keys(input.values).map((objectKey, index) => `
                <li class="form-service__check">
                    <input type="checkbox" ${(input.required === true) ? 'class="required"' : ''} name="${input.label}" id="${input.label}-${index}" value="${input.values[objectKey]}" />
                    <label for="${input.label}-${index}">${input.values[objectKey]}</label>
                </li>
            `).join('')}      
            </ul>
            ${(input.required === true) ? '<span class="message message--error">Escolha ao menos uma opção.</span>' : ''}
        </div>
    `)
}

function selectWrapper(input) {
    return(`
        <div class="form-service__fields">
            <label for="O serviço será para quantas pessoas?">${input.label}</label>
            <select id="O serviço será para quantas pessoas?" name="O serviço será para quantas pessoas?" class="form-service__select ${(input.required === true) ? 'required ' : ''}">
                <option value="">${input.mask}</option>
                ${Object.keys(input.values).map((objectKey, index) => `<option value="${index}">${input.values[objectKey]}</option>`).join('')}
            </select>
            ${(input.required === true) ? '<span class="message message--error">Selecione uma opção.</span>' : ''}
        </div>
    `)
}

function inputRender(input) {
    if (input.type === 'big_text') {
        return(`<textarea type="textarea" name="${input.label}" placeholder="${input.placeholder}" ${(input.required === true) ? 'class="required"' : ''}/></textarea>`)
    } else if (input.type === 'small_text' || input.type ==='lat_lng') {
        return(`<input type="text" name="${input.name}" id="${input.name}" placeholder="${input.placeholder}" ${(input.required === true) ? 'class="required"' : ''}/>`)
    } else {
        return(`<input type="${input.type}" name="${input.name}" id="${input.name}" placeholder="${input.placeholder}" ${(input.required === true) ? 'class="required"' : ''}/>`)
    }
};

function inputTextWrapper(input) {

    return(`
        <div class="form-service__fields">
            <label for="${input.name}">${input.label}</label>
            ${inputRender(input)}
            ${(input.required === true) ? '<span class="message message--error">Este campo é requerido</span>' : ''}
        </div>
    `)
}

function validationForm(elem, formId) {
    let form = document.getElementById(formId);
    var isValid = false;

    let input = form.getElementsByTagName('input');
    let select = form.getElementsByTagName('select');

    if (input.length > 0) {
        for(var i = 0; i < input.length; i++) {
            if (input[i].classList.contains('required')) {
                if(input[i].type === 'checkbox' && input[i].checked === true) {
                    isValid = true;
                }

                if(input[i].type === 'text' || input[i].type === 'tel' || input[i].type === 'email'){
                    if(input[i].value != ""){
                        isValid = true;
                    }
                }
            }
        }
    }

    if (select.length > 0) {
        for(var x = 0; x < select.length; x++) {
            if (select[x].classList.contains('required')) {
                if(select[x].selectedIndex > 0){
                    isValid = true;
                }
            }
        }
    }

    if (!isValid) {
        console.log('falhou!');
    } else {
        console.log('Sucesso');
        if (form.id === 'form-service') {
            //Esconde o formulário de "Buscar Profissionais"
            form.classList.add('form-service__content--hide')

            //Faz o formulário de "Seus Dados" e faz aparecer.
            form.nextSibling.nextSibling.classList.remove('form-service__content--hide');

            //Esconde o botão de "Buscar Profissionais"
            elem.classList.add('button--hide');

            //Faz o botão de finalizar o cadastro aparecer.
            elem.nextSibling.nextSibling.classList.remove('button--hide')

            //Faz a troca das tabs para indicar o formulário ativo.
            let tabsItem = document.querySelector('.tabs').children;

            for (var i = 0; i < tabsItem.length; i++) {
                if (tabsItem[i].classList.contains('tabs__item--active')) {
                    tabsItem[i].classList.remove('tabs__item--active');
                } else {
                    tabsItem[i].classList.add('tabs__item--active');
                }
            }
        }
    }
}

function renderForm(formRequest, formUser) {
    getInputs()
        .then(data => {
            const inputs = createRequestForm(data);
            const inputsUser = createUserForm(data);
            formRequest.innerHTML = inputs;
            formUser.innerHTML = inputsUser;

        });
}

(function(){
  
    const formRequest = document.getElementById('form-service');
    const formUser = document.getElementById('form-user');

    renderForm(formRequest, formUser);

    let buttons = document.getElementsByTagName('button');

    for(var i= 0; i < buttons.length; i++) {
        buttons[i].addEventListener ("click", function() {
            validationForm(this, this.dataset.form);
        }, false);
    }
})();