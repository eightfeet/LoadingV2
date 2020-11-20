import s from './Loading.scss';
import { createInlineStyles } from './../inlineStyle';

/**
 *
 * 计算等差数组
 * @param {Number} a1
 * @param {Number} an
 * @param {Number} length
 * @returns
 */
function getArr(a1, an, length){
	const d = (an - a1)/(length-1);
	const arr = [];
	for (let index = 0; index < length; index++) {
		   arr.push(index*d+a1);
	   }
	return arr;
}

const cssUnits = [
	'rem',
	'em',
	'vh',
	'vw',
	'vmin',
	'vmax',
	'ex',
	'%',
	'px',
	'cm',
	'mm',
	'in',
	'pt',
	'pc',
	'ch'
];

export default function ({style, length, cycleTime, parentId, zIndex}) {
	const parentIdDom = document.getElementById(parentId);
	const { overlay, content } = style || {};

	const vertices = JSON.parse(JSON.stringify(style.vertices || {}));

	const { elements } = vertices || {};

	let colorArray = [];
	let oprationLength = parseInt(length, 10) || 12;

	if (Array.isArray(elements)) {
		colorArray = elements;
		if (colorArray.length > 0) {
			oprationLength = colorArray.length;
		}
	} else if (Number.parseInt(elements, 10)) {
		oprationLength = Number.parseInt(elements, 10);
	}

	let oprationSize: number | string = 0;
	if (vertices.height) {
		// eslint-disable-next-line no-useless-escape
		const parts = vertices.height.match(/[a-zA-Z]+|[\.\d]+/g);
		const value = parts[0];
		const unit = parts[parts.length - 1];
		if (cssUnits.indexOf(unit) !== -1) {
			oprationSize = `${value * 1.5}${unit || ''}`;
		}
	}
	
	if (vertices.size) {
		// eslint-disable-next-line no-useless-escape
		const parts = vertices.size.match(/[a-zA-Z]+|[\.\d]+/g);
		const value = parts[0];
		const unit = parts[parts.length - 1];
		if (cssUnits.indexOf(unit) !== -1) {
			oprationSize = `${value / 2}${unit || ''}`;
		}
	}

	if (!vertices.size && !vertices.height) {
		vertices.height = '0.4em';
		oprationSize = '0.8em';
	}

	let time = cycleTime;
	if ( vertices['animationDuration'] || vertices['-webkit-animation-duration'] || vertices['animation-duration']) {
		time = Number.parseFloat(vertices['animationDuration'] || vertices['-webkit-animation-duration'] || vertices['animation-duration']) || time;
		delete vertices['animationDuration'];
		delete vertices['-webkit-animation-duration'];
		delete vertices['animation-duration'];
	}

	let doms= null;
	const timeArray = getArr(time*-1,0,oprationLength+1);
	// 深拷贝一次
	const deepVertices = JSON.parse(JSON.stringify(vertices));
	for (let index = 0; index < oprationLength; index++) {
		doms = (doms || '') + `<div class="${s.element}" style="
		-webkit-transform:rotate(${index * 360/oprationLength}deg) translate(0, ${oprationSize});
		transform:rotate(${index * 360/oprationLength}deg) translate(0, ${oprationSize});
		-webkit-animation-delay: ${timeArray[index]}s;
		animation-delay: ${timeArray[index]}s;
		-webkit-animation-duration: ${time}s;
		animation-duration: ${time}s;
		${createInlineStyles(deepVertices) ? createInlineStyles(deepVertices) : ''}
		${colorArray.length > 1 ? `background-color:${colorArray[index]}`: ''}
		"></div>
		`;
	}
	return (
		`
		<div class="${s.overlay}" style="position: ${parentIdDom ? 'absolute' : 'fixed'}; z-index:${zIndex}; ${createInlineStyles(overlay) ? createInlineStyles(overlay) : ''}">
			<div ${createInlineStyles(content) ? `style="${createInlineStyles(content)}"` : ''} class="${s.uildefaultcss} ${s.block}">
				${doms}
			</div>
		</div>
		`
	);
}