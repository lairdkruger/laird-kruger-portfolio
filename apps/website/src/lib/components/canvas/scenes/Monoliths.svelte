<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { onDestroy } from 'svelte'
	import { Group, Vector3 } from 'three'
	import BoundryBox from '../objects/BoundryBox.svelte'
	import Slab from '../objects/Slab.svelte'

	const { scene, onFrame } = getWebglContext()

	const monolithsGroup = new Group()

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
<Slab parent={monolithsGroup} position={new Vector3(Math.random() / 2, -1, 0)} />
<Slab parent={monolithsGroup} position={new Vector3(Math.random() / 2, 2, 0)} />
