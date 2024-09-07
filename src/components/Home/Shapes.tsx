import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const ShapeImage = styled.img`
    position: absolute;
    opacity: 0;
    object-fit: cover;
`;

interface ShapeProps {
    shapes: {
        src: string;
        top: string;
        left: string;
        width: string;
        height: string;
    }[];
    shapesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
    onShapesComplete: () => void;
}

const Shapes: React.FC<ShapeProps> = ({ shapes, shapesRef, onShapesComplete }) => {
    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onShapesComplete,
        });

        // 이미지 애니메이션 설정
        tl.to(shapesRef.current, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
        });

        // 부유 애니메이션
        shapesRef.current.forEach((shape) => {
            gsap.to(shape, {
                y: '-=10',
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'power1.inOut',
            });
        });
    }, [shapesRef, onShapesComplete]);

    return (
        <>
            {shapes.map((shape, index) => (
                <ShapeImage
                    key={index}
                    ref={(el) => (shapesRef.current[index] = el)}
                    src={shape.src}
                    style={{
                        top: shape.top,
                        left: shape.left,
                        width: shape.width,
                        height: shape.height,
                    }}
                    alt={`Shape ${index + 1}`}
                />
            ))}
        </>
    );
};

export default Shapes;
