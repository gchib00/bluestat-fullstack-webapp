import { pool } from '../database/database.js';

export default async (region, microStates) => {
    const eu_group_id = '1';
    const eea_group_id = '2';
    const europe_plus_group_id = '3';
    const microstates_group_id = '4';
    let relevantCountries = [];

    const fetch_countries = async (group_id) => {
        const [ countries ] = await pool.query(`SELECT * FROM country WHERE group_id = ?`, [group_id]);
        relevantCountries.push(...countries);
    }

    const filterOutMicrostates = async () => {
        const [ microStates ] = await pool.query(`SELECT * FROM country WHERE group_id = ?`, [microstates_group_id]);
        for (const microState of microStates) {
            relevantCountries = relevantCountries.filter((country) => country.code !== microState.code);
        }
    }

    await fetch_countries(eu_group_id);

    if (region !== 'EU') {
        await fetch_countries(eea_group_id);

        if (region === 'Europe+') {
            await fetch_countries(europe_plus_group_id);
        } 
    }

    if (microStates !== 'true') {
        await filterOutMicrostates(); 
    }
    
    return relevantCountries;
};