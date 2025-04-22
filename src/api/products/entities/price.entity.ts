import { Expose, Transform } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

const DecimalToNumber = ({ value }: { value?: Decimal | null }) => {
    if (value === undefined || value === null) return null;
    return Number(value);
};

export class Price {
    
    @Expose()
    @Transform(DecimalToNumber)
    value: number;

}