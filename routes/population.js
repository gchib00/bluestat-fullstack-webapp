import express from 'express';
import { pool } from '../database/database.js';
import get_countries from '../helpers/get_countries.js';
import popParamsValidator from '../helpers/middleware/popParamsValidator.js';

const router = express.Router();

router.get('/:datatype/:region/:year', popParamsValidator, async (req, res, next) => {
    const { datatype, region, year } = req.params;
    const microStates = req.query.microStates === '1' ?? true;
    const relevantCountries = await get_countries(region, microStates);
    const dataPerCountry = [];

    for (const country of relevantCountries) {
        const [ data ] = await pool.query(`SELECT * FROM pop_${datatype} WHERE country_id = ${country.id} AND year = ?`, [year]);
        
        dataPerCountry.push({
            country: country.code,
            value: data[0].value
        })
    }

    res.status(200).send(dataPerCountry);
});

export default router;