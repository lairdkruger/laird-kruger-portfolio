<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { onDestroy } from 'svelte'
	import { Group, Vector3 } from 'three'
	import BoundryBox from '../objects/BoundryBox.svelte'
	import { information, projects } from '$lib/data/projects'
	import InformationSlab from '../objects/InformationSlab.svelte'
	import ProjectSlab from '../objects/ProjectSlab.svelte'
	import ConnectorLines from '../objects/ConnectorLines.svelte'
	import { map } from '$lib/utils/maths'

	const { scene, onFrame } = getWebglContext()

	const monolithsGroup = new Group()

	const projectSlabPositions = projects.map((_, index) => {
		const z = map(index, 0, projects.length, 2, -1)
		return new Vector3(0, 0, z)
	})

	const projectSlabRotations = projects.map((_, index) => {
		const randomness = index === 0 ? 0 : Math.random() * 0.05
		return new Vector3(randomness, randomness, 0)
	})

	const informationSlabPositions = information.map((_, index) => {
		const z = map(index, 0, information.length, -2, -4)
		return new Vector3(0, 0, z)
	})

	const informationSlabRotations = information.map(() => {
		const randomness = Math.random() * 0.05
		return new Vector3(randomness, randomness, 0)
	})

	onFrame(() => {})

	$: if ($scene) {
		$scene.add(monolithsGroup)
	}

	onDestroy(() => {
		if ($scene) {
			$scene.remove(monolithsGroup)
		}
	})
</script>

<BoundryBox parent={monolithsGroup} />

{#each projects as project, index}
	<ProjectSlab
		{project}
		parent={monolithsGroup}
		position={projectSlabPositions[index]}
		rotation={projectSlabRotations[index]}
	/>
{/each}

{#each information as project, index}
	<InformationSlab
		{project}
		parent={monolithsGroup}
		position={informationSlabPositions[index]}
		rotation={informationSlabRotations[index]}
	/>
{/each}

<ConnectorLines />