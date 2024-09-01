import React, { useState } from 'react';
import LayerForm from '../LayerForm/LayerForm';
import { Surface, Layer } from '../../model/dataModel';

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
            <h3>Поверхность</h3>
            <input
                type="text"
                value={surface.name}
                onChange={handleNameChange}
                placeholder="Название поверхности"
            />
            <input
                type="number"
                value={surface.area}
                onChange={handleAreaChange}
                placeholder="Площадь поверхности (м²)"
            />

            {surface.layers.map((layer: Layer, index: number) => (
                <LayerForm
                    key={index}
                    layer={layer}
                    updateLayer={(updatedLayer: any) => updateLayer(index, updatedLayer)}
                    removeLayer={() => removeLayer(index)}
                />
            ))}

            <button onClick={addLayer}>Добавить слой</button>
            <button onClick={removeSurface}>Удалить поверхность</button>
        </div>
    );
};

export default SurfaceForm;
