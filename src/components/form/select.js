export default function selectWrapper(input) {
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