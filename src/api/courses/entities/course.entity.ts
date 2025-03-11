import { Exclude, Expose } from "class-transformer";
import { CourseFeature } from "./course-feature.entity";
import { CourseInclusion } from "./course-inclusion.entity";
import { CourseSuggestion } from "./course-suggestion.entity";

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
    features?: CourseFeature[];
    
    @Expose()
    inclusions?: CourseInclusion[];
    
    @Expose()
    suggestions?: CourseSuggestion[];

    @Expose()
    logoUrl: string;

    @Expose()
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