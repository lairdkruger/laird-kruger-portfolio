<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { activeProjectPosition } from '$lib/stores/projects'
	import { onDestroy } from 'svelte'
	import { BufferGeometry, LineBasicMaterial, Vector3, Line } from 'three'

	const { scene, onFrame } = getWebglContext()

	const topLineGeometry = new BufferGeometry()
	const rightLineGeometry = new BufferGeometry()
	const bottomLineGeometry = new BufferGeometry()
	const leftLineGeometry = new BufferGeometry()

	const lineMaterial = new LineBasicMaterial({
		color: 0xffffff,
		linewidth: 10,
		linecap: 'round',
		linejoin: 'round'
	})

	const topLine = new Line(topLineGeometry, lineMaterial)
	const rightLine = new Line(rightLineGeometry, lineMaterial)
	const bottomLine = new Line(bottomLineGeometry, lineMaterial)
	const leftLine = new Line(leftLineGeometry, lineMaterial)

	const pointsTop = [new Vector3(0, 0, 0), new Vector3(0, 5, 0)]
	const pointsRight = [new Vector3(0, 0, 0), new Vector3(5, 0, 0)]
	const pointsBottom = [new Vector3(0, 0, 0), new Vector3(0, -5, 0)]
	const pointsLeft = [new Vector3(0, 0, 0), new Vector3(-5, 0, 0)]

	topLineGeometry.setFromPoints(pointsTop)
	rightLineGeometry.setFromPoints(pointsRight)
	bottomLineGeometry.setFromPoints(pointsBottom)
	leftLineGeometry.setFromPoints(pointsLeft)

	console.log(topLine)

	onFrame(() => {
		pointsTop[0] = $activeProjectPosition
		pointsRight[0] = $activeProjectPosition
		pointsBottom[0] = $activeProjectPosition
		pointsLeft[0] = $activeProjectPosition

		topLineGeometry.setFromPoints(pointsTop)
		rightLineGeometry.setFromPoints(pointsRight)
		bottomLineGeometry.setFromPoints(pointsBottom)
		leftLineGeometry.setFromPoints(pointsLeft)
	})

	$: if ($scene) {
		$scene.add(topLine)
		$scene.add(rightLine)
		$scene.add(bottomLine)
		$scene.add(leftLine)
	}

	onDestroy(() => {
		if ($scene) {
			$scene.remove(topLine)
			$scene.remove(rightLine)
			$scene.remove(bottomLine)
			$scene.remove(leftLine)
		}
	})
</script>
