export interface Word {
    id: number;
    word: string;
}
export interface Words {
    words: Word[];
}
export declare class ListWordsService {
    listWords(num_items: number): Promise<Words>;
}
