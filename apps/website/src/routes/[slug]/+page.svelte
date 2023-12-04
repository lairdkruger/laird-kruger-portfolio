<script lang="ts">
	import ProjectPage from '$lib/components/pages/project/ProjectPage.svelte'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import { pageTheme } from '$lib/stores/ui'
	import { activeProject, activeProjectType } from '$lib/stores/projects'
	import { getWebglContext } from '$lib/contexts/webgl'

	export let data: PageData

	const { rapierWorld } = getWebglContext()

	onMount(() => {
		pageTheme.set('light')
	})

	$: if ($rapierWorld) {
		setTimeout(() => {
			activeProject.set(data.props.project.slug)
			activeProjectType.set(data.props.project.type)
		}, 0)
	}
</script>

<ProjectPage contentBlock={data.props.project} />
