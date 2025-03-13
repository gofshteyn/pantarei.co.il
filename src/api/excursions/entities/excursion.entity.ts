import { Exclude, Expose } from "class-transformer";
import { Currency } from "src/api/currencies/entities/currency.entity";

export class Excursion {

    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    displayName: string;

    @Expose()
    displayNameLocales: string;

    @Expose()
    subtitle: string;

    @Expose()
    subtitleLocales: string;

    @Expose()
    description: string;

    @Expose()
    descriptionLocales: string;

    @Expose()
    defaultPrice: {
        price: number;
        priceMode: string;
        currency: Currency
    }

    @Expose()
    logoUrl: string;

    @Expose()
    imageUrl: string;

    @Exclude()
    position: number;

    @Exclude()
    productId: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}
