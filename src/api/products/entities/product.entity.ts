import { Exclude, Expose } from "class-transformer";

export class Product {

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Exclude()
    productGroupId: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    description: string;

    @Expose()
    descriptionLocales: object;

    @Expose()
    position: number;

    @Expose()
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
