import * as CSS from 'csstype';
export interface Parameters {
    /**
     * loadingId 不传自动生成 loading + 时间戳 + 100以内的随机数
     * @type {string}
     * @memberof Parameters
     */
    id?: string;
    /**
     * loading 层级
     * @type {number}
     * @memberof Parameters
     */
    zIndex?: string;
    /**
     * loading样式
     * @type {{
     *         wrap?: CSS.Properties;
     *         main?: CSS.Properties;
     *     }}
     * @memberof Parameters
     */
    style?: {
        overlay?: CSS.Properties;
        content?: CSS.Properties;
        vertices?: {
            elements?: string[];
        } & CSS.Properties;
    };
    /**
     * 基准文字大小
     * @type {number}
     * @memberof Parameters
     */
    emBase?: number;
    /**
     * 周期时间
     * @type {string}
     * @memberof Parameters
     */
    cycleTime?: string;
    /**
     * 父级Id
     * @type {string}
     * @memberof Parameters
     */
    parentId?: string;
    /**
     * 由几个vertices组成默认12个
     * @type {number}
     * @memberof Parameters
     */
    length?: number;
}
declare class Loading {
    emBase: number;
    id: string;
    counter: number;
    style: any;
    length: number;
    cycleTime: number;
    parentId: string;
    zIndex: number;
    constructor(parameters: Parameters);
    show: () => void;
    hide: () => void;
    reset: () => void;
    create: () => Promise<HTMLElement>;
    destory: () => void;
}
export default Loading;
