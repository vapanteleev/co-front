import React, { useContext, useRef } from 'react';
import { ConstructionContext } from '../../providers/ConstructionProvider/ConstructionProvider';
import { Layer, Surface } from '../../model/dataModel';
import jsPDF from 'jspdf';
import styles from './Report.module.css'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LayersIcon from '@mui/icons-material/Layers';
import html2canvas from 'html2canvas';
const Report: React.FC = () => {


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
    const reportRef = useRef() as any; // Создаем реф для секции с отчетом

    const generatePDF1 = () => {
        const input = reportRef.current;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Ширина A4 в mm
            const pageHeight = 297; // Высота A4 в mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Первая страница
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Остальные страницы
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('report.pdf');
        });
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



    return (
        <div>
            <div>
                <button className={styles.collapse_btn} onClick={toggleCollapse}>
                    {
                        !isCollapsed ? <>Свернуть отчет <UnfoldLessIcon /> </> : <> Итоговый отчет                 <UnfoldMoreIcon className={styles.UnfoldMoreIcon} />
                        </>
                    }
                </button>
            </div>
            {
                !isCollapsed ?
                    <>
                        <div ref={reportRef} className='final-report-block'>
                            <div className='logo_primatek'><img className='logo_primatek' src="/logo_peimatek.png" alt="logo_peimatek" /></div>

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
                                                    <th className={styles.tableHeaderStyle}>#</th>
                                                    <th className={styles.tableHeaderStyle}>Material</th>
                                                    <th className={styles.tableHeaderStyle}>Thickness (µm)</th>
                                                    <th className={styles.tableHeaderStyle}>Dilution (%)</th>
                                                    <th className={styles.tableHeaderStyle}>Loss Factor (%)</th>
                                                    <th className={styles.tableHeaderStyle}>Price per Liter (RUB)</th>
                                                    <th className={styles.tableHeaderStyle}>Material Consumption (L)</th>
                                                    <th className={styles.tableHeaderStyle}>Layer Cost (RUB)</th>
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
                        <div className={styles.pdfBtn} onClick={generatePDF1}>Скачать PDF

                            <img className={styles.form_icon_pdf} src="/icons8-pdf-40.png" alt="icons8-pdf-40.png" />


                        </div>
                    </>
                    : <></>

            }




        </div>
    );
};

export default Report;