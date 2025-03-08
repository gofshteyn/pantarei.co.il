import { Expose } from "class-transformer";

export class Currency {
    @Expose()
    id: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    symbol: string;
}
