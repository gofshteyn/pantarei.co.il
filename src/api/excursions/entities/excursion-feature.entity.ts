import { Exclude, Expose } from "class-transformer";

export class ExcursionFeature {

    @Expose()
    id: string;

    @Expose()
    description: string;

    @Expose()
    descriptionLocales: string;

    @Exclude()
    position: number;

    @Exclude()
    excursionId: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}