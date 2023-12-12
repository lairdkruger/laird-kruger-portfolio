<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedDescription from '$lib/components/transitions/AnimatedDescription.svelte'
	import AnimatedHeading from '$lib/components/transitions/AnimatedHeading.svelte'
	import type { ContentBlock } from '$lib/data/blocks'

	export let contentBlock: ContentBlock
</script>

<InformationLayout>
	<AnimatedHeading slot="heading">{contentBlock.title}</AnimatedHeading>
	<AnimatedDescription slot="content">
		<div class="description">
			<p>{contentBlock.description}</p>

			{#if contentBlock.credits}
				<div class="credits">
					{#each contentBlock.credits as credit}
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

			{#if contentBlock.url}
				<a href={contentBlock.url} target="_blank" rel="noopener noreferrer">View Project</a>
			{/if}
		</div>
	</AnimatedDescription>
</InformationLayout>

<style>
	.description {
		width: 512px;
		max-width: calc(100vw - 2 * var(--margin));

		display: flex;
		flex-direction: column;
		row-gap: var(--spacing24);
		align-items: center;
	}

	.credits {
		display: flex;
		flex-direction: column;
		row-gap: var(--spacing4);
		align-items: center;
	}
</style>
