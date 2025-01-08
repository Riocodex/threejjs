
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'

import Shirt from './Shirt'
import CameraRig from './Camerarig'
import Backdrop from './Backdrop'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position:[0,0,0], fov:30}}//making the shirt bigger

      //working on te buffers
      gl={{preserveDrawingBuffer: true}}
      className='w-full-max-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5}/>
      <Environment preset='city'/>

      <CameraRig>
        <Backdrop/>
        <Center>
            <Shirt/>
          </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel