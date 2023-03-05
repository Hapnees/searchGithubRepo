import { IRep } from '../types/repo.types'

export const createRepo = (rep: IRep, reposList: Element) => {
	const repo = document.createElement('article')
	const repoHeader = document.createElement('div')
	const repoHeaderTitle = document.createElement('a')
	const repoHeaderDate = document.createElement('p')
	const repoDescrip = document.createElement('p')
	const repoContainerTopics = document.createElement('div')
	const repoTopicsTitle = document.createElement('p')
	const repoTopicsList = document.createElement('ul')

	repo.className = 'repo'
	repoHeader.className = 'repo__header'
	repoHeaderTitle.className = 'repo__header__title'
	repoHeaderDate.className = 'repo__header__date'
	if (rep.description) repoDescrip.className = 'repo__descrip'
	repoContainerTopics.className = 'repo__container__topics'
	repoTopicsTitle.className = 'repo__topics__title'
	repoTopicsList.className = 'repo__topics__list'

	repoHeaderTitle.textContent = rep.name
	repoHeaderDate.textContent = new Date(rep.created_at).toLocaleString()
	repoDescrip.textContent = rep.description
	repoTopicsTitle.textContent = 'topics'

	repoHeaderTitle.setAttribute('href', rep.html_url)
	repoHeaderTitle.setAttribute('target', '_blank')

	rep.topics?.forEach(
		topic => (repoTopicsList.innerHTML += `<li>${topic}</li>`)
	)

	repoHeader.append(repoHeaderTitle, repoHeaderDate)

	if (rep.topics?.length)
		repoContainerTopics.append(repoTopicsTitle, repoTopicsList)

	repo.append(repoHeader, repoDescrip, repoContainerTopics)
	reposList.append(repo)
}
