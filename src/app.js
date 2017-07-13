import renderForm from './components/renderForm'
import validationForm from './components/validateForm'

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