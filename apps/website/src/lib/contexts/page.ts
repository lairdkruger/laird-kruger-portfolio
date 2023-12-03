import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

type TransitionState = 'in' | 'out' | false

interface PageContext {
	isTransitioning: Writable<TransitionState>
}

export function createPageContext(pathname: string) {
	const contextKey = pathname
	const isTransitioning = writable<TransitionState>(false)

	return setContext<PageContext>(contextKey, {
		isTransitioning
	})
}

export function getPageContext(pathname: string): PageContext {
	const contextKey = pathname
	const context = getContext<PageContext>(contextKey)
	return context
}
