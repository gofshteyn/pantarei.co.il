import { Exclude, Expose } from "class-transformer";

export class Currency {
    @Expose()
    id: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    symbol: string;

    @Exclude()
    isDefault: boolean;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
