import { Octokit } from 'octokit'
import { createRepo } from './repoCreate'

export const repoSearch = async (
	octokit: Octokit,
	search: string,
	reposList: Element,
	isSearching: boolean
) => {
	if (!search) return

	await octokit
		.request('GET /search/repositories', {
			q: search,
			per_page: 10,
		})
		.then(
			resp => {
				if (resp.status !== 200) {
					const error = document.createElement('h1')
					error.textContent = 'Ошибка поиска'
					error.style.color = 'rgb(184, 38, 38)'
					reposList.append(error)
					return
				}

				// Если ничего не нашли
				const totalCount = resp.data.total_count
				if (!totalCount) {
					const info = document.createElement('h1')
					info.textContent = 'Ничего не найдно :C'
					reposList.append(info)
					return
				}

				const repos = resp.data.items
				repos.forEach(rep => {
					createRepo(rep, reposList)
				})
			},
			() => {
				const error = document.createElement('h1')
				error.textContent = 'Ошибка поиска'
				error.style.color = 'rgb(184, 38, 38)'
				reposList.append(error)
				return
			}
		)
}
