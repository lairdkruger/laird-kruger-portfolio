<script lang="ts">
	import ProjectNavigation from './ProjectNavigation.svelte'
</script>

<nav>
	<div class="projects">
		<ProjectNavigation />
	</div>
	<div class="information">
		<!-- <InformationNavigation /> -->
	</div>
</nav>

<style>
	nav {
		position: fixed;
		bottom: var(--margin);
		width: 100%;
		padding: 0 var(--margin);

		display: flex;
		justify-content: space-between;

		mix-blend-mode: var(--mix-blend-mode);
	}
</style>
