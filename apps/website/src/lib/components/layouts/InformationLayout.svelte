<div class="wrapper">
	<slot name="heading" />
	<slot name="content" />
</div>

<style>
	.wrapper {
		position: fixed;
		top: calc(50% - 24px);
		left: 50%;
		transform: translate(-50%, -50%);

		width: 0px;
		height: 0px;

		display: flex;
		flex-direction: column;
		row-gap: var(--spacing24);
		align-items: center;
		justify-content: flex-start;

		text-align: center;
	}
</style>
