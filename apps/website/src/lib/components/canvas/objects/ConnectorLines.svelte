<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { activeProjectPosition } from '$lib/stores/projects'
	import { pageTheme } from '$lib/stores/ui'
	import { onDestroy } from 'svelte'
	import { BufferGeometry, LineBasicMaterial, Vector3, Line, Color } from 'three'
	import { visibleHeightAtZDepth, visibleWidthAtZDepth } from 'three-utils'

	const { scene, onFrame, onResize, camera } = getWebglContext()

	let sceneHeight = 0
	let sceneWidth = 0

	onResize(() => {
		if (!$camera) return
		sceneHeight = visibleHeightAtZDepth(0, $camera)
		sceneWidth = visibleWidthAtZDepth(0, $camera)
	})

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

	let pointsTop = [new Vector3(0, 0, 0), new Vector3(0, sceneHeight / 2, 0)]
	let pointsRight = [new Vector3(0, 0, 0), new Vector3(sceneWidth / 2, 0, 0)]
	let pointsBottom = [new Vector3(0, 0, 0), new Vector3(0, -sceneHeight / 2, 0)]
	let pointsLeft = [new Vector3(0, 0, 0), new Vector3(-sceneWidth / 2, 0, 0)]

	topLineGeometry.setFromPoints(pointsTop)
	rightLineGeometry.setFromPoints(pointsRight)
	bottomLineGeometry.setFromPoints(pointsBottom)
	leftLineGeometry.setFromPoints(pointsLeft)

	$: if ($pageTheme === 'dark') {
		lineMaterial.color = new Color(0xffffff)
	} else if ($pageTheme === 'light') {
		lineMaterial.color = new Color(0x000000)
	}

	onFrame(() => {
		pointsTop = [$activeProjectPosition, new Vector3(0, sceneHeight / 2, 0)]
		pointsRight = [$activeProjectPosition, new Vector3(sceneWidth / 2, 0, 0)]
		pointsBottom = [$activeProjectPosition, new Vector3(0, -sceneHeight / 2, 0)]
		pointsLeft = [$activeProjectPosition, new Vector3(-sceneWidth / 2, 0, 0)]

		topLineGeometry.setFromPoints(pointsTop)
		rightLineGeometry.setFromPoints(pointsRight)
		bottomLineGeometry.setFromPoints(pointsBottom)
		leftLineGeometry.setFromPoints(pointsLeft)
	})

	$: if ($scene) {
		if (!$scene.children.includes(topLine)) $scene.add(topLine)
		if (!$scene.children.includes(rightLine)) $scene.add(rightLine)
		if (!$scene.children.includes(bottomLine)) $scene.add(bottomLine)
		if (!$scene.children.includes(leftLine)) $scene.add(leftLine)
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
