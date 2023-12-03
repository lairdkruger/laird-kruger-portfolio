<script lang="ts">
	import { pageTransitionDuration } from '$lib/stores/ui'
	import type { TransitionConfig } from 'svelte/transition'

	function transition(_: HTMLDivElement, params: TransitionConfig): TransitionConfig {
		return {
			duration: pageTransitionDuration,
			...params,
			css: (timeline) => {
				const opacityTimeline = timeline

				return `
               opacity: ${opacityTimeline};
            `
			}
		}
	}
</script>

<div class="description" transition:transition={{}}>
	<slot />
</div>

<style>
	.description {
		width: 512px;

		display: flex;
		flex-direction: column;
		row-gap: var(--spacing24);
		align-items: center;
	}
</style>
