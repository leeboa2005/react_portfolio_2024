import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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
        margin-right: 0.5rem;
        &:hover {
            background-color: #10b27e;
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

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    div {
        display: flex;
        gap: 0.5rem;
    }
`;

const NoProjectText = styled.span`
    font-size: var(--font-text);
    text-align: center;
`;

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
`;

const AnimatedEmoji = styled.div`
    font-size: var(--font-text);
    animation: ${bounce} 1.5s infinite;
    text-align: center;
`;

const ProjectDetail: React.FC = () => {
    const [project, setProject] = useState<MyProject | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isWorkProject = (projectId?: string | null): boolean => {
        return projectId === 'work';
    };

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

        window.scrollTo(0, 0);
        loadProjectDetail();
    }, [id]);

    if (loading) {
        return (
            <LoadingContainer>
                <img src="/src/assets/svg/loading.svg" alt="로딩 중" />
            </LoadingContainer>
        );
    }
    if (!project) {
        return (
            <LoadingContainer>
                <div>
                    <NoProjectText>프로젝트를 찾을 수 없어요</NoProjectText>
                    <AnimatedEmoji>🥹</AnimatedEmoji>
                </div>
            </LoadingContainer>
        );
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

                {project.reason_created && (
                    <MarkdownContainer>
                        <ReactMarkdown>{cleanMarkdown(project.reason_created)}</ReactMarkdown>
                    </MarkdownContainer>
                )}
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
                        <dd>{project.features}</dd>
                    </InfoText>
                    <InfoText>
                        <dt>주요 기술</dt>
                        <dd>{project.technologies}</dd>
                    </InfoText>
                    <InfoText>
                        <dt>기여도</dt>
                        <dd>{project.part}%</dd>
                    </InfoText>

                    {/* 깃허브 링크 (Personal, Team) */}
                    {!isWorkProject(project.id) && project.github && (
                        <InfoText>
                            <dt>깃허브</dt>
                            <dd>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    깃허브 URL
                                </a>
                            </dd>
                        </InfoText>
                    )}

                    {project.url && (
                        <InfoText>
                            <dt>URL</dt>
                            <dd>
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    배포 URL
                                </a>
                            </dd>
                        </InfoText>
                    )}
                </MarkdownContainer>
                {/* 트러블슈팅 섹션 (Personal, Team) */}
                {!isWorkProject(project.id) && project.trouble_shooting && (
                    <>
                        <TitleBox>트러블슈팅</TitleBox>
                        <MarkdownContainer>
                            <ReactMarkdown>{cleanMarkdown(project.trouble_shooting)}</ReactMarkdown>
                        </MarkdownContainer>
                    </>
                )}
                {/* 프로젝트 기록 섹션 (Personal, Team) */}
                {!isWorkProject(project.id) && project.more && (
                    <>
                        <TitleBox>프로젝트 기록</TitleBox>
                        <MarkdownContainer>
                            <ReactMarkdown>{cleanMarkdown(project.more)}</ReactMarkdown>
                        </MarkdownContainer>
                    </>
                )}
            </section>
        </Wrap>
    );
};

export default ProjectDetail;
