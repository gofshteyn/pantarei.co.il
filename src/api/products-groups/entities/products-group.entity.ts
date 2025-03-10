import { Exclude, Expose } from "class-transformer";

export class ProductsGroup {

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    position: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
