import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

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

    @media only screen and (max-width: 734px) {
        width: 100%;
        grid-template-columns: repeat(1, 1fr);
        gap: 3.6rem 0;
    }
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

interface ContentItem {
    id: string;
    title: string;
    description: string;
    image: string;
    staticImage: string;
    techs: string[];
    link: string;
}

interface GridContentProps {
    activeTab: string;
    contentData: {
        [key: string]: ContentItem[];
    };
    selectedTechs: string[];
    techFilters: string[];
}

const GridContent: React.FC<GridContentProps> = ({ activeTab, contentData, selectedTechs, techFilters }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [preloadedGifs, setPreloadedGifs] = useState<Set<string>>(new Set());
    const location = useLocation();

    // GIF preload 함수
    const preloadGif = (gifSrc: string) => {
        if (!preloadedGifs.has(gifSrc) && gifSrc.endsWith('.gif')) {
            const img = new Image();
            img.onload = () => {
                setPreloadedGifs((prev) => new Set([...prev, gifSrc]));
            };
            img.src = gifSrc;
        }
    };

    const filteredContent = useMemo(() => {
        return (
            contentData[activeTab]?.filter((item) => {
                if (selectedTechs.length === 0) return true;

                const availableTechs = Array.from(
                    new Set(contentData[activeTab].flatMap((project) => project.techs))
                ).map((tech) => tech.toLowerCase().trim());

                const normalizedSelectedTechs = selectedTechs.map((tech) => tech.toLowerCase().trim());

                const availableFilters = techFilters
                    .filter((tech) => availableTechs.includes(tech.toLowerCase().trim()))
                    .map((tech) => tech.toLowerCase().trim());

                const allFiltersSelected =
                    availableFilters.length === normalizedSelectedTechs.length &&
                    availableFilters.every((filter) => normalizedSelectedTechs.includes(filter));

                if (allFiltersSelected) {
                    return true;
                }

                const normalizedItemTechs = item.techs.map((tech) => tech.toLowerCase().trim());

                const matchesOr = normalizedSelectedTechs.some((selectedTech) =>
                    normalizedItemTechs.includes(selectedTech)
                );

                const matchesAnd =
                    selectedTechs.length > 1 &&
                    normalizedSelectedTechs.every((selectedTech) => normalizedItemTechs.includes(selectedTech));

                return matchesOr && (selectedTechs.length === 1 || matchesAnd);
            }) || []
        );
    }, [activeTab, contentData, selectedTechs, techFilters]);

    // 현재 보이는 이미지들 preload
    useEffect(() => {
        filteredContent.forEach((item) => {
            const img = new Image();
            img.src = item.staticImage;
        });
    }, [filteredContent]);

    const handleMouseEnter = (index: number, item: ContentItem) => {
        setHoveredIndex(index);
        if (item.image.endsWith('.gif')) {
            preloadGif(item.image);
        }
    };

    return (
        <>
            <GridContainer>
                {filteredContent.length > 0 ? (
                    filteredContent.map((item, index) => (
                        <GridItem
                            key={item.id}
                            onMouseEnter={() => handleMouseEnter(index, item)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Link to={item.link} state={{ from: location.pathname }}>
                                <ProjectImageContainer>
                                    <StaticImage src={item.staticImage} alt={`${item.title} 이미지`} loading="lazy" />
                                    {item.image.endsWith('.gif') && (
                                        <GifImage
                                            src={item.image}
                                            alt={`${item.title} GIF`}
                                            style={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                            }}
                                        />
                                    )}
                                </ProjectImageContainer>
                            </Link>
                            <Link to={item.link} state={{ from: location.pathname }}>
                                <h3>{item.title}</h3>
                            </Link>
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
