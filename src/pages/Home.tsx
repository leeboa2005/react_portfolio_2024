import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../assets/styles/GlobalStyle';
import GithubBtn from '../components/Common/GithubBtn';
import TitleSection from '../components/Home/TitleSection';
import VideoSection from '../components/Home/VideoSection';
import OverviewSection from '../components/Home/OverviewSection';

const HomeWrap = styled.section`
    width: 100%;
    height: auto;
    position: relative;
    overflow-x: hidden;
`;

const ContentWrap = styled.section`
    width: 100%;
    min-height: 100vh;
    margin-top: 4vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <HomeWrap>
                <GithubBtn />
                <ContentWrap>
                    <TitleSection />
                    <VideoSection />
                    <OverviewSection />
                </ContentWrap>
            </HomeWrap>
        </>
    );
};

export default Home;
