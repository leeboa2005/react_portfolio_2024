import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProjectDetailById } from '../../supabase/api/detailService';
import { Portfolio } from '../../types/supabase';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Wrap = styled.div`
    width: var(--default-width);
    height: 100%;
    margin: 0 auto;
    min-height: 100vh;
    padding: 7rem 0 4.2rem 0;
`;

const BackButton = styled.button`
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    background-color: #007acc;
    color: white;
    &:hover {
        background-color: #005f99;
    }
`;

const MarkdownContainer = styled.div`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.5;

    h1,
    h2,
    h3 {
        color: #333;
    }
    h1 {
        font-size: var(--font-text-large);
    }
    p {
        margin: 10px 0;
    }

    strong {
        color: #007acc;
    }
`;

const InfoText = styled.p`
    margin: 5px 0;
    color: #555;
    font-size: 14px;
`;

const Dates = styled.div`
    margin-top: 15px;
    font-style: italic;
    color: #888;
    font-size: 13px;
`;

const ProjectDetail: React.FC = () => {
    const [project, setProject] = useState<Portfolio | null>(null);
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
            <BackButton onClick={handleBackClick}>뒤로가기</BackButton>

            <section>
                <MarkdownContainer>
                    <ReactMarkdown>{cleanMarkdown(project.reason_created || '')}</ReactMarkdown>
                </MarkdownContainer>
                <InfoText>{project.features}</InfoText>
                <InfoText>{project.technologies}</InfoText>
                <InfoText>{project.part}</InfoText>
                <InfoText>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.github}
                    </a>
                </InfoText>
                <InfoText>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.url}
                    </a>
                </InfoText>

                <Dates>
                    {project.start_date} ~ {project.end_date}
                </Dates>
            </section>
        </Wrap>
    );
};

export default ProjectDetail;
