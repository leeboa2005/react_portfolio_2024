import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoWrapper = styled.div`
    width: 92%;
    height: 45rem;
    margin: 6rem auto 11rem;
    border-radius: 1rem;
    overflow: hidden;
    background: #000;
    transition: width 0.3s ease, height 0.3s ease;
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const VideoSection: React.FC = () => {
    const videoRef = useRef<HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoEl = videoElementRef.current;
        const wrapperEl = videoRef.current;

        if (!videoEl || !wrapperEl) return;

        const adjustVideoSize = () => {
            const naturalAspectRatio = videoEl.videoWidth / videoEl.videoHeight;
            const containerWidth = window.innerWidth * 0.9;
            const newHeight = containerWidth / naturalAspectRatio;

            wrapperEl.style.height = `${newHeight}px`;
        };

        const trigger = ScrollTrigger.create({
            trigger: wrapperEl,
            start: 'top center',
            end: 'bottom center+=200',
            scrub: 2,
            onUpdate: (self) => {
                if (wrapperEl) {
                    const width = self.progress < 0.5 ? '92%' : '100%';
                    wrapperEl.style.width = width;

                    const videoEl = videoElementRef.current;
                    if (videoEl) {
                        const naturalAspectRatio = videoEl.videoWidth / videoEl.videoHeight;
                        const containerWidth = window.innerWidth * (self.progress < 0.5 ? 0.9 : 1);
                        const newHeight = containerWidth / naturalAspectRatio;
                        wrapperEl.style.height = `${newHeight}px`;
                    }
                }
            },
            onLeave: () => {
                if (wrapperEl) {
                    wrapperEl.style.width = '92%';
                    adjustVideoSize();
                }
            },
            onEnterBack: () => {
                if (wrapperEl) {
                    wrapperEl.style.width = '92%';
                    adjustVideoSize();
                }
            },
        });

        videoEl.addEventListener('loadedmetadata', adjustVideoSize);
        window.addEventListener('resize', adjustVideoSize);

        return () => {
            trigger.kill();
            videoEl.removeEventListener('loadedmetadata', adjustVideoSize);
            window.removeEventListener('resize', adjustVideoSize);
        };
    }, []);

    return (
        <VideoWrapper ref={videoRef}>
            <video
                ref={videoElementRef}
                src="/public/home/main_video_2.mp4
            "
                muted
                autoPlay
                loop
            ></video>
        </VideoWrapper>
    );
};

export default VideoSection;
