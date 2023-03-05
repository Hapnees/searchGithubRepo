export const inputOnBlur = (
	inputElem: HTMLInputElement,
	isErrorInput: boolean
) => {
	if (!inputElem.value) {
		const oldError = inputElem.parentElement?.querySelector('.form__error')
		if (oldError) return

		const error = document.createElement('p')
		error.textContent = 'Поле не должно быть пустым'
		error.className = 'form__error'
		inputElem.parentElement?.append(error)
		isErrorInput = true
	}
}

export const inputOnInput = (
	inputElem: HTMLInputElement,
	isErrorInput: boolean,
	url: URL
) => {
	if (inputElem.value) {
		const error = inputElem.parentElement?.querySelector('.form__error')
		if (error) error.remove()
		isErrorInput = false
	}

	url.searchParams.set('search', inputElem.value)
	window.history.replaceState('', '', url)
}
