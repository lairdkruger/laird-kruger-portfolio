<script lang="ts">
	import { projects } from '$lib/data/blocks'
	import LinkMonolith from '$lib/components/primitives/LinkMonolith.svelte'
</script>

<div class="wrapper">
	<div class="label">
		<h2 class="heading">Selected Work</h2>
	</div>

	<div class="navigation">
		{#each projects as project}
			<LinkMonolith route={`/projects/${project.slug}`} label={project.title} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
		row-gap: var(--spacing4);
	}

	.navigation {
		display: flex;
		column-gap: var(--spacing8);
	}
</style>
