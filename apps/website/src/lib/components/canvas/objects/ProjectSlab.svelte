<script lang="ts">
	import { goto } from '$app/navigation'
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { ContentBlock } from '$lib/data/blocks'
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
	import { motionDefault } from '$lib/styles/motion'
	import type { RigidBody } from '@dimforge/rapier3d-compat'
	import RAPIER from '@dimforge/rapier3d-compat'
	import { onDestroy } from 'svelte'
	import { tweened } from 'svelte/motion'
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
		LineSegments
	} from 'three'

	export let index: number
	export let count: number
	export let parent: Group
	export let position: Vector3 = new Vector3(0, 0, 0)
	export let rotation: Vector3 = new Vector3(0, 0, 0)
	export let contentBlock: ContentBlock

	const loadedTimeline = tweened(0, { ...motionDefault, delay: (count - index) * 70 })

	const { rapierWorld, onFrame, raycaster, onClick } = getWebglContext()

	const geometry = new BoxGeometry(...slabSize)
	const material = new MeshBasicMaterial({ transparent: true })
	const mesh = new Mesh(geometry, material)

	// Edges
	const edgesGeometry = new EdgesGeometry(mesh.geometry) // or WireframeGeometry
	const materialGeometry = new LineBasicMaterial({ color: 0xffffff })
	const edges = new LineSegments(edgesGeometry, materialGeometry)
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
		loadedTimeline.set(1)
	}

	// Texture effects
	$: if (isActiveProject) {
		material.opacity = 1
	} else if ($activeProjectType === 'information' && $userHasInteracted) {
		material.opacity = 1
	} else if ($userHasInteracted) {
		material.opacity = $loadedTimeline * 0.4
	} else {
		material.opacity = $loadedTimeline * 0.75
	}

	// Physics
	let physicsBody: RigidBody | null = null

	$: if ($rapierWorld) {
		const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setRotation(rotationQuaternion)
			.setAdditionalMass(defaultMass)
			.setCanSleep(false)
			.setGravityScale(0)

		physicsBody = $rapierWorld.createRigidBody(rigidBodyDesc)

		const colliderDesc = RAPIER.ColliderDesc.cuboid(slabSize[0] / 2, slabSize[1] / 2, slabSize[2] / 2)
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
		if ($activeProjectType === 'project') {
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
		// Sync mesh to physics
		if ($rapierWorld && physicsBody) {
			const position = physicsBody.translation()
			const rotation = physicsBody.rotation()

			mesh.position.set(position.x, position.y, position.z)
			mesh.rotation.setFromQuaternion(new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))

			// Track active project position for connector lines
			if (isActiveProject) {
				activeProjectPosition.set(new Vector3(position.x, position.y, position.z))
			}
		}
	})

	$: if (parent) {
		if (!parent.children.includes(mesh)) parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
