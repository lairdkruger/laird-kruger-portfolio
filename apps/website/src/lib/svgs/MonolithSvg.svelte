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
	<rect width="16" height="37" stroke="currentColor" fill={isActive ? '#000000' : 'transparent'} />
</svg>
