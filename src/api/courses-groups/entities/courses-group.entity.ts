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
    position: number;

    @Expose()
    courses?: Course[];

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
