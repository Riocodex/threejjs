import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({ children }) => {
    const group = useRef()
    const snap = useSnapshot(state)

    useFrame((state,delta)=>{//this runs on every rendered frame

        //to make shirt responsive on all devices
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        //set thhe initial position of the model 
        let targetPosition = [-0.4,0,2]//best default positions imo
        //adjust positions depending on the device
        if (snap.intro){
            if(isBreakpoint) targetPosition = [0,0,2];
            if(isMobile) targetPosition = [0, 0.2, 2.5];
        }else{
            if(isMobile)targetPosition = [0,0,2.5]
            else targetPosition = [0,0,2]
        }

        //set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta)

          //set model rotation smoothly
    easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],//x ,y and z axis
        0.25,//smooth time
        delta 

    )
    })

  
  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig