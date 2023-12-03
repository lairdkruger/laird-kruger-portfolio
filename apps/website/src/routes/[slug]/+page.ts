import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { information } from '$lib/data/projects'

export const load: PageLoad = ({ params }) => {
	const project = information.find((project) => project.slug === params.slug)

	if (project) return { props: { project } }
	throw error(404, 'Not found')
}
