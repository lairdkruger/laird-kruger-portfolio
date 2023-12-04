<script lang="ts">
	import { siteLoaded } from '$lib/stores/load'
	import { motionDefault } from '$lib/styles/motion'
	import { tweened } from 'svelte/motion'

	const loadTimeline = tweened(0, motionDefault)
	$: loadTimeline.set($siteLoaded ? 1 : 0)
</script>

<footer style="opacity: {$loadTimeline}">
	<a href="https://github.com/lairdkruger">Github</a>
	/
	<a href="mailto:hello@lairdkruger.com">Contact</a>
</footer>

<style>
	footer {
		position: fixed;
		bottom: var(--margin);
		right: var(--margin);

		display: flex;
		column-gap: var(--spacing16);
		align-items: flex-end;

		mix-blend-mode: var(--mix-blend-mode);
	}

	@media (max-width: 640px) {
		footer {
			bottom: auto;
			top: var(--margin);

			column-gap: var(--spacing16);
		}
	}
</style>
