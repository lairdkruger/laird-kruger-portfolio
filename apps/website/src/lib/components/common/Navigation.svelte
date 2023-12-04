<script lang="ts">
	import { tweened } from 'svelte/motion'
	import InformationNavigation from './InformationNavigation.svelte'
	import ProjectNavigation from './ProjectNavigation.svelte'
	import { motionDefault } from '$lib/styles/motion'
	import { siteLoaded } from '$lib/stores/load'

	const loadTimeline = tweened(0, motionDefault)
	$: loadTimeline.set($siteLoaded ? 1 : 0)
</script>

<nav style="opacity: {$loadTimeline}">
	<div class="projects">
		<ProjectNavigation />
	</div>
	<div class="information">
		<InformationNavigation />
	</div>
</nav>

<style>
	nav {
		mix-blend-mode: var(--mix-blend-mode);
	}

	.projects {
		position: fixed;
		bottom: var(--margin);
		left: var(--margin);
	}

	.information {
		position: fixed;
		top: var(--margin);
		right: var(--margin);
	}

	@media (max-width: 640px) {
		.information {
			top: auto;
			bottom: var(--margin);
		}
	}
</style>
