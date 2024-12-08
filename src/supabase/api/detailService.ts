import supabase from '../supabaseClient';
import { Portfolio } from '../../types/supabase';

export const fetchPortfolioDetails = async (): Promise<Portfolio[]> => {
    try {
        const { data, error } = await supabase.from('detail').select('*');

        if (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

        console.log('Fetched Data:', data);
        return data as Portfolio[];
    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        return [];
    }
};
