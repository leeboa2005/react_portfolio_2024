import React, { useState } from 'react';
import styled from 'styled-components';

const EmptyState = styled.div`
    text-align: center;
    padding: 6rem 0;
    color: var(--font-gray-color);
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.6rem 1.6rem;
    margin-bottom: 3.2rem;
`;

const GridItem = styled.div`
    width: 100%;
    height: 100%;
    h3 {
        font-family: var(--font-default-eng);
        font-size: var(--font-text-large);
        padding: 1rem 0;
    }
    p {
        color: var(--font-gray-color);
        font-size: var(--font-text-small);
    }
`;

const ProjectImageContainer = styled.div`
    position: relative;
    width: 100%;
    border-radius: var(--default-radius);
    overflow: hidden;
    cursor: pointer;
`;

const StaticImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const GifImage = styled.img`
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

interface GridContentProps {
    activeTab: string;
    contentData: {
        [key: string]: {
            title: string;
            description: string;
            image: string;
            staticImage: string;
            techs: string[];
            link: string;
        }[];
    };
    selectedTechs: string[];
}

const GridContent: React.FC<GridContentProps> = ({ activeTab, contentData, selectedTechs }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const filteredContent =
        contentData[activeTab]?.filter((item) => {
            if (selectedTechs.length === 0) return true;
            return item.techs.some((tech) =>
                selectedTechs.some((selectedTech) => selectedTech.toLowerCase() === tech.toLowerCase())
            );
        }) || [];

    return (
        <>
            <GridContainer>
                {filteredContent.length > 0 ? (
                    filteredContent.map((item, index) => (
                        <GridItem
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ProjectImageContainer>
                                    <StaticImage src={item.staticImage} alt={`${item.title} PNG`} />
                                    {activeTab === 'personal' && (
                                        <GifImage
                                            src={item.image}
                                            alt={`${item.title} GIF`}
                                            style={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                            }}
                                        />
                                    )}
                                </ProjectImageContainer>
                            </a>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <h3>{item.title}</h3>
                            </a>
                            <p>{item.description}</p>
                        </GridItem>
                    ))
                ) : (
                    <EmptyState>아직 제작한 프로젝트가 없습니다.🫥</EmptyState>
                )}
            </GridContainer>
        </>
    );
};

export default GridContent;
