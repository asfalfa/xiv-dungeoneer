export interface APIResponse<T> {
    count: number;
    results: Array<T>;
}

export interface XIVAPIResponse<T> {
    Pagination: Pagination;
    Results: Array<T>;
}

export interface Pagination {
    Page: number;
    PageNext: number;
    PagePrev: number;
    PageTotal: number;
    ResultsTotal: number;
}

export interface MatchedItem {
    dungeon: Dungeon;
    orchestrions?: Array<Orchestrion>;
    minions?: Array<Minion>;
    mounts?: Array<Mount>;
}

export interface Dungeon {
    ID: number;
    Name: string;
}

export interface DungeonDetails {
    ID: number;
    Name: string;
    Banner: string;
}

export interface Minion {
    id: number;
    name: string;
    description: string;
    enhanced_description: string;
    tooltip: string;
    patch: string;
    image: string;
    icon: string;
    owned: string;
    sources: Array<Source>;
}
interface Source {
    type: string;
    text: string;
    related_type?: string;
}

export interface Orchestrion {
    id: number;
    name: string;
    description: string;
    patch: string;
    icon: string;
    owned: string;
    number: string;
    category: Category;
}
interface Category {
    id: number;
    name: string;
}

export interface Mount {
    id: number;
    name: string;
    description: string;
    enhanced_description: string;
    tooltip: string;
    patch: string;
    image: string;
    icon: string;
    owned: string;
    sources: Array<Source>;
}