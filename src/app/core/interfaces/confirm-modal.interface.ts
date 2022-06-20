export interface IConfirmModal {
    title?: string;
    content?: string;
    html?: string;
    agreeIcon?: string;
    agreeLabel?: string;
    cancelIcon?: string;
    cancelLabel?: string;
    isEmitFalseWhenCancel?: boolean;
}
