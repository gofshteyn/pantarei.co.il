import { Exclude, Expose } from "class-transformer";
import { Course } from "src/api/courses/entities/course.entity";


export class CoursesGroup {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    courses?: Course[];

    @Exclude()
    position: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
