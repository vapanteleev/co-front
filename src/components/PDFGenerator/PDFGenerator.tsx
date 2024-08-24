import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';

interface PDFGeneratorProps {
    proposalData: any;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ proposalData }) => {
    const generatePDF = () => {
        const doc = new jsPDF();



        doc.text('Commercial Proposal', 10, 10);
        doc.text(`For company: ${proposalData.companyName}`, 10, 20);
        doc.text(`Surface area: ${proposalData.surfaceArea} m²`, 10, 30);
        doc.text(`Volume content of non-volatile substances: ${proposalData.osn} %`, 10, 40);
        doc.text(`Dry layer thickness: ${proposalData.tss} µm`, 10, 50);
        doc.text(`Wet layer thickness: ${proposalData.tms.toFixed(2)} µm`, 10, 60);
        doc.text(`Theoretical material consumption: ${proposalData.Gt.toFixed(2)} l/m²`, 10, 70);
        doc.text(`Practical material consumption: ${proposalData.Gp.toFixed(2)} l for the entire surface`, 10, 80);
        doc.text(`Material cost: ${proposalData.materialCost.toFixed(2)} rub.`, 10, 90);
        doc.text(`Labor cost: ${proposalData.laborCost.toFixed(2)} rub.`, 10, 100);
        doc.text(`Total cost: ${proposalData.totalCost.toFixed(2)} rub.`, 10, 110);

        doc.save('CommercialProposal.pdf');
    };

    return (
        <Button variant="contained" color="secondary" onClick={generatePDF}>
            Download Proposal as PDF
        </Button>
    );
};

export default PDFGenerator;
