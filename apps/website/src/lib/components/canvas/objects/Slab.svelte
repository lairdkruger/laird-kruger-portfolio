<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import { BoxGeometry, MeshBasicMaterial, type Group, Mesh, Color, Vector3, Quaternion } from 'three'

	export let parent: Group
	export let position: Vector3 = new Vector3(0, 0, 0)

	const { rapier, rapierWorld, onFrame } = getWebglContext()

	const size = [1, 2.33, 0.1]
	const geometry = new BoxGeometry(...size)
	const materialColor = new Color(0xff0000)
	const material = new MeshBasicMaterial({ color: materialColor, transparent: false, wireframe: true })
	const mesh = new Mesh(geometry, material)
	mesh.position.set(position.x, position.y, position.z)

	// Physics
	let physicsBody: RigidBody | null = null

	$: if ($rapier && $rapierWorld) {
		const rigidBodyDesc = $rapier.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setAdditionalMass(0.5)
			.setCanSleep(false)

		physicsBody = $rapierWorld.createRigidBody(rigidBodyDesc)

		const colliderDesc = $rapier.ColliderDesc.cuboid(size[0] / 2, size[1] / 2, size[2] / 2)
			.setFriction(0)
			.setRestitution(1)
			.setRotation({
				w: 1,
				x: 0,
				y: 0,
				z: 0
			})

		$rapierWorld.createCollider(colliderDesc, physicsBody)
	}

	onFrame(() => {
		if ($rapier && $rapierWorld && physicsBody) {
			const position = physicsBody.translation()
			const rotation = physicsBody.rotation()

			mesh.position.set(position.x, position.y, position.z)
			mesh.rotation.setFromQuaternion(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))
		}
	})

	$: if (parent) {
		parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
