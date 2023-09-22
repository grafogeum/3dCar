import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car({ switchCar }) {
	switchCar = {
		car1: "/models/bmw/scene.gltf",
		car2: "/models/car/scene.gltf",
	};
	const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + switchCar.car2);

	useEffect(() => {
		gltf.scene.scale.set(0.004, 0.004, 0.004);
		gltf.scene.position.set(0, 0, 0);
		gltf.scene.traverse((object) => {
			if (object instanceof Mesh) {
				object.castShadow = true;
				object.receiveShadow = true;
				object.material.envMapIntensity = 20;
			}
		});
	}, [gltf]);

	useFrame((state, delta) => {
		let t = state.clock.getElapsedTime() * 2;

		let group = gltf.scene.children[0].children[0].children[0];
		group.children[0].rotation.x = t;
		group.children[2].rotation.x = t;
		group.children[4].rotation.x = t;
		group.children[6].rotation.x = t;
	});

	return <primitive object={gltf.scene} />;
}
