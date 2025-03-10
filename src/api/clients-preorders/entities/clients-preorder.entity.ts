import { Exclude, Expose } from "class-transformer";
import Locale from "src/api/locales/entities/locale.entity";
import { Product } from "src/api/products/entities/product.entity";

export class ClientsPreorder {

    @Expose()
    id: string;

    @Expose()
    registrationDate: string;

    @Exclude()
    userId: string;

    @Expose()
    displayName: string;

    @Expose()
    phone: string;

    @Expose()
    email: string;

    @Exclude()
    productId: string;

    @Expose()
    product: Product;

    @Expose()
    locale: Locale;

    @Expose()
    isMediaRequired: string;

    @Expose()
    localeId: string;

    @Expose()
    status: string;

    @Exclude()
    createdAt: string;

    @Exclude()
    updatedAt: string;

    @Exclude()
    deletedAt: string;

}
