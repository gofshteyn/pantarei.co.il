import { Exclude, Expose, Type } from "class-transformer";
import { CourseFeature } from "./course-feature.entity";
import { CourseInclusion } from "./course-inclusion.entity";
import { CourseSuggestion } from "./course-suggestion.entity";
import { Product } from "@prisma/client";
import { Currency } from "src/api/currencies/entities/currency.entity";
import { Price } from "src/api/products/entities/price.entity";
import { CoursesGroup } from "src/api/courses-groups/entities/courses-group.entity";

export class Course {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
        defaultPrice: {
        price: number;
        priceMode: string;
        currency: Currency
    }

    @Expose()
    group: CoursesGroup;

    @Exclude()
    courseGroupId: string;

    @Exclude()
    productId: string;

    @Expose()
    product: Product;

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

    @Expose()
    @Type(() => Price)
    salesPrice: Price;
}