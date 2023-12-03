<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import { BoxGeometry, MeshBasicMaterial, type Group, Mesh, Color, BackSide } from 'three'

	export let parent: Group

	const { rapier, rapierWorld } = getWebglContext()

	const size = 5

	const geometry = new BoxGeometry(size, size, size)
	const materialColor = new Color(0xffffff)
	const material = new MeshBasicMaterial({
		color: materialColor,
		transparent: false,
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

	$: if ($rapier && $rapierWorld) {
		// Floor
		const floorRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, -size, 0)
		floorPhysicsBody = $rapierWorld.createRigidBody(floorRigidBodyDesc)
		const floorColliderDesc = $rapier.ColliderDesc.cuboid(size / 2, size / 2, size / 2).setFriction(0)
		$rapierWorld.createCollider(floorColliderDesc, floorPhysicsBody)

		// Ceiling
		const ceilingRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, size, 0)
		ceilingPhysicsBody = $rapierWorld.createRigidBody(ceilingRigidBodyDesc)
		const ceilingColliderDesc = $rapier.ColliderDesc.cuboid(size / 2, size / 2, size / 2).setFriction(
			0
		)
		$rapierWorld.createCollider(ceilingColliderDesc, ceilingPhysicsBody)

		// Left Wall
		const leftWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(-size, 0, 0)
		leftWallPhysicsBody = $rapierWorld.createRigidBody(leftWallRigidBodyDesc)
		const leftWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size / 2,
			size / 2,
			size / 2
		).setFriction(0)
		$rapierWorld.createCollider(leftWallColliderDesc, leftWallPhysicsBody)

		// Right Wall
		const rightWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(size, 0, 0)
		rightWallPhysicsBody = $rapierWorld.createRigidBody(rightWallRigidBodyDesc)
		const rightWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size / 2,
			size / 2,
			size / 2
		).setFriction(0)
		$rapierWorld.createCollider(rightWallColliderDesc, rightWallPhysicsBody)

		// Front Wall
		const frontWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, 0, -size)
		frontWallPhysicsBody = $rapierWorld.createRigidBody(frontWallRigidBodyDesc)
		const frontWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size / 2,
			size / 2,
			size / 2
		).setFriction(0)
		$rapierWorld.createCollider(frontWallColliderDesc, frontWallPhysicsBody)

		// Back Wall
		const backWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed().setTranslation(0, 0, size)
		backWallPhysicsBody = $rapierWorld.createRigidBody(backWallRigidBodyDesc)
		const backWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size / 2,
			size / 2,
			size / 2
		).setFriction(0)
		$rapierWorld.createCollider(backWallColliderDesc, backWallPhysicsBody)
	}

	$: if (parent) {
		parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
