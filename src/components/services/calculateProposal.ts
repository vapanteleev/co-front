export const calculateProposal = (surfaceArea: number, materialData: any) => {
    const osn = parseFloat(materialData.osn);
    const tss = parseFloat(materialData.tss);

    const tms = (tss * 100) / osn;
    const Gt = surfaceArea * tms;

    return {
        surfaceArea,
        tms,
        Gt,
        ...materialData,
    };
};
