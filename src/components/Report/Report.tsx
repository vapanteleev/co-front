import React, { useContext } from 'react';
import { ConstructionContext } from '../../providers/ConstructionProvider/ConstructionProvider';
import { Layer, Surface } from '../../model/dataModel';
import jsPDF from 'jspdf';
import styles from './Report.module.css'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LayersIcon from '@mui/icons-material/Layers';
const Report: React.FC = () => {
    const tableHeaderStyle = {
        padding: '10px',
        backgroundColor: '#827dad88',
        color: 'white',
        textAlign: 'left',
        borderBottom: '2px solid #ddd'
    } as any;

    const tableCellStyle = {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    } as any;

    const { construction } = useContext(ConstructionContext) as any;
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true); // State to manage collapse/expand

    const toggleCollapse = (): void => {
        setIsCollapsed(!isCollapsed);
    };

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
            <div>
                <button className={styles.collapse_btn} onClick={toggleCollapse}>
                    {
                        !isCollapsed ? <>Свернуть отчет <UnfoldLessIcon /> </> : <>Развернуть итоговый отчет                 <UnfoldMoreIcon className={styles.UnfoldMoreIcon} />
                        </>
                    }
                </button>
            </div>
            {
                !isCollapsed ?
                    <div className='final-report-block'>
                        <div className={styles.final_report_headers1}>


                            <h2>Final Report</h2>
                            <h3>Company: {construction.companyName}</h3>
                            <h3>Project: {construction.projectName}</h3>
                        </div>
                        {construction.surfaces.map((surface: any, surfaceIndex: any) => (
                            <div key={surfaceIndex} style={{ marginBottom: '20px' }}>
                                <div className={styles.final_report_headers2}>

                                    <h4>Surface: {surface.name}</h4>
                                    <p>Area: {surface.area} m²</p>

                                    <h5><LayersIcon /> Layers: </h5>
                                </div>
                                <div className={styles.ReportTableWrapper}>
                                    <table className={styles.ReportTable} style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                        <thead>
                                            <tr>
                                                <th style={tableHeaderStyle}>#</th>
                                                <th style={tableHeaderStyle}>Material</th>
                                                <th style={tableHeaderStyle}>Thickness (µm)</th>
                                                <th style={tableHeaderStyle}>Dilution (%)</th>
                                                <th style={tableHeaderStyle}>Loss Factor (%)</th>
                                                <th style={tableHeaderStyle}>Price per Liter (RUB)</th>
                                                <th style={tableHeaderStyle}>Material Consumption (L)</th>
                                                <th style={tableHeaderStyle}>Layer Cost (RUB)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surface.layers.map((layer: any, layerIndex: any) => (
                                                <tr key={layerIndex}>
                                                    <td style={tableCellStyle}>{layerIndex + 1}</td>
                                                    <td style={tableCellStyle}>{layer.material}</td>
                                                    <td style={tableCellStyle}>{layer.thickness}</td>
                                                    <td style={tableCellStyle}>{layer.dilution}</td>
                                                    <td style={tableCellStyle}>{layer.lossFactor}</td>
                                                    <td style={tableCellStyle}>{layer.materialPrice}</td>
                                                    <td style={tableCellStyle}>{calculateMaterialConsumption(layer, surface.area).toFixed(3)}</td>
                                                    <td style={tableCellStyle}>{calculateMaterialCost(layer, surface.area).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.Surface_Painting_Cost}>
                                    <p><PointOfSaleIcon /> Surface Painting Cost: {calculateSurfaceCost(surface).toFixed(2)} RUB</p>

                                </div>
                            </div>
                        ))}

                        <h3>Total Project Cost: {calculateTotalProjectCost().toFixed(2)} RUB</h3>
                    </div>
                    : <></>
            }

            <div className={styles.pdfBtn} onClick={generatePDF}>Скачать PDF

                <img className={styles.form_icon_pdf} src="/icons8-pdf-40.png" alt="icons8-pdf-40.png" />


            </div>


        </div>
    );
};

export default Report;