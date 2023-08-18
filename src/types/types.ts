export interface Section {
    title: string;
    filter: any; // Рекомендуется уточнить тип
    selectData: any[]; // Рекомендуется уточнить тип
    currentPage?: number;
    store: any; // Рекомендуется уточнить тип
    searchQuery?: string;
    fetchDataFunc?: Function | null;
    isName?: boolean;
    tooltip?: boolean;
    searchable?: boolean;
    staticData?: boolean;
    label?: string;
}

