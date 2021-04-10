import * as CSS from 'csstype';
import { createDom, removeDom } from './htmlFactory';
import template from './temolate';

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
            elements?: string[],
            size?: string,
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

class Loading {
    emBase: number;
    id: string;
    counter: number;
    style: any;
    length: number;
    cycleTime: number;
    parentId: string;
    zIndex: number;
	constructor(parameters: Parameters) {
		const stamp = (new Date()).getTime();
		const {style, id, length, cycleTime, parentId, emBase, zIndex} = parameters || {};
		this.style = style;
		this.id = id || `loading${stamp}-${window.Math.floor(window.Math.random()*100)}`;
		this.counter = 0;
		this.parentId = parentId;
		this.length = length;
		this.cycleTime = parseInt(cycleTime, 10) || 0.5;
		this.emBase = emBase;
		this.zIndex = parseInt(zIndex, 10) || 10000;
	}

	show = () => {
		this.counter++;
		if (this.counter === 1) {
			this.create();
		}
	}

	hide = () => {
		this.counter = this.counter < 0 ? 0 : this.counter - 1;
		if (this.counter === 0) {
			this.destory();
		}
	}

	reset = () => {
		this.destory();
		this.counter = 0;
	}

	create = () => {
		return createDom(template({
			style: this.style,
			length: this.length,
			cycleTime: this.cycleTime,
			parentId: this.parentId,
			zIndex: this.zIndex
		}), this.id, this.parentId, this.emBase);
	}

	destory = () => {
		const modalElement = document.getElementById(this.id);
		if (modalElement) {
			removeDom(this.id);
		}
	}
}

export default Loading;
