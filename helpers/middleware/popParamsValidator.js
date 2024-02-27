export default (req, res, next) => {
    const { datatype, region, year } = req.params;
    const validDatatypes = ['growth', 'total', 'density'];
    const validRegionValues = ['EU', 'EEA', 'Europe+'];
    const maxSupportedYear = 2022;
    const minSupportedYear = 1950;

    if (!validDatatypes.includes(datatype)) {
        return res.status(400).send(
            `Invalid population data-type: ${datatype}.
            Valid data-types are: ${validDatatypes.toString()}`
        );
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