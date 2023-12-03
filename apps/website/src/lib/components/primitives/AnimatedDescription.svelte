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

<div transition:transition={{}}>
	<slot />
</div>

<style>
</style>
