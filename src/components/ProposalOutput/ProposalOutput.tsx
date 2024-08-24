import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

interface ProposalOutputProps {
    proposalData: any;
}

const ProposalOutput: React.FC<ProposalOutputProps> = ({ proposalData }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="h2">
                    Коммерческое предложение
                </Typography>
                <Typography variant="subtitle1">
                    Для компании: {proposalData.companyName}
                </Typography>
                <Typography>
                    Площадь поверхности: {proposalData.surfaceArea} м²
                </Typography>
                <Typography>
                    Объемное содержание нелетучих веществ: {proposalData.osn} %
                </Typography>
                <Typography>
                    Толщина сухого слоя: {proposalData.tss} мкм
                </Typography>
                <Typography>
                    Толщина мокрого слоя: {proposalData.tms.toFixed(2)} мкм
                </Typography>
                <Typography>
                    Теоретический расход материала: {proposalData.Gt.toFixed(2)} л/м²
                </Typography>
                <Typography>
                    Практический расход материала (учитывая потери): {proposalData.Gp.toFixed(2)} л на всю поверхность
                </Typography>
                <Typography>
                    Стоимость материалов: {proposalData.materialCost.toFixed(2)} руб.
                </Typography>
                <Typography>
                    Стоимость работ: {proposalData.laborCost.toFixed(2)} руб.
                </Typography>
                <Typography variant="h6">
                    Общая стоимость: {proposalData.totalCost.toFixed(2)} руб.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProposalOutput;
