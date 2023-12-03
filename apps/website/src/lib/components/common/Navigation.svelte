<script lang="ts">
	import InformationNavigation from './InformationNavigation.svelte'
	import ProjectNavigation from './ProjectNavigation.svelte'
</script>

<nav>
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
</style>
