import getInputs from '../services/getInputs'
import { createRequestForm, createUserForm } from './createForms'

export default function renderForm(formRequest, formUser) {
    getInputs()
        .then(data => {
            const inputs = createRequestForm(data);
            const inputsUser = createUserForm(data);
            formRequest.innerHTML = inputs;
            formUser.innerHTML = inputsUser;

        });
}