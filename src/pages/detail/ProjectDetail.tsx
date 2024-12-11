import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjectDetailById } from '../../supabase/api/detailService';
import { MyProject } from '../../types/supabase';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Wrap = styled.div`
    width: var(--default-width);
    height: 100%;
    margin: 0 auto;
    min-height: 100vh;
    padding: 7rem 0 4.2rem 0;
`;
const TitleBox = styled.h1`
    font-size: var(--font-text-large);
    font-weight: var(--font-weight-bold);
    padding: 1.5rem 0;
`;

const BackButton = styled.button`
    border: none;
    border-radius: 4px;
    padding: 0;
    width: 42px;
    height: 42px;
    background-image: url('/public/back.webp');
    background-size: cover;
    background-position: center;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;

const MarkdownContainer = styled.div`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.5;

    h2,
    h3 {
        color: #333;
    }
    p {
        margin: 0.5rem 0;
    }

    strong {
        color: #10b27e;
        font-weight: 500;
    }

    a {
        border: none;
        border-radius: var(--default-radius-small);
        padding: 5px 10px;
        font-size: var(--font-text-small);
        cursor: pointer;
        background-color: #3ec6a0;
        color: white;
        &:hover {
            background-color: #23c38b;
        }
    }
`;

const InfoText = styled.dl`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;

    dt {
        font-weight: var(--font-weight-bold);
    }
`;

const ProjectDetail: React.FC = () => {
    const [project, setProject] = useState<MyProject | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // '\n' 변환 함수
    const cleanMarkdown = (text: string) => {
        return text.replace(/\\n/g, '\n');
    };

    useEffect(() => {
        const loadProjectDetail = async () => {
            if (id) {
                const projectData = await fetchProjectDetailById(id);
                if (projectData) {
                    setProject(projectData);
                } else {
                    setProject(null);
                }
                setLoading(false);
            }
        };

        loadProjectDetail();
    }, [id]);

    if (loading) {
        return <div>loading...</div>;
    }

    if (!project) {
        return <div>프로젝트를 찾을 수 없어요</div>;
    }

    const handleBackClick = () => {
        if (window.history.length > 1 && location.pathname !== '/') {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <Wrap>
            <BackButton onClick={handleBackClick}></BackButton>

            <section>
                <TitleBox>{project.title}</TitleBox>
                <MarkdownContainer>
                    <ReactMarkdown>{cleanMarkdown(project.reason_created || '')}</ReactMarkdown>
                </MarkdownContainer>
                <TitleBox>주요 정보 및 링크 정보</TitleBox>
                <MarkdownContainer>
                    <InfoText>
                        <dt>기간</dt>
                        <dd>
                            {project.start_date} ~ {project.end_date}
                        </dd>
                    </InfoText>
                    <InfoText>
                        <dt>주요 기능</dt>
                        <dd> {project.features}</dd>
                    </InfoText>
                    <InfoText>
                        <dt>주요 기술</dt>
                        <dd> {project.technologies}</dd>
                    </InfoText>
                    <InfoText>
                        <dt>기여도</dt>
                        <dd> {project.part}%</dd>
                    </InfoText>
                    <InfoText>
                        <dt>깃허브</dt>
                        <dd>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                깃허브 URL
                            </a>
                        </dd>
                    </InfoText>
                    <InfoText>
                        <dt>URL</dt>
                        <dd>
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                배포 URL
                            </a>
                        </dd>
                    </InfoText>
                </MarkdownContainer>
                <TitleBox>트러블슈팅</TitleBox>
                <MarkdownContainer>
                    <ReactMarkdown>{cleanMarkdown(project.trouble_shooting || '')}</ReactMarkdown>
                </MarkdownContainer>
                <TitleBox>프로젝트 기록</TitleBox>
                <MarkdownContainer>
                    <InfoText>
                        <a
                            href="https://velog.io/@leeboa2003/Axios-%EC%82%AC%EC%9A%A9%EB%B2%95"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Axios 사용법
                        </a>
                        <a
                            href="https://velog.io/@leeboa2003/React-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%EC%8B%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C-%EC%9C%A0%EC%A7%80"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            자세한 트러블슈팅
                        </a>
                        <a
                            href="https://velog.io/@leeboa2003/%EA%B0%80%EA%B3%84%EB%B6%80-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Hello-Money"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            관련 기록
                        </a>
                    </InfoText>
                </MarkdownContainer>
            </section>
        </Wrap>
    );
};

export default ProjectDetail;
