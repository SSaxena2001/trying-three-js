import { useRef, useState } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'

function Box(props: MeshProps) {
	const meshRef = useRef<any>()
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)

	useFrame((state, delta) => (meshRef.current.rotation.x += delta))

	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			castShadow
			onClick={event => setActive(!active)}
			onPointerOver={event => setHover(true)}
			onPointerOut={event => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

type Props = Record<string, unknown>

const Scene = (props: Props) => {
	return (
		<>
			<ambientLight intensity={0.6} />
			<pointLight
				position={[10, 10, 10]}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<Box position={[-1.2, 0, 0]} />
			<Box position={[1.2, 0, 0]} />
		</>
	)
}

export default Scene
