import React from 'react';
import { ConstructionProvider } from './providers/ConstructionProvider/ConstructionProvider'; // Контекст для управления конструкцией
import ConstructionForm from './components/ConstructionForm/ConstructionForm'; // Форма для создания и редактирования конструкции
import Report from './components/Report/Report'; // Компонент для генерации итогового отчета

const App: React.FC = () => {
  return (
    <ConstructionProvider>
      <div style={{ padding: '20px' }}>
        <h1>Генерация коммерческого предложения по покраске</h1>
        {/* Форма для управления конструкцией, поверхностями и слоями */}
        <ConstructionForm />

        {/* Генерация итогового отчета с расчетами для каждого слоя и поверхности */}
        <Report />
      </div>
    </ConstructionProvider>
  );
};

export default App;
