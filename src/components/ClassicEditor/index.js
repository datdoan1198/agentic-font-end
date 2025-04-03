// ckeditor.js
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Underline, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  AutoImage,
  ImageTextAlternative,
  ImageInsertViaUrl,
  ImageResize,
} from '@ckeditor/ckeditor5-image';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersText,
  SpecialCharactersMathematical,
  SpecialCharactersLatin,
  SpecialCharactersEssentials,
  SpecialCharactersCurrency,
} from '@ckeditor/ckeditor5-special-characters';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Alignment,
  BlockQuote,
  Heading,
  Link,
  List,
  Paragraph,
  Indent,
  IndentBlock,
  Table,
  TableToolbar,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageInsertViaUrl,
  AutoImage,
  LinkImage,
  ImageResize,
  ImageInsertViaUrl,
  ImageTextAlternative,
  HorizontalLine,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersText,
  SpecialCharactersMathematical,
  SpecialCharactersLatin,
  SpecialCharactersEssentials,
  SpecialCharactersCurrency,
  MediaEmbed
];

ClassicEditor.defaultConfig = {
  removePlugins: [],
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'link',
      'image',
      'bulletedList',
      'numberedList',
      'alignment',
      'outdent',
      'indent',
      'horizontalLine',
      'specialCharacters',
      'blockQuote',
      'insertImage',
      'insertTable',
      'mediaEmbed'
    ],
    shouldNotGroupWhenFull: true
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'resizeImage',
      'toggleImageCaption',
      'imageTextAlternative',
    ],
  },
  mediaEmbed: {
    previewsInData: true, 
  },
  language: 'vi',
};
