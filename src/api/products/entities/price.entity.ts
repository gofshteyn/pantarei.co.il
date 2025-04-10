import { Transform } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

const DecimalToNumber = ({ value }: { value: Decimal }) => {
    if (!value) return null; // или return 0;
    return value.toNumber(); // или .toString(), если нужно строковое значение
};

export class Price {
    
    @Transform(DecimalToNumber)
    price: number;

}