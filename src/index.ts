import './styles/index.scss'
import { Octokit } from 'octokit'
import { IForm } from './types/form.types'
import { repoSearch } from './utils/repoSearch'
import { inputOnBlur, inputOnInput } from './utils/formListeners'

const initialForm = () => {
	const octokit = new Octokit()

	if (!('form-search' in document.forms)) throw new Error('Форма не найдена')
	const form = document.forms['form-search'] as IForm
	const inputElem = form.search
	const searchBtn = form.searchBtn
	const url = new URL(window.location.href)

	let isErrorInput = false
	let isSearching = false

	const repoSearchWithParams = () => {
		if (isSearching || isErrorInput) return

		const reposList = document.querySelector('.repos-list') as Element
		const loader = document.querySelector('.rect') as HTMLElement

		isSearching = true
		reposList.innerHTML = ''
		loader.style.display = 'flex'

		const urlParams = new URLSearchParams(window.location.search)
		repoSearch(
			octokit,
			urlParams.get('search')?.toString() || '',
			reposList,
			isSearching
		).then(() => {
			isSearching = false
			loader.style.display = 'none'
		})
	}

	inputElem.value =
		new URLSearchParams(window.location.search).get('search')?.toString() || ''

	if (inputElem.value) repoSearchWithParams()

	inputElem.onblur = () => inputOnBlur(inputElem, isErrorInput)

	inputElem.oninput = () => inputOnInput(inputElem, isErrorInput, url)

	inputElem.onkeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter') return
		repoSearchWithParams()
	}

	searchBtn.onclick = (event: MouseEvent) => {
		event.preventDefault()
		repoSearchWithParams()
	}
}

initialForm()
