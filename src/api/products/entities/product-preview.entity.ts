import { Exclude, Expose } from "class-transformer";

export class ProductPreview {

    @Expose()
    id: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Exclude()
    code: string;

    @Exclude()
    productGroupId: string;

    @Exclude()
    description: string;

    @Exclude()
    descriptionLocales: object;

    @Exclude()
    imageUrl: string;

    @Exclude()
    position: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
