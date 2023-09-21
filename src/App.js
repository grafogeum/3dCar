import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import {
	CubeCamera,
	EnvironmentMap,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import {
	Bloom,
	ChromaticAberration,
	Depth,
	DepthOfField,
	EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatingGrid } from "./FloatingGrid";

function CarShow() {
	return (
		<>
			<OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

			<PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

			<color args={[0, 0, 0]} attach="background" />

			{/* <CubeCamera resolution={256} frames={Infinity}>
				{(texture) => (
					<>
						<EnvironmentMap map={texture} />
						<Car />
					</>
				)}
			</CubeCamera> */}

			{/* <Rings />
			<Boxes /> */}
			<FloatingGrid />

			<spotLight
				color={[1, 0.65, 0.7]}
				intensity={220}
				angle={0.6}
				penumbra={0.5}
				position={[5, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>
			<spotLight
				color={[0.14, 0.5, 1]}
				intensity={220}
				angle={0.6}
				penumbra={0.5}
				position={[-5, 5, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>
			<spotLight
				color={[0.5, 0.5, 0.7]}
				intensity={70}
				angle={60}
				// distance={100}
				penumbra={0.1}
				position={[1, 1, 5]}
				castShadow
				shadow-bias={-0.0001}
			/>
			{/* <Ground /> */}

			<EffectComposer>
				<DepthOfField
					focusDistance={0.0035}
					focalLength={0.01}
					bokehScale={3}
					height={280}
				/>
				<Bloom
					blendFunction={BlendFunction.ADD}
					intensity={1.3} // bloom intensity
					width={300}
					height={300}
					kernelSize={5}
					luminanceThreshold={0.15}
					luminanceSmoothing={0.025}
				/>
				<ChromaticAberration
					blendFunction={BlendFunction.NORMAL} // blend mode
					offset={[0.001, 0.002]} // color offset
				/>
			</EffectComposer>
		</>
	);
}

function App() {
	return (
		<Suspense fallback={null}>
			TEST
			<Canvas shadows>
				<CarShow />
			</Canvas>
		</Suspense>
	);
}

export default App;
