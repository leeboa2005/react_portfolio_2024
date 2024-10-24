import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.p`
    font-family: 'Exo 2', sans-serif;
    font-weight: 400;
    line-height: 1.4;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 30px;
    gap: 10px;
`;

const SubIcon = styled.img`
    width: 23px;
    height: 23px;
`;

const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-weight: 700;
    font-size: 136px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const TitleSectionContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
`;

const TitleSection: React.FC = () => {
    return (
        <TitleSectionContainer>
            <SubTitle>
                <SubIcon src="/home/main_sub.png" alt="서브 타이틀 앞 아이콘" />
                Front-end Developer PortFolio
                <SubIcon src="/home/main_sub.png" alt="서브 타이틀 뒤 아이콘" />
            </SubTitle>
            <Title>
                <span>BOA</span>
                <LogoImage src="/title_logo.png" alt="타이틀 로고" />
                <span>LEE</span>
            </Title>
        </TitleSectionContainer>
    );
};

export default TitleSection;
