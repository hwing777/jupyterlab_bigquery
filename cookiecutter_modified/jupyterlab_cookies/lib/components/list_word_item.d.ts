import * as React from 'react';
import { Word } from '../service/list_words';
interface Props {
    word: Word;
}
export declare class ListWordItem extends React.Component<Props, {}> {
    render(): JSX.Element;
    private getIconForWord;
}
export {};
