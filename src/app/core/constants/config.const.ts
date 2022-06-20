const APP_CONFIG = {
    SEARCH_DEBOUNCE_TIME: 800,
    LOADING_TIME: 400,
    DEFAULT_INDEX_ITEM_SINGLE_SELECTION_MODE: 0,
    SALES_MAN_CHANNEL_SOURCE_ID: 10,
    CONFIG_SUCCESS_NOTIFICATION: {
        nzClass: 'success'
    },
    CONFIG_ERROR_NOTIFICATION: {
        nzClass: 'error'
    },
    PAGING_SIZE: 10
};

const RICH_TEXT_CONFIG = {
    ignoreEmptyParagraph: true,
    basicEntities: false,
    language: 'en',
    extraPlugins: 'colorbutton',
    extraAllowedContent: 'img[!src,alt,title,width,height,style](*){*}',
    toolbarGroups: [
        { name: 'colors', groups: ['colors'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'document', groups: ['document', 'doctools', 'mode'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'tools', groups: ['tools'] },
    ],
    removeButtons:
        'Templates,Source,Find,NewPage,Preview,PasteText,PasteFromWord,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Unlink,Anchor,Image,Flash,Smiley,PageBreak,Iframe,About,ShowBlocks'
};

export { APP_CONFIG, RICH_TEXT_CONFIG };
