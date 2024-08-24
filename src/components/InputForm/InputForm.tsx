import React from 'react';
import { Button, TextField, Grid } from '@mui/material';

interface InputFormProps {
    setProposalData: (data: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ setProposalData }) => {
    const [surfaceArea, setSurfaceArea] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [materialData, setMaterialData] = React.useState({
        osn: '',
        tss: '',
        dilution: '',
        lossFactor: '',
        materialPrice: '', // Цена за литр материала
        laborCostRate: '' // Ставка за м²
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const calculatedData = calculateProposal(parseFloat(surfaceArea), materialData);
        setProposalData({ ...calculatedData, companyName });
    };

    const calculateProposal = (surfaceArea: number, materialData: any) => {
        const osn = parseFloat(materialData.osn);
        const tss = parseFloat(materialData.tss);
        const dilution = parseFloat(materialData.dilution);
        const lossFactor = parseFloat(materialData.lossFactor);
        const materialPrice = parseFloat(materialData.materialPrice);
        const laborCostRate = parseFloat(materialData.laborCostRate);

        const tms = (tss * 100) / osn;
        const Gt = tms / 1000;
        const Gp = Gt * (1 + dilution / 100) * (1 + lossFactor / 100) * surfaceArea;

        const materialCost = Gp * materialPrice;
        const laborCost = surfaceArea * laborCostRate;
        const totalCost = materialCost + laborCost;

        return {
            surfaceArea,
            osn,
            tss,
            tms,
            Gt,
            Gp,
            materialCost,
            laborCost,
            totalCost
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Название компании"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Площадь поверхности (м²)"
                        fullWidth
                        value={surfaceArea}
                        onChange={(e) => setSurfaceArea(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Объемное содержание нелетучих веществ (%)"
                        fullWidth
                        value={materialData.osn}
                        onChange={(e) => setMaterialData({ ...materialData, osn: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Толщина сухого слоя (мкм)"
                        fullWidth
                        value={materialData.tss}
                        onChange={(e) => setMaterialData({ ...materialData, tss: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Разбавление материала (%)"
                        fullWidth
                        value={materialData.dilution}
                        onChange={(e) => setMaterialData({ ...materialData, dilution: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Коэффициент потерь материала (%)"
                        fullWidth
                        value={materialData.lossFactor}
                        onChange={(e) => setMaterialData({ ...materialData, lossFactor: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Цена за литр материала (руб.)"
                        fullWidth
                        value={materialData.materialPrice}
                        onChange={(e) => setMaterialData({ ...materialData, materialPrice: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Ставка за м² (руб.)"
                        fullWidth
                        value={materialData.laborCostRate}
                        onChange={(e) => setMaterialData({ ...materialData, laborCostRate: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Рассчитать и сгенерировать предложение
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default InputForm;
