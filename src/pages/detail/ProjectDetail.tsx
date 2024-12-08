import React, { useState, useEffect } from 'react';
import { fetchPortfolioDetails } from '../../supabase/api/detailService.ts';
import { Portfolio } from '../../types/supabase';

const ProjectDetail: React.FC = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPortfolios = async () => {
            const data = await fetchPortfolioDetails();
            setPortfolios(data);
            setLoading(false);
        };

        loadPortfolios();
    }, []);

    if (loading) {
        return <div>데이터 로딩 중...</div>;
    }

    return (
        <div>
            {portfolios.map((portfolio) => (
                <div key={portfolio.id}>
                    <h2>{portfolio.reason_created}</h2>
                    <p>{portfolio.features}</p>
                    <p>{portfolio.technologies}</p>
                    <p>{portfolio.part}</p>
                    <p>{portfolio.github}</p>
                    <p>{portfolio.url}</p>
                    <div>
                        <p>{portfolio.start_date}</p>
                        <p>{portfolio.end_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectDetail;
