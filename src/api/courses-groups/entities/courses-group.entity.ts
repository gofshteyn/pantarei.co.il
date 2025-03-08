import { Expose } from "class-transformer";


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
}
