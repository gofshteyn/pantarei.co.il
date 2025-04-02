import { Currency } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { ProductsGroup } from "src/api/products-groups/entities/products-group.entity";

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
    prices: Array<{
        price: number,
        priceMode: string,
        currency: Currency
    }>

    @Expose()
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
