import React, { useContext } from 'react';
import { ConstructionContext } from '../../providers/ConstructionProvider/ConstructionProvider';
import { Layer, Surface } from '../../model/dataModel';
import jsPDF from 'jspdf';
import RobotoGoyda from '../../fonts/RobotoGoyda'; // Путь к вашему шрифту

const Report: React.FC = () => {
    const { construction } = useContext(ConstructionContext) as any;

    const calculateMaterialConsumption = (layer: Layer, surfaceArea: number): number => {
        const thicknessInMeters = layer.thickness / 1e6; // Толщина в метрах
        const materialConsumption = surfaceArea * thicknessInMeters * layer.lossFactor;
        return materialConsumption;
    };

    const calculateMaterialCost = (layer: Layer, surfaceArea: number): number => {
        const consumption = calculateMaterialConsumption(layer, surfaceArea);
        const cost = consumption * layer.materialPrice;
        return cost;
    };

    const calculateSurfaceCost = (surface: Surface): number => {
        return surface.layers.reduce((total, layer) => {
            return total + calculateMaterialCost(layer, surface.area);
        }, 0);
    };

    const calculateTotalProjectCost = (): number => {
        return construction.surfaces.reduce((total: any, surface: any) => {
            return total + calculateSurfaceCost(surface);
        }, 0);
    };

    // Generate PDF report
    const generatePDF = (): void => {
        const doc = new jsPDF();

        // Load custom font supporting Cyrillic characters
        doc.addFileToVFS('Roboto-Goyda.ttf', RobotoGoyda);
        doc.addFont('Roboto-Goyda.ttf', 'Roboto', 'normal');
        doc.setFont('Roboto-Goyda');

        const pageHeight = doc.internal.pageSize.height;
        let yOffset = 10;

        doc.setFontSize(12);
        doc.text('Final Report', 10, yOffset);
        yOffset += 10;
        doc.text(`Company: ${construction.companyName}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Project: ${construction.projectName}`, 10, yOffset);
        yOffset += 10;

        construction.surfaces.forEach((surface: any, surfaceIndex: any) => {
            if (yOffset + 10 > pageHeight) {
                doc.addPage();
                yOffset = 10;
            }
            doc.text(`Surface: ${surface.name}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Area: ${surface.area} m²`, 10, yOffset);
            yOffset += 10;

            surface.layers.forEach((layer: any, layerIndex: any) => {
                if (yOffset + 10 > pageHeight) {
                    doc.addPage();
                    yOffset = 10;
                }
                doc.text(`Layer ${layerIndex + 1}:`, 10, yOffset);
                yOffset += 10;
                doc.text(`Material: ${layer.material}`, 20, yOffset);
                yOffset += 10;
                doc.text(`Film Thickness: ${layer.thickness} µm`, 20, yOffset);
                yOffset += 10;
                doc.text(`Dilution: ${layer.dilution}%`, 20, yOffset);
                yOffset += 10;
                doc.text(`Loss Factor: ${layer.lossFactor}%`, 20, yOffset);
                yOffset += 10;
                doc.text(`Price per Liter: ${layer.materialPrice} RUB`, 20, yOffset);
                yOffset += 10;
                doc.text(`Material Consumption: ${calculateMaterialConsumption(layer, surface.area).toFixed(3)} L`, 20, yOffset);
                yOffset += 10;
                doc.text(`Layer Cost: ${calculateMaterialCost(layer, surface.area).toFixed(2)} RUB`, 20, yOffset);
                yOffset += 10;
            });

            if (yOffset + 10 > pageHeight) {
                doc.addPage();
                yOffset = 10;
            }
            doc.text(`Surface Painting Cost: ${calculateSurfaceCost(surface).toFixed(2)} RUB`, 10, yOffset);
            yOffset += 20;
        });

        if (yOffset + 10 > pageHeight) {
            doc.addPage();
            yOffset = 10;
        }
        doc.text(`Total Project Cost: ${calculateTotalProjectCost().toFixed(2)} RUB`, 10, yOffset);

        doc.save('Report.pdf');
    };

    return (
        <div>
            <h2>Итоговый отчет</h2>
            <h3>Компания: {construction.companyName}</h3>
            <h3>Проект: {construction.projectName}</h3>

            {construction.surfaces.map((surface: any, surfaceIndex: any) => (
                <div key={surfaceIndex} style={{ marginBottom: '20px' }}>
                    <h4>Поверхность: {surface.name}</h4>
                    <p>Площадь: {surface.area} м²</p>
                    <h5>Слои:</h5>
                    {surface.layers.map((layer: any, layerIndex: any) => (
                        <div key={layerIndex} style={{ marginBottom: '10px' }}>
                            <p>Материал: {layer.material}</p>
                            <p>Толщина пленки: {layer.thickness} мкм</p>
                            <p>Разбавление: {layer.dilution}%</p>
                            <p>Коэффициент потерь: {layer.lossFactor}%</p>
                            <p>Цена за литр: {layer.materialPrice} руб.</p>
                            <p>Расход материала: {calculateMaterialConsumption(layer, surface.area).toFixed(3)} л</p>
                            <p>Стоимость слоя: {calculateMaterialCost(layer, surface.area).toFixed(2)} руб.</p>
                        </div>
                    ))}
                    <p><strong>Стоимость окраски поверхности: {calculateSurfaceCost(surface).toFixed(2)} руб.</strong></p>
                </div>
            ))}

            <h3>Итоговая стоимость проекта: {calculateTotalProjectCost().toFixed(2)} руб.</h3>

            <button onClick={generatePDF}>Скачать PDF</button>
        </div>
    );
};

export default Report;