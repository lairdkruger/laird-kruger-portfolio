<script lang="ts">
	export let isActive: boolean
</script>

<svg
	width="16"
	height="37"
	viewBox="0 0 16 37"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	overflow="visible"
>
	<rect width="16" height="37" stroke="currentColor" class:active={isActive} />
</svg>

<style>
	rect {
		fill: transparent;
	}

	rect.active {
		fill: var(--white);
	}
</style>
