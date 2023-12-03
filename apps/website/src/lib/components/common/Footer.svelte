<script lang="ts">
</script>

<footer>
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
