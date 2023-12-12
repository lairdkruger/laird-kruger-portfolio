<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { onDestroy } from 'svelte'
	import { Group, Vector3 } from 'three'
	import Bounds from '$lib/components/canvas/objects/Bounds.svelte'
	import { information, projects } from '$lib/data/blocks'
	import InformationSlab from '$lib/components/canvas/objects/InformationSlab.svelte'
	import ProjectSlab from '$lib/components/canvas/objects/ProjectSlab.svelte'
	import ConnectorLines from '$lib/components/canvas/objects/ConnectorLines.svelte'
	import CameraMovement from '$lib/components/canvas/objects/CameraMovement.svelte'
	import { map } from 'maths-utils'

	const { scene, onFrame } = getWebglContext()

	const boundsGroup = new Group()
	const slabsGroup = new Group()

	const sceneSize = new Vector3(10, 10, 10)

	const slabs = [...projects, ...information]
	const positionBounds = [-(sceneSize.y / 2 - 1), sceneSize.y / 2 - 1]

	const positions = slabs.map((_, index) => {
		const z = map(index, 0, slabs.length - 1, positionBounds[0], positionBounds[1])
		return new Vector3(0, 0, z)
	})

	const rotations = slabs.map(() => {
		const randomness = Math.random() * 0
		return new Vector3(randomness, randomness, 0)
	})

	onFrame(() => {})

	$: if ($scene) {
		$scene.add(boundsGroup)
		$scene.add(slabsGroup)
	}

	onDestroy(() => {
		if ($scene) {
			$scene.remove(boundsGroup)
			$scene.remove(slabsGroup)
		}
	})
</script>

<Bounds parent={boundsGroup} size={sceneSize} />

{#each slabs as slab, index}
	{#if slab.type == 'information'}
		<InformationSlab
			{index}
			count={slabs.length}
			contentBlock={slab}
			parent={slabsGroup}
			position={positions[index]}
			rotation={rotations[index]}
		/>
	{:else}
		<ProjectSlab
			{index}
			count={slabs.length}
			contentBlock={slab}
			parent={slabsGroup}
			position={positions[index]}
			rotation={rotations[index]}
		/>
	{/if}
{/each}

<ConnectorLines />
<CameraMovement />
