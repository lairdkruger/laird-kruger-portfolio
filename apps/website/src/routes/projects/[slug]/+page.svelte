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
		pageTheme.set('dark')
	})

	$: if ($rapierWorld) {
		activeProject.set(data.props.project.slug)
		activeProjectType.set(data.props.project.type)
	}
</script>

<svelte:head>
	<title>LAIRD KRUGER → {data.props.project.title}</title>
	<meta name="description" content={data.props.project.description} />
</svelte:head>

<ProjectPage contentBlock={data.props.project} />
