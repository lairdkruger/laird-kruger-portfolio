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

	const { scene, onFrame } = getWebglContext()

	const boundsGroup = new Group()
	const slabsGroup = new Group()

	const projectSlabPositions = projects.map((_, index) => {
		const z = map(index, 0, projects.length, -4, 1)
		return new Vector3(0, 0, z)
	})

	const projectSlabRotations = projects.map((_, index) => {
		const randomness = index === 0 ? 0 : Math.random() * 0
		return new Vector3(randomness, randomness, 0)
	})

	const informationSlabPositions = information.map((_, index) => {
		const z = map(index, 0, information.length, 2, 4)
		return new Vector3(0, 0, z)
	})

	const informationSlabRotations = information.map(() => {
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

{#each projects as project, index}
	<ProjectSlab
		contentBlock={project}
		parent={slabsGroup}
		position={projectSlabPositions[index]}
		rotation={projectSlabRotations[index]}
	/>
{/each}

{#each information as info, index}
	<InformationSlab
		contentBlock={info}
		parent={slabsGroup}
		position={informationSlabPositions[index]}
		rotation={informationSlabRotations[index]}
	/>
{/each}

<ConnectorLines />
