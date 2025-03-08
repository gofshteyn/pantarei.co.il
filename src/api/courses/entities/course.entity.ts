import { Exclude, Expose } from "class-transformer";

export class Course {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    courseGroupId: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    position: number;

    @Expose()
    description: string;

    @Expose()
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}