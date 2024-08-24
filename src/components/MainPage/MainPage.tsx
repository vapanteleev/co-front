import React from 'react'
import styles from './MainPage.module.css';
import { Container, Typography } from '@mui/material';
import InputForm from '../InputForm/InputForm';
import ProposalOutput from '../ProposalOutput/ProposalOutput';
import PDFGenerator from '../PDFGenerator/PDFGenerator'
function MainPage() {
    const [proposalData, setProposalData] = React.useState(null);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Генерация коммерческого предложения
            </Typography>
            <InputForm setProposalData={setProposalData} />
            {proposalData && <>

                <ProposalOutput proposalData={proposalData} />
                <PDFGenerator proposalData={proposalData} />
            </>}
        </Container>
    )
}

export default MainPage