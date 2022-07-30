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

/** This is the end product */
export interface MatchedItem {
    dungeon: Dungeon; /** See Line 27 for details */
    orchestrions?: Array<Orchestrion>; /** See Line 57 for details */
    minions?: Array<Minion>; /** See Line 39 for details */
    mounts?: Array<Mount>; /** See Line 72 for details */
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
// Minion characteristics 
/* lslfjldf **/
export interface Minion {
    player_owns: boolean;
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
    player_owns: boolean;
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

export interface Character {
    ID: number;
    Lang: string;
    Avatar: string;
    Name: string;
    Server: string;
}

export interface BlueMage {
    id: number;
    name: string;
    description: string;
    patch: string;
    icon: string;
    owned: string;
    sources: Array<Source>
    
}

export interface CharacterInfo {
    Character: CharacterDetails;
    Minions: Array<XIVAPIMinion>;
    Mounts: Array<XIVAPIMount>;
}

interface XIVAPIMinion {
    Icon: string;
    Name: string;
}
interface XIVAPIMount {
    Icon: string;
    Name: string;
}
interface CharacterDetails {
    DC: string;
    Server: string;
    ID: number;
    Name: string;
    Avatar: string;
    Portrait: string;
    Gender: number;
    Bio: string;
    FreeCompanyId: string;
    FreeCompanyName: string;
}