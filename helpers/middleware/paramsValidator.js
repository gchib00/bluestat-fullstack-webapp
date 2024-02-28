export default (req, res, next) => {
    const { baseUrl } = req;
    const { datatype, region, year } = req.params;
    const validPopDatatypes = ['growth', 'total', 'density'];
    const validGdpDatatypes = ['growth'];
    const validRegionValues = ['EU', 'EEA', 'Europe+'];
    const maxSupportedYear = 2022;
    const minSupportedYear = 1950;

    if (baseUrl === '/population') {
        if (!validPopDatatypes.includes(datatype)) {
            return res.status(400).send(
                `Invalid population data-type: ${datatype}.
                Valid data-types are: ${validPopDatatypes.toString()}`
            );
        }
    } else if (baseUrl === '/gdp') {
        if (!validGdpDatatypes.includes(datatype)) {
            return res.status(400).send(
                `Invalid population data-type: ${datatype}.
                Valid data-types are: ${validGdpDatatypes.toString()}`
            );
        }  
    }


    if (!validRegionValues.includes(region)) {
        return res.status(400).send(
            `Invalid region value: ${region}.
            Valid regions are: ${validRegionValues.toString()}`
        );
    }

    if (!Number(year) || (Number(year) > 2022 || Number(year) < 1950)) {
        return res.status(400).send(
            `Invalid year value: ${year}.
            Please select a value between ${maxSupportedYear} and ${minSupportedYear}`
        );
    }

    next();
}