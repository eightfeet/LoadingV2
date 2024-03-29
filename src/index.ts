if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Loading, { Parameters, Style } from './Loading';
import { createInlineStyles } from './inlineStyle';
export default Loading;
export { createInlineStyles };

export type LoadingParameters = Parameters;
export type LoadingStyle = Style;
