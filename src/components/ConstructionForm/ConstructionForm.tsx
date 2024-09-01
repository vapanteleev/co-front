import React, { useContext } from 'react';
import { ConstructionContext } from '../../providers/ConstructionProvider/ConstructionProvider';
import SurfaceForm from '../SurfaceForm/SurfaceForm';
import { Surface } from '../../model/dataModel';
import styles from './ConstructionForm.module.css'

const ConstructionForm: React.FC = () => {
    const { construction, setConstruction, addSurface, updateSurface, removeSurface } = useContext(ConstructionContext) as any;

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConstruction((prev: any) => ({ ...prev, companyName: e.target.value }));
    };

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConstruction((prev: any) => ({ ...prev, projectName: e.target.value }));
    };

    return (
        <div>
            <h2>Конструкция</h2>
            <div className={styles.ConstructionFormField}>
                <span>Название компании</span>
                <input
                    type="text"
                    value={construction.companyName}
                    onChange={handleCompanyNameChange}
                    placeholder="Название компании"
                />
            </div>
            <div className={styles.ConstructionFormField}>
                <span>Название проекта</span>
                <input
                    type="text"
                    value={construction.projectName}
                    onChange={handleProjectNameChange}
                    placeholder="Название проекта"
                />
            </div>


            {construction.surfaces.map((surface: Surface, index: number) => (
                <SurfaceForm
                    key={index}
                    surface={surface}
                    updateSurface={(updatedSurface: any) => updateSurface(index, updatedSurface)}
                    removeSurface={() => removeSurface(index)}
                />
            ))}

            <button onClick={() => addSurface({ name: '', area: 0, layers: [] })}>Добавить поверхность</button>
        </div>
    );
};

export default ConstructionForm;
