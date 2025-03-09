import { Exclude, Expose } from "class-transformer";

export class Course {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Exclude()
    courseGroupId: string;

    @Exclude()
    productId: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    subtitle: string;

    @Expose()
    subtitleLocales: object;

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