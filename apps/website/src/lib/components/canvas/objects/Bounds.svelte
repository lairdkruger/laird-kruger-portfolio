<script lang="ts">
	import { getWebglContext } from '$lib/contexts/webgl'
	import { pageTheme } from '$lib/stores/ui'
	import type { RigidBody } from '@dimforge/rapier3d'
	import { onDestroy } from 'svelte'
	import { BoxGeometry, MeshBasicMaterial, type Group, Mesh, Color, BackSide } from 'three'

	export let parent: Group

	const { rapier, rapierWorld } = getWebglContext()

	const size = [10, 10, 10]

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

	$: if ($rapier && $rapierWorld) {
		const wallThickness = 0.1

		// Floor
		const floorRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(0, -size[1] / 2, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		floorPhysicsBody = $rapierWorld.createRigidBody(floorRigidBodyDesc)
		const floorColliderDesc = $rapier.ColliderDesc.cuboid(
			size[0],
			wallThickness,
			size[2]
		).setFriction(friction)
		$rapierWorld.createCollider(floorColliderDesc, floorPhysicsBody)

		// Ceiling
		const ceilingRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(0, size[1] / 2, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		ceilingPhysicsBody = $rapierWorld.createRigidBody(ceilingRigidBodyDesc)
		const ceilingColliderDesc = $rapier.ColliderDesc.cuboid(
			size[0],
			wallThickness,
			size[2]
		).setFriction(friction)
		$rapierWorld.createCollider(ceilingColliderDesc, ceilingPhysicsBody)

		// Left Wall
		const leftWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(-size[0] / 2, 0, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		leftWallPhysicsBody = $rapierWorld.createRigidBody(leftWallRigidBodyDesc)
		const leftWallColliderDesc = $rapier.ColliderDesc.cuboid(
			wallThickness,
			size[1],
			size[2]
		).setFriction(friction)
		$rapierWorld.createCollider(leftWallColliderDesc, leftWallPhysicsBody)

		// Right Wall
		const rightWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(size[0] / 2, 0, 0)
			.setCanSleep(false)
			.setCcdEnabled(true)
		rightWallPhysicsBody = $rapierWorld.createRigidBody(rightWallRigidBodyDesc)
		const rightWallColliderDesc = $rapier.ColliderDesc.cuboid(
			wallThickness,
			size[1],
			size[2]
		).setFriction(friction)
		$rapierWorld.createCollider(rightWallColliderDesc, rightWallPhysicsBody)

		// Front Wall
		const frontWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(0, 0, -size[2] / 2)
			.setCanSleep(false)
			.setCcdEnabled(true)
		frontWallPhysicsBody = $rapierWorld.createRigidBody(frontWallRigidBodyDesc)
		const frontWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size[0],
			size[1],
			wallThickness
		).setFriction(friction)
		$rapierWorld.createCollider(frontWallColliderDesc, frontWallPhysicsBody)

		// Back Wall
		const backWallRigidBodyDesc = $rapier.RigidBodyDesc.fixed()
			.setTranslation(0, 0, size[2] / 2)
			.setCanSleep(false)
			.setCcdEnabled(true)
		backWallPhysicsBody = $rapierWorld.createRigidBody(backWallRigidBodyDesc)
		const backWallColliderDesc = $rapier.ColliderDesc.cuboid(
			size[0],
			size[1],
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
		parent.add(mesh)
	}

	onDestroy(() => {
		parent.remove(mesh)
	})
</script>
