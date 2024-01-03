<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { springConfigExtraSmooth } from '$lib/styles/motion'
	import { spring } from 'svelte/motion'

	const { camera, pointer } = getWebglContext()

	const offsetX = spring(0, springConfigExtraSmooth)
	const offsetY = spring(0, springConfigExtraSmooth)

	$: if ($camera && $pointer) {
		offsetX.set($pointer.x)
		offsetY.set($pointer.y)
	}

	$: if ($camera) {
		$camera.position.x = $offsetX / 3
		$camera.position.y = -$offsetY / 3
	}
</script>
