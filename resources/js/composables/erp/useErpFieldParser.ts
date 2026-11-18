import type {
    ErpFieldDefinition,
    ErpFieldInput,
    ErpFieldInputType,
} from '@/types/erp';

export const COMMON_SEARCH_FILTERS: ErpFieldDefinition[] = [
    {
        label: 'Cari kata kunci',
        type: 'search',
        placeholder: 'Kode, nama, transaksi…',
    },
];

export function parseErpField(field: ErpFieldInput): ErpFieldDefinition {
    if (!Array.isArray(field)) {
        return {
            ...field,
            placeholder:
                field.placeholder ?? `Isi ${field.label.toLowerCase()}`,
        };
    }

    const [label, rawType = 'text'] = field;

    if (rawType.startsWith('select:')) {
        return {
            label,
            type: 'select',
            options: rawType.slice(7).split(','),
            placeholder: `Isi ${label.toLowerCase()}`,
        };
    }

    if (rawType.startsWith('radio:')) {
        return {
            label,
            type: 'radio',
            options: rawType.slice(6).split(','),
            placeholder: `Isi ${label.toLowerCase()}`,
        };
    }

    return {
        label,
        type: rawType as ErpFieldInputType,
        placeholder: `Isi ${label.toLowerCase()}`,
    };
}

export function parseErpFields(
    fields: ErpFieldInput[] = [],
): ErpFieldDefinition[] {
    return fields.map(parseErpField);
}
