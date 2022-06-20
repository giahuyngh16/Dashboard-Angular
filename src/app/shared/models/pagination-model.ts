import { createUUID } from "@app-core/helpers/sts-utils";

export class PaginationModel {
    id?: string;
    take: number;
    pageIndex: number;
    skip: number;
    total: number;

    constructor(total = 0, take = 10, skip = 0, pageIndex = 1) {
        this.id = createUUID();
        this.total = total;
        this.take = take;
        this.skip = skip;
        this.pageIndex = pageIndex;
    }
}

