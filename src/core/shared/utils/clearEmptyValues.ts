export function cleanEmptyValues<T>(values: T): any {
    const processed = Object.entries(values)
        .filter(([, value]) => !!value)
        .reduce((p, [key, value]) => {
            const _value =
                typeof value === 'object' || Array.isArray(value)
                    ? cleanEmptyValues<any>(value)
                    : value
            p[key] = _value
            return p
        }, {})

    return Object.entries(processed).length ? processed : undefined
}
