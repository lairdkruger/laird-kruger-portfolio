<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { pageTheme } from '$lib/stores/ui'
	import type { RigidBody } from '@dimforge/rapier3d-compat'
	import RAPIER from '@dimforge/rapier3d-compat'
	import { onDestroy } from 'svelte'
	import { BoxGeometry, MeshBasicMaterial, type Group, Mesh, Color, BackSide, Vector3 } from 'three'

	export let parent: Group
	export let size: Vector3

	const { rapierWorld } = getWebglContext()

	const geometry = new BoxGeometry(...size)
	const materialColor = new Color(0xffffff)
	const material = new MeshBasicMaterial({
		color: materialColor,
		transparent: true,
		opacity: 1,
		side: BackSide,
		wireframe: true
	})
	const mesh = new Mesh(geometry, material)

	let floorPhysicsBody: RigidBody | null = null
	let ceilingPhysicsBody: RigidBody | null = null
	let leftWallPhysicsBody: RigidBody | null = null
	let rightWallPhysicsBody: RigidBody | null = null
	let frontWallPhysicsBody: RigidBody | null = null
	let backWallPhysicsBody: RigidBody | null = null

	const friction = 0

	$: if ($rapierWorld) {
		const wallThickness = 0.1

		// Floor
		const floorRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(0, -size.y / 2, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		floorPhysicsBody = $rapierWorld.createRigidBody(floorRigidBodyDesc)
		const floorColliderDesc = RAPIER.ColliderDesc.cuboid(size.x, wallThickness, size.z).setFriction(
			friction
		)
		$rapierWorld.createCollider(floorColliderDesc, floorPhysicsBody)

		// Ceiling
		const ceilingRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(0, size.y / 2, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		ceilingPhysicsBody = $rapierWorld.createRigidBody(ceilingRigidBodyDesc)
		const ceilingColliderDesc = RAPIER.ColliderDesc.cuboid(size.x, wallThickness, size.z).setFriction(
			friction
		)
		$rapierWorld.createCollider(ceilingColliderDesc, ceilingPhysicsBody)

		// Left Wall
		const leftWallRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(-size.x / 2, 0, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		leftWallPhysicsBody = $rapierWorld.createRigidBody(leftWallRigidBodyDesc)
		const leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(
			wallThickness,
			size.y,
			size.z
		).setFriction(friction)
		$rapierWorld.createCollider(leftWallColliderDesc, leftWallPhysicsBody)

		// Right Wall
		const rightWallRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(size.x / 2, 0, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		rightWallPhysicsBody = $rapierWorld.createRigidBody(rightWallRigidBodyDesc)
		const rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(
			wallThickness,
			size.y,
			size.z
		).setFriction(friction)
		$rapierWorld.createCollider(rightWallColliderDesc, rightWallPhysicsBody)

		// Front Wall
		const frontWallRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(0, 0, -size.z / 2)
			.setCanSleep(false)
			.setCcdEnabled(true)
		frontWallPhysicsBody = $rapierWorld.createRigidBody(frontWallRigidBodyDesc)
		const frontWallColliderDesc = RAPIER.ColliderDesc.cuboid(
			size.x,
			size.y,
			wallThickness
		).setFriction(friction)
		$rapierWorld.createCollider(frontWallColliderDesc, frontWallPhysicsBody)

		// Back Wall
		const backWallRigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
			.setTranslation(0, 0, size.z / 2)
			.setCanSleep(false)
			.setCcdEnabled(true)
		backWallPhysicsBody = $rapierWorld.createRigidBody(backWallRigidBodyDesc)
		const backWallColliderDesc = RAPIER.ColliderDesc.cuboid(
			size.x,
			size.y,
			wallThickness
		).setFriction(friction)
		$rapierWorld.createCollider(backWallColliderDesc, backWallPhysicsBody)
	}

	$: if ($pageTheme === 'dark') {
		mesh.material.color.set(0xffffff)
		material.needsUpdate = true
	} else {
		mesh.material.color.set(0x000000)
		material.needsUpdate = true
	}

	$: if (parent) {
		if (!parent.children.includes(mesh)) parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
