<script lang="ts">
	import { goto } from '$app/navigation'
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { Project } from '$lib/data/projects'
	import {
		activeMass,
		bounce,
		defaultMass,
		friction,
		impulseForce,
		minimalMass,
		slabSize
	} from '$lib/stores/physics'
	import { activeProject, activeProjectPosition, activeProjectType } from '$lib/stores/projects'
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
		Color,
		CubeReflectionMapping
	} from 'three'

	export let parent: Group
	export let position: Vector3 = new Vector3(0, 0, 0)
	export let rotation: Vector3 = new Vector3(0, 0, 0)
	export let project: Project

	const { rapier, rapierWorld, onFrame, raycaster, onClick } = getWebglContext()

	const geometry = new BoxGeometry(...slabSize)
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
		material.envMap.mapping = CubeReflectionMapping
		material.needsUpdate = true
	}

	// Texture effect
	$: if (material.envMap) {
		if (isActiveProject) {
			material.color = new Color(0xffffff)
			material.envMap.anisotropy = 1
		} else {
			material.color = new Color(0x999999)
			material.envMap.anisotropy = 10
		}
	}

	// Physics
	let physicsBody: RigidBody | null = null

	$: if ($rapier && $rapierWorld) {
		const rigidBodyDesc = $rapier.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setRotation(rotationQuaternion)
			.setAdditionalMass(defaultMass)
			.setCanSleep(false)

		physicsBody = $rapierWorld.createRigidBody(rigidBodyDesc)

		const colliderDesc = $rapier.ColliderDesc.cuboid(
			slabSize[0] / 2,
			slabSize[1] / 2,
			slabSize[2] / 2
		)
			.setFriction(friction)
			.setRestitution(bounce)

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
			goto(`/projects/${project.slug}`)
		}
	})

	// Effects
	$: if (isActiveProject) {
		physicsBody?.setAdditionalMass(activeMass, true)
		physicsBody?.applyImpulse({ x: 0, y: 0, z: -impulseForce }, true)
	} else {
		physicsBody?.setAdditionalMass(defaultMass, true)
	}

	$: if ($activeProjectType === 'work') {
		physicsBody?.setGravityScale(0, true)
		physicsBody?.setAdditionalMass(activeMass, true)
		physicsBody?.applyImpulse({ x: 0, y: impulseForce, z: 0 }, true)
		mesh.material.wireframe = false
	} else {
		physicsBody?.setGravityScale(1, true)
		physicsBody?.setAdditionalMass(minimalMass, true)
		mesh.material.wireframe = true
	}

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