import React from 'react';
import LayerForm from '../LayerForm/LayerForm';
import { Surface, Layer } from '../../model/dataModel';
import styles from './SurfaceForm.module.css'
import LayersSharpIcon from '@mui/icons-material/LayersSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const SurfaceForm: React.FC<{
    SurfaceIndex: number;
    surface: Surface;
    updateSurface: (surface: Surface) => void;
    removeSurface: () => void;
}> = ({ SurfaceIndex, surface, updateSurface, removeSurface }) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSurface({ ...surface, name: e.target.value });
    };

    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSurface({ ...surface, area: parseFloat(e.target.value) });
    };

    const addLayer = () => {
        updateSurface({ ...surface, layers: [...surface.layers, { material: '', thickness: 0, dilution: 0, lossFactor: 0, materialPrice: 0 }] });
    };

    const updateLayer = (index: number, updatedLayer: Layer) => {
        const newLayers = [...surface.layers];
        newLayers[index] = updatedLayer;
        updateSurface({ ...surface, layers: newLayers });
    };

    const removeLayer = (index: number) => {
        const newLayers = surface.layers.filter((_, i) => i !== index);
        updateSurface({ ...surface, layers: newLayers });
    };

    return (
        <div className={styles.SurfaceFormContainer}>
            <h3><img className='form-icon' src="/icons8-surface-50 (1).png" alt="" />
                Поверхность №{SurfaceIndex + 1}</h3>
            <div className={styles.SurfaceFormField}>
                <span>Название поверхности</span>
                <input
                    type="text"
                    value={surface.name}
                    onChange={handleNameChange}
                    placeholder="Название поверхности"
                /></div>
            <div className={styles.SurfaceFormField}>
                <span>Площадь поверхности (м²)</span>

                <input
                    type="number"
                    value={surface.area}
                    onChange={handleAreaChange}
                    placeholder="Площадь поверхности (м²)"
                /></div>


            {surface.layers.map((layer: Layer, index: number) => (
                <LayerForm
                    parentSurface={surface.name}
                    LayerIndex={index}
                    key={index}
                    layer={layer}
                    updateLayer={(updatedLayer: any) => updateLayer(index, updatedLayer)}
                    removeLayer={() => removeLayer(index)}
                />
            ))}

            <button className={styles.styledButtonAdd} onClick={addLayer}><LayersSharpIcon className={styles.Add_Layer_Icon} /> Добавить слой</button>
            <button className={styles.styledButton}

                onClick={removeSurface}>
                <DeleteForeverIcon className={styles.DeleteForeverIcon} />
                Удалить поверхность {surface?.name}</button>
        </div >
    );
};

export default SurfaceForm;
