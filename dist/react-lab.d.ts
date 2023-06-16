import React from 'react';
interface IProps {
    useSrcDocIframe?: boolean;
    labDistPath?: string;
    model: object;
    interactive?: object;
    props?: object;
    propsUpdateDelay?: boolean | number;
    observedProps?: string[];
    playing?: boolean;
    onModelLoad?: () => void;
    onPropChange?: (propName: string, value: any) => void;
    onLogEvent?: (action: string, data: any) => void;
    width?: string | number;
    height?: string | number;
    allowFullScreen?: boolean;
    frameBorder?: string;
    reloadIframeOnModelUpdate?: boolean;
}
interface IState {
    loading: boolean;
}
export default class Lab extends React.Component<IProps, IState> {
    static defaultProps: {
        interactive: {
            title: string;
            aspectRatio: number;
            theme: string;
            showTopBar: boolean;
            showBottomBar: boolean;
            models: {
                type: string;
                id: string;
            }[];
        };
        useSrcDocIframe: boolean;
        labDistPath: string;
        width: string;
        height: string;
        allowFullScreen: boolean;
        frameBorder: string;
        props: {};
        observedProps: never[];
        propsUpdateDelay: boolean;
        reloadIframeOnModelUpdate: boolean;
    };
    iframeRef: React.RefObject<HTMLIFrameElement>;
    private _labUpdateTimeoutID;
    private _propsToSet;
    private _phone;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean;
    render(): JSX.Element;
    get scriptingAPI(): any;
    get interactiveController(): any;
    get iframe(): HTMLIFrameElement | null;
    get phone(): any;
    _handleIframeLoad(): void;
    _handleModelLoad(): void;
    _loadInteractive(interactive: any, model: any): void;
    _setLabProperties(props: any): void;
    _asyncLabPropertiesUpdate(): void;
    _setLabPlaying(v: boolean): void;
    _addLabListeners(observedProps: string[]): void;
}
export {};
