import { Currency } from "@prisma/client";
import { Exclude, Expose, Type } from "class-transformer";
import { ProductsGroup } from "src/api/products-groups/entities/products-group.entity";
import { Price } from "./price.entity";

export class Product {

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Exclude()
    productGroupId: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: object;

    @Expose()
    description: string;

    @Expose()
    descriptionLocales: object;

    @Expose()
    isService: boolean;

    @Expose()
    group: ProductsGroup;

    @Expose()
    position: number;

    @Exclude()
    @Type(() => Price)
    prices: Price[];

    @Expose()
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
