<script lang="ts">
	import { goto } from '$app/navigation'
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { ContentBlock } from '$lib/data/projects'
	import {
		activeMass,
		antiGravityForce,
		bounce,
		defaultMass,
		friction,
		impulseForce,
		minimalMass,
		slabSize
	} from '$lib/stores/physics'
	import { activeProject, activeProjectPosition, activeProjectType } from '$lib/stores/projects'
	import { userHasInteracted } from '$lib/stores/ui'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import { writable } from 'svelte/store'
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
		CubeReflectionMapping,
		EdgesGeometry,
		LineBasicMaterial,
		LineSegments,
		Texture,
		CubeTexture
	} from 'three'

	export let parent: Group
	export let position: Vector3 = new Vector3(0, 0, 0)
	export let rotation: Vector3 = new Vector3(0, 0, 0)
	export let contentBlock: ContentBlock

	const { rapier, rapierWorld, onFrame, raycaster, onClick } = getWebglContext()

	const geometry = new BoxGeometry(...slabSize)
	const material = new MeshBasicMaterial({ transparent: true })
	const mesh = new Mesh(geometry, material)
	const texture = writable<CubeTexture | null>(null)

	// Edges
	var edgesGeometry = new EdgesGeometry(mesh.geometry) // or WireframeGeometry
	var materialGeometry = new LineBasicMaterial({ color: 0xffffff })
	var edges = new LineSegments(edgesGeometry, materialGeometry)
	mesh.add(edges)

	mesh.position.set(position.x, position.y, position.z)
	mesh.rotation.set(rotation.x, rotation.y, rotation.z)
	const rotationQuaternion = new Quaternion().setFromEuler(mesh.rotation)

	$: isActiveProject = $activeProject === contentBlock.slug

	// Texture
	$: if (typeof window !== 'undefined') {
		const cubeTexture = new CubeTextureLoader().load([
			`/textures/${contentBlock.texture}`,
			`/textures/${contentBlock.texture}`,
			`/textures/${contentBlock.texture}`,
			`/textures/${contentBlock.texture}`,
			`/textures/${contentBlock.texture}`,
			`/textures/${contentBlock.texture}`
		])

		material.envMap = cubeTexture
		material.envMap.minFilter = LinearMipMapLinearFilter
		material.envMap.mapping = CubeReflectionMapping
		material.needsUpdate = true
	}

	// Texture effect
	$: if (isActiveProject) {
		material.opacity = 1
	} else if ($activeProjectType === 'info' && $userHasInteracted) {
		material.opacity = 1
	} else {
		material.opacity = 0.4
	}

	// Physics
	let physicsBody: RigidBody | null = null

	$: if ($rapier && $rapierWorld) {
		const rigidBodyDesc = $rapier.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setRotation(rotationQuaternion)
			.setAdditionalMass(defaultMass)
			.setCanSleep(false)
			.setGravityScale(0)

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
			$raycaster?.intersectObjects(parent.children, false).length > 0 &&
			$raycaster?.intersectObjects(parent.children, false)[0].object.uuid === mesh.uuid
		) {
			activeProject.set(contentBlock.slug)
			goto(`/projects/${contentBlock.slug}`)
			physicsBody?.applyImpulse({ x: 0, y: 0, z: impulseForce }, true)
		}
	})

	// Effects
	$: if ($userHasInteracted) {
		if ($activeProjectType === 'work') {
			physicsBody?.setGravityScale(0, true)
			physicsBody?.setAdditionalMass(activeMass, true)
			physicsBody?.applyImpulse({ x: 0, y: antiGravityForce, z: 0 }, true)

			mesh.material.color = new Color(0xffffff)
			mesh.material.needsUpdate = true
		} else {
			physicsBody?.setGravityScale(1, true)
			physicsBody?.setAdditionalMass(minimalMass, true)
			mesh.material.color = new Color(0x000000)
			mesh.material.needsUpdate = true
		}
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
