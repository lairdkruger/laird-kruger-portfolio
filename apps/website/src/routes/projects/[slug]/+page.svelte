<script lang="ts">
	import ProjectPage from '$lib/components/pages/project/ProjectPage.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<ProjectPage project={data.props.project} />
