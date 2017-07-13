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

export { inputRender, inputTextWrapper }