import { ReactWidget } from '@jupyterlab/apputils';
import * as React from 'react';
import { ListWordsService, Words } from '../service/list_words';
interface Props {
    listWordsService: ListWordsService;
    isVisible: boolean;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    words: Words;
}
export declare class ListWordsPanel extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    private getWords;
}
/** Widget to be registered in the left-side panel. */
export declare class ListWordsWidget extends ReactWidget {
    private readonly listWordsService;
    id: string;
    private visibleSignal;
    constructor(listWordsService: ListWordsService);
    onAfterHide(): void;
    onAfterShow(): void;
    render(): JSX.Element;
}
export {};
