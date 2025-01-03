import styled from 'styled-components';
import GlobalStyle from '../assets/styles/GlobalStyle';
import GithubBtn from '../components/Common/GithubBtn';
import Intro from '../components/About/Intro';
import SelfIntroduction from '../components/About/SelfIntroduction';
import Skills from '../components/About/Skills';

const AboutWrap = styled.section`
    width: 100%;
    height: auto;
    position: relative;
    overflow-x: hidden;
`;

const AboutContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    position: relative;
`;

const About: React.FC = () => {
    return (
        <AboutWrap>
            <GlobalStyle />
            <GithubBtn />
            <AboutContainer>
                <Intro />
                <SelfIntroduction />
                <Skills />
            </AboutContainer>
        </AboutWrap>
    );
};

export default About;
