<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { onDestroy } from 'svelte'
	import { Group, Vector3 } from 'three'
	import Bounds from '../objects/Bounds.svelte'
	import { information, projects } from '$lib/data/projects'
	import InformationSlab from '../objects/InformationSlab.svelte'
	import ProjectSlab from '../objects/ProjectSlab.svelte'
	import ConnectorLines from '../objects/ConnectorLines.svelte'
	import { map } from '$lib/utils/maths'
	import CameraMovement from '../objects/CameraMovement.svelte'

	const { scene, onFrame } = getWebglContext()

	const boundsGroup = new Group()
	const slabsGroup = new Group()

	// slabsGroup.rotateY(Math.PI / 2)

	const slabs = [...projects, ...information]
	const positionBounds = [-4, 4]

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

<Bounds parent={boundsGroup} />

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
