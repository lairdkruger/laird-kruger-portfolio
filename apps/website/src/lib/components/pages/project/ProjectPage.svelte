<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedDescription from '$lib/components/primitives/AnimatedDescription.svelte'
	import AnimatedHeading from '$lib/components/primitives/AnimatedHeading.svelte'
	import type { Project } from '$lib/data/projects'

	export let project: Project
</script>

<InformationLayout>
	<AnimatedHeading slot="heading">{project.title}</AnimatedHeading>
	<AnimatedDescription slot="content">
		<p>{project.description}</p>

		{#if project.credits}
			<div class="credits">
				{#each project.credits as credit}
					<span class="credit">
						{#if credit.creditText}
							<span>{credit.creditText}</span>
						{/if}

						{#if credit.linkText}
							<a href={credit.link}>{credit.linkText}</a>
						{/if}
					</span>
				{/each}
			</div>
		{/if}

		{#if project.url}
			<a href={project.url} target="_blank" rel="noopener noreferrer">View Project</a>
		{/if}
	</AnimatedDescription>
</InformationLayout>

<style>
	.credits {
		display: flex;
		flex-direction: column;
		row-gap: var(--spacing4);
		align-items: center;
	}
</style>
