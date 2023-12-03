<script lang="ts">
	import { goto } from '$app/navigation'
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { Project } from '$lib/data/projects'
	import { impulseForce } from '$lib/stores/physics'
	import { activeProject, activeProjectPosition } from '$lib/stores/projects'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import {
		BoxGeometry,
		MeshBasicMaterial,
		type Group,
		Mesh,
		Vector3,
		Quaternion,
		CubeTextureLoader,
		LinearMipMapLinearFilter,
		CubeRefractionMapping
	} from 'three'

	export let parent: Group
	export let position: Vector3 = new Vector3(0, 0, 0)
	export let rotation: Vector3 = new Vector3(0, 0, 0)
	export let project: Project

	const { rapier, rapierWorld, onFrame, raycaster, onClick } = getWebglContext()

	const size = [1, 2.33, 0.1]
	const geometry = new BoxGeometry(...size)
	const material = new MeshBasicMaterial({ transparent: false })
	const mesh = new Mesh(geometry, material)
	mesh.position.set(position.x, position.y, position.z)
	mesh.rotation.set(rotation.x, rotation.y, rotation.z)
	const rotationQuaternion = new Quaternion().setFromEuler(mesh.rotation)

	$: isActiveProject = $activeProject === project.slug

	// Texture
	$: if (typeof window !== 'undefined') {
		const cubeTexture = new CubeTextureLoader().load([
			`/textures/${project.texture}`,
			`/textures/${project.texture}`,
			`/textures/${project.texture}`,
			`/textures/${project.texture}`,
			`/textures/${project.texture}`,
			`/textures/${project.texture}`
		])
		material.envMap = cubeTexture
		material.envMap.anisotropy = 10
		material.envMap.minFilter = LinearMipMapLinearFilter
		material.envMap.mapping = CubeRefractionMapping
		material.needsUpdate = true
	}

	// Physics
	let physicsBody: RigidBody | null = null

	$: if ($rapier && $rapierWorld) {
		const rigidBodyDesc = $rapier.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setRotation(rotationQuaternion)
			.setAdditionalMass(10)
			.setCanSleep(false)

		physicsBody = $rapierWorld.createRigidBody(rigidBodyDesc)

		const colliderDesc = $rapier.ColliderDesc.cuboid(size[0] / 2, size[1] / 2, size[2] / 2)
			.setFriction(0)
			.setRestitution(1)

		$rapierWorld.createCollider(colliderDesc, physicsBody)
	}

	onClick(() => {
		// On Click
		if (
			$raycaster &&
			$raycaster.intersectObject(mesh, false).length > 0 &&
			$raycaster.intersectObject(mesh, false)[0].object.uuid === mesh.uuid
		) {
			activeProject.set(project.slug)
			physicsBody?.applyImpulse({ x: 0, y: 0, z: -impulseForce }, true)
			goto(`/${project.slug}`)
		}
	})

	onFrame(() => {
		if ($rapier && $rapierWorld && physicsBody) {
			const position = physicsBody.translation()
			const rotation = physicsBody.rotation()

			mesh.position.set(position.x, position.y, position.z)
			mesh.rotation.setFromQuaternion(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))

			if (isActiveProject) {
				activeProjectPosition.set(new Vector3(position.x, position.y, position.z))
			}
		}
	})

	$: if (parent) {
		parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
