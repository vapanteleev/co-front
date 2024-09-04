import React from 'react';
import LayerForm from '../LayerForm/LayerForm';
import { Surface, Layer } from '../../model/dataModel';
import styles from './SurfaceForm.module.css'
import LayersClearSharpIcon from '@mui/icons-material/LayersClearSharp';
import LayersSharpIcon from '@mui/icons-material/LayersSharp';
const SurfaceForm: React.FC<{
    surface: Surface;
    updateSurface: (surface: Surface) => void;
    removeSurface: () => void;
}> = ({ surface, updateSurface, removeSurface }) => {
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
        <div>
            <h3><img src="/icons8-surface-50 (1).png" alt="" />
                Поверхность</h3>
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
                    key={index}
                    layer={layer}
                    updateLayer={(updatedLayer: any) => updateLayer(index, updatedLayer)}
                    removeLayer={() => removeLayer(index)}
                />
            ))}

            <button className={styles.styledButtonAdd} onClick={addLayer}><LayersSharpIcon /> Добавить слой</button>
            <button className={styles.styledButton} onClick={removeSurface}>Удалить поверхность</button>
        </div>
    );
};

export default SurfaceForm;
