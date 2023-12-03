<script lang="ts">
	import { createPageContext } from '$lib/contexts/page'
	import { pageTransitionDuration } from '$lib/stores/ui'
	import type { TransitionConfig } from 'svelte/transition'

	export let pathname: string

	const pageContext = createPageContext(pathname)

	function transition(
		_: HTMLDivElement,
		params: TransitionConfig,
		options: { direction: 'in' | 'out' }
	): TransitionConfig {
		return {
			delay: 0,
			duration: pageTransitionDuration,
			...params,
			tick: (timeline) => {
				if (timeline > 0 && timeline < 1) {
					pageContext.isTransitioning.set(options.direction)
				} else {
					pageContext.isTransitioning.set(false)
				}
			}
		}
	}
</script>

<div class="page" in:transition={{}} out:transition={{}}>
	<slot />
</div>

<style>
	.page {
		mix-blend-mode: var(--mix-blend-mode);
	}
</style>
