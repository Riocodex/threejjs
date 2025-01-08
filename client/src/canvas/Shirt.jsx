import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'


const Shirt = () => {
    const snap = useSnapshot(state)
    console.log(snap)
    const{nodes, materials}= useGLTF('/shirt_baked.glb')

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)

    //to add smooth colors
    useFrame((state, delta)=>easing.dampC(materials.lambert1.color,snap.color,0.25,delta))

    //this is to make sure the shirt updates because sometimes it doesnt..state is saved ina  variable and passed in the key so reacct renders te model whenever the state changes
    const stateString = JSON.stringify(snap)
  return (
    <group key={stateString}> 
        <mesh
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            dispose={null}
        >
            {/* checking if we have the texture and logo */}
            {snap.isFullTexture && (
                <Decal
                    position={[0,0,0]}
                    rotation={[0,0,0]}
                    scale={1}
                    map={fullTexture}
                />
            )}
             {snap.isLogoTexture && (
                <Decal
                    position={[0,0.04,0.15]}//best default position settings imo
                    rotation={[0,0,0]}
                    scale={0.15}
                    map={logoTexture}
                    // map-anisotropy={16}
                    depthTest={false}
                    depthWrite={true}
                />
            )}
            
        </mesh>
    </group>
  )
}

export default Shirt