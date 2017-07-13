export default function validationForm(elem, formId) {
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