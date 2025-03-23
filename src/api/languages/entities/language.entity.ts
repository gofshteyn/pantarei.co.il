import { Exclude, Expose } from "class-transformer";

export class Language {

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
