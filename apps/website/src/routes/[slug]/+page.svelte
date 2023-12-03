<script lang="ts">
	import ProjectPage from '$lib/components/pages/project/ProjectPage.svelte'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import { pageTheme } from '$lib/stores/ui'

	export let data: PageData

	onMount(() => {
		pageTheme.set('light')
	})
</script>

<ProjectPage project={data.props.project} />
