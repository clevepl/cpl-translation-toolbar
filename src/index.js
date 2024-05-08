/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

import { registerBlockType } from "@wordpress/blocks";
// if I comment this out, the custombutton in the blocktoolbar does not appear

import { registerFormatType, toggleFormat } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});

const MyCustomButton = ({ isActive, onChange, value }) => {
	return (
		<RichTextToolbarButton
			icon="editor-commentReplyLink"
			title="Skip 2 Translation"
			onClick={() => {
				onChange(
					toggleFormat(value, {
						type: "cpl/skip-translation",
					}),
				);
			}}
			isActive={isActive}
		/>
	);
};

registerFormatType("cpl/skip-translation", {
	title: "Skip translation",
	tagName: "span",
	className: "cpl--translation-skip",
	edit: MyCustomButton,
});
