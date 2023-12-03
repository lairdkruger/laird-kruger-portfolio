<script lang="ts">
	import { pageTransitionDuration } from '$lib/stores/ui'
	import { quadOut } from 'svelte/easing'
	import type { TransitionConfig } from 'svelte/transition'

	type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

	function transition(
		_: HTMLDivElement,
		params: TransitionConfig & { position: Position },
		options: { direction: 'in' | 'out' | 'both' }
	): TransitionConfig {
		const { position, ...rest } = params

		return {
			duration: pageTransitionDuration,
			...rest,
			css: (timeline) => {
				const distance = options.direction === 'in' ? 24 : -24

				const opacityTimeline = quadOut(timeline)
				const translationTimeline = 1 - opacityTimeline

				const animations: Record<Position, string> = {
					'top-left': `translate(${0}px, ${-translationTimeline * distance}px)`,
					'top-right': `translate(${-translationTimeline * distance}px, ${0}px)`,
					'bottom-right': `translate(${0}px, ${translationTimeline * distance}px)`,
					'bottom-left': `translate(${translationTimeline * distance}px, ${0}px)`
				}

				return `
               opacity: ${opacityTimeline};
					transform: ${animations[position]};
            `
			}
		}
	}
</script>

<div class="headings">
	<div class="window top-left">
		<h2
			class="heading type_heading-large"
			in:transition={{ position: 'top-left' }}
			out:transition={{ position: 'top-left' }}
		>
			<slot />
		</h2>
	</div>
	<div class="window top-right">
		<h2
			class="heading type_heading-large"
			in:transition={{ position: 'top-right' }}
			out:transition={{ position: 'top-right' }}
		>
			<slot />
		</h2>
	</div>
	<div class="window bottom-right">
		<h2
			class="heading type_heading-large"
			in:transition={{ position: 'bottom-right' }}
			out:transition={{ position: 'bottom-right' }}
		>
			<slot />
		</h2>
	</div>
	<div class="window bottom-left">
		<h2
			class="heading type_heading-large"
			in:transition={{ position: 'bottom-left' }}
			out:transition={{ position: 'bottom-left' }}
		>
			<slot />
		</h2>
	</div>

	<h2 class="heading sizer type_heading-large">
		<slot />
	</h2>
</div>

<style>
	.headings {
		position: relative;
	}

	.heading {
		position: absolute;
		text-wrap: nowrap;
		pointer-events: none;
	}

	.window {
		position: absolute;
		width: 50%;
		height: 50%;

		overflow: hidden;
	}

	.window.top-left {
		top: 0;
		left: 0;
	}

	.window.top-right {
		top: 0;
		right: 0;
	}

	.window.bottom-right {
		bottom: 0;
		right: 0;
	}

	.window.bottom-left {
		bottom: 0;
		left: 0;
	}

	.window.top-right .heading {
		left: -100%;
	}

	.window.bottom-right .heading {
		top: -100%;
		left: -100%;
	}

	.window.bottom-left .heading {
		top: -100%;
	}

	.sizer {
		color: transparent;
		position: relative;
		pointer-events: auto;
	}
</style>
