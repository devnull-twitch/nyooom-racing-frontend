import { Canvas, useFrame } from '@react-three/fiber';
import { ForwardedModel as TrophyModel } from './models/trophy/Nyooom_trophy';
import React, { useRef } from 'react';
import { useState } from 'react';

const TrophyWrapper = () => {
    const ref = useRef();

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta;
        }
    });

    return <TrophyModel position={[0, 0, 4]} ref={ref} />;
};

export const Background = () => {
    return (
        <div style={{ position: 'fixed', left: '75%', width: '25vw', height: '100vh', overflow: 'hidden', zIndex: -1 }}>
            <Canvas>
                <ambientLight intensity={0.3} />
                <spotLight position={[0, 0, 10]} angle={0.1} penumbra={1} />
                <TrophyWrapper />
            </Canvas>
        </div>
    );
};

export default Background;