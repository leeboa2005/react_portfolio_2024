import React from 'react';
import styled from 'styled-components';
import GithubBtn from '../components/Common/GithubBtn';
import GlobalStyle from '../assets/styles/GlobalStyle';

const HomeWrap = styled.section`
    width: 100%;
`;

const TitleSection = styled.div`
    margin-top: 100px;
    position: relative;
`;

const SubTitle = styled.p`
    font-family: 'Exo 2', sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 21px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.4;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-family: 'Exo 2', sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-size: 136px;
    line-height: 1.1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const LogoImage = styled.img`
    width: 91px;
    height: 91px;
`;

const Home: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GithubBtn />
                <TitleSection>
                    <SubTitle>
                        Front-end Developer
                        <br /> PortFolio
                    </SubTitle>
                    <Title>
                        <span>BOA</span>
                        <LogoImage src="/title_logo.png" alt="타이틀 로고" />
                        <span>LEE</span>
                    </Title>
                </TitleSection>
            </HomeWrap>
        </>
    );
};

export default Home;
