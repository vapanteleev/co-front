import React from 'react';
import { Layer } from '../../model/dataModel';

const LayerForm: React.FC<{
  layer: Layer;
  updateLayer: (layer: Layer) => void;
  removeLayer: () => void;
}> = ({ layer, updateLayer, removeLayer }) => {
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
    <div>
      <h4>Слой</h4>
      <input
        type="text"
        value={layer.material}
        onChange={handleMaterialChange}
        placeholder="Материал"
      />
      <input
        type="number"
        value={layer.thickness}
        onChange={handleThicknessChange}
        placeholder="Толщина (мкм)"
      />
      <input
        type="number"
        value={layer.dilution}
        onChange={handleDilutionChange}
        placeholder="Разбавление (%)"
      />
      <input
        type="number"
        value={layer.lossFactor}
        onChange={handleLossFactorChange}
        placeholder="Коэффициент потерь (%)"
      />
      <input
        type="number"
        value={layer.materialPrice}
        onChange={handleMaterialPriceChange}
        placeholder="Цена за литр (руб.)"
      />
      <button onClick={removeLayer}>Удалить слой</button>
    </div>
  );
};

export default LayerForm;
