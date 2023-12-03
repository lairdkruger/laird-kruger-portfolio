<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import { BoxGeometry, MeshBasicMaterial, type Group, Mesh, Color, BackSide } from 'three'

	export let parent: Group

	const { rapier, rapierWorld } = getWebglContext()

	const size = 10

	const geometry = new BoxGeometry(size, size, size)
	const materialColor = new Color(0x000000)
	const material = new MeshBasicMaterial({
		color: materialColor,
		transparent: true,
		opacity: 0,
		side: BackSide
	})
	const mesh = new Mesh(geometry, material)

	let floorPhysicsBody: RigidBody | null = null
	let ceilingPhysicsBody: RigidBody | null = null
	let leftWallPhysicsBody: RigidBody | null = null
	let rightWallPhysicsBody: RigidBody | null = null
	let frontWallPhysicsBody: RigidBody | null = null
	let backWallPhysicsBody: RigidBody | null = null

	const friction = 0
	const safetyOverlap = 0.5

	$: if ($rapier && $rapierWorld) {
		const physicsBodySize = size / 2 + safetyOverlap
		const thickness = 0.1

		// Floor
		const floorRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, -size / 2, 0)
		floorPhysicsBody = $rapierWorld.createRigidBody(floorRigidBodyDesc)
		const floorColliderDesc = $rapier.ColliderDesc.cuboid(
			physicsBodySize,
			thickness,
			physicsBodySize
		).setFriction(friction)
		$rapierWorld.createCollider(floorColliderDesc, floorPhysicsBody)

		// Ceiling
		const ceilingRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, size / 2, 0)
		ceilingPhysicsBody = $rapierWorld.createRigidBody(ceilingRigidBodyDesc)
		const ceilingColliderDesc = $rapier.ColliderDesc.cuboid(
			physicsBodySize,
			thickness,
			physicsBodySize
		).setFriction(friction)
		$rapierWorld.createCollider(ceilingColliderDesc, ceilingPhysicsBody)

		// Left Wall
		const leftWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(-size / 2, 0, 0)
		leftWallPhysicsBody = $rapierWorld.createRigidBody(leftWallRigidBodyDesc)
		const leftWallColliderDesc = $rapier.ColliderDesc.cuboid(
			thickness,
			physicsBodySize,
			physicsBodySize
		).setFriction(friction)
		$rapierWorld.createCollider(leftWallColliderDesc, leftWallPhysicsBody)

		// Right Wall
		const rightWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(size / 2, 0, 0)
		rightWallPhysicsBody = $rapierWorld.createRigidBody(rightWallRigidBodyDesc)
		const rightWallColliderDesc = $rapier.ColliderDesc.cuboid(
			thickness,
			physicsBodySize,
			physicsBodySize
		).setFriction(friction)
		$rapierWorld.createCollider(rightWallColliderDesc, rightWallPhysicsBody)

		// Front Wall
		const frontWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, 0, -size / 2)
		frontWallPhysicsBody = $rapierWorld.createRigidBody(frontWallRigidBodyDesc)
		const frontWallColliderDesc = $rapier.ColliderDesc.cuboid(
			physicsBodySize,
			physicsBodySize,
			thickness
		).setFriction(friction)
		$rapierWorld.createCollider(frontWallColliderDesc, frontWallPhysicsBody)

		// Back Wall
		const backWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, 0, size / 2)
		backWallPhysicsBody = $rapierWorld.createRigidBody(backWallRigidBodyDesc)
		const backWallColliderDesc = $rapier.ColliderDesc.cuboid(
			physicsBodySize,
			physicsBodySize,
			thickness
		).setFriction(friction)
		$rapierWorld.createCollider(backWallColliderDesc, backWallPhysicsBody)
	}

	$: if (parent) {
		parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
