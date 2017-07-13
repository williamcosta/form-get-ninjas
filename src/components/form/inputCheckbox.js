export default function checkboxWrapper(input) {
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