import React from 'react';
import { Layer } from '../../model/dataModel';
import styles from './LayerForm.module.css'
import LayersClearSharpIcon from '@mui/icons-material/LayersClearSharp';
import LayersSharpIcon from '@mui/icons-material/LayersSharp';
const LayerForm: React.FC<{
    parentSurface: string;
    LayerIndex: number;
    layer: Layer;
    updateLayer: (layer: Layer) => void;
    removeLayer: () => void;
}> = ({ parentSurface, LayerIndex, layer, updateLayer, removeLayer }) => {
    const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLayer({ ...layer, material: e.target.value });
    };

    const handleThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLayer({ ...layer, thickness: parseFloat(e.target.value) });
    };

    const handleDilutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLayer({ ...layer, dilution: parseFloat(e.target.value) });
    };

    const handleLossFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLayer({ ...layer, lossFactor: parseFloat(e.target.value) });
    };

    const handleMaterialPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLayer({ ...layer, materialPrice: parseFloat(e.target.value) });
    };

    return (
        <div className={styles.LayerFormContainer}>
            <h4><LayersSharpIcon /> Слой №{LayerIndex + 1} для поверхности {parentSurface}</h4>
            <div className={styles.LayerInputField}> <span>Материал</span>

                <input

                    aria-label='Материал'
                    type="text"
                    value={layer.material}
                    onChange={handleMaterialChange}
                    placeholder="Материал"
                /></div>
            <div className={styles.LayerInputField}> <span>Толщина (мкм)</span>

                <input
                    type="number"
                    value={layer.thickness}
                    onChange={handleThicknessChange}
                    placeholder="Толщина (мкм)"
                /></div>
            <div className={styles.LayerInputField}> <span>"Разбавление (%)</span>

                <input
                    type="number"
                    value={layer.dilution}
                    onChange={handleDilutionChange}
                    placeholder="Разбавление (%)"
                /></div>
            <div className={styles.LayerInputField}> <span>Коэффициент потерь (%)</span>

                <input
                    type="number"
                    value={layer.lossFactor}
                    onChange={handleLossFactorChange}
                    placeholder="Коэффициент потерь (%)"
                /></div>

            <div className={styles.LayerInputField}>
                <span>Цена за литр (руб.)</span>

                <input
                    type="number"
                    value={layer.materialPrice}
                    onChange={handleMaterialPriceChange}
                    placeholder="Цена за литр (руб.)"
                />
            </div>

            <button className={styles.styledButton} onClick={removeLayer}><LayersClearSharpIcon className={styles.LayersClearSharpIcon} /> Удалить слой </button>
        </div>
    );
};

export default LayerForm;
