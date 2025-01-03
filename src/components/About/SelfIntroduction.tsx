import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SelfIntroWrap = styled.div`
    width: var(--default-width);
    margin: 0 auto;
    position: relative;
`;

const Line = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: black;
`;

const Content = styled.div`
    width: 100%;
`;

const TextBox = styled.dl`
    padding: 2rem 0;
    font-size: var(--font-text-large);
    word-break: keep-all;

    dt {
        font-size: 1rem;
        font-weight: var(--font-weight-thin);
        margin-bottom: 3rem;
        opacity: 0;
        transform: translateY(20px);
    }

    dd {
        font-size: var(--font-text);
        line-height: 1.4;
        opacity: 0;
        transform: translateY(20px);

        p {
            margin-bottom: 1rem;
        }
    }
`;

const SelfIntroduction: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const dtRef = useRef<HTMLDListElement>(null);
    const ddRef = useRef<HTMLDListElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 90%',
                end: 'bottom top',
                toggleActions: 'play none none none',
            },
        });

        tl.to(lineRef.current, {
            width: '100%',
            duration: 1.6,
            ease: 'power2.out',
        })
            .to(
                dtRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.5'
            )
            .to(ddRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            });
    }, []);

    return (
        <SelfIntroWrap>
            <Line ref={lineRef} />
            <Content>
                <TextBox>
                    <dt ref={dtRef}> 작은 시작, 큰 연결 </dt>
                    <dd ref={ddRef}>
                        <p>
                            모든 개인은 자신만의 특별한 추억과 경험을 가지고 있습니다. 단 한 사람도 같은 이야기를 가진
                            사람은 없듯, 각자의 특별함이 모여 더 나은 세상을 만들어갑니다. 저는 프론트엔드 개발자로서,
                            이러한 특별함이 기술을 통해 내일로 이어질 수 있는 서비스를 개발하고 싶습니다.
                        </p>
                        <p>
                            특히, 사용자와 상호작용하는 서비스의 매력을 극대화하고, 이를 통해 사용자 경험을 더 풍부하게
                            만드는 일에 깊은 흥미를 느낍니다. 각자의 역할에서 협력하며, '사용자들이 어떤 서비스를
                            원할까?' '어떤 경험이 특별하게 다가올까?'와 같은 질문들을 팀원들과 함께 고민합니다.
                        </p>
                        <p>
                            사용자 피드백을 바탕으로 기술을 개선하고, 테스트를 통해 성과를 확인하며, 부족한 부분은 다시
                            보완해 더 나은 결과를 만들어내고 싶습니다. 이렇게 사용자와 기업 모두가 만족할 수 있는
                            서비스를 만들어가는 데 기여하며, 의미 있는 결과를 함께 이루고 싶습니다.
                        </p>
                    </dd>
                </TextBox>
            </Content>
        </SelfIntroWrap>
    );
};

export default SelfIntroduction;
