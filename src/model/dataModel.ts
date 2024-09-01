export interface Layer {
    material: string;
    thickness: number; // Толщина слоя (мкм)
    dilution: number;  // Процент разбавления
    lossFactor: number; // Коэффициент потерь
    materialPrice: number; // Цена за литр материала
}

export interface Surface {
    name: string;
    area: number; // Площадь поверхности (м²)
    layers: Layer[]; // Слои краски
}

export interface Construction {
    companyName: string;
    projectName: string;
    surfaces: Surface[]; // Поверхности, которые нужно окрасить
}
