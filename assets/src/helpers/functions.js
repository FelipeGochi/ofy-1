import { addDays, format, formatDistance, isBefore } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const locales = { ptBR }

export const daysFromToday = (compareDate) => formatDistance(compareDate, new Date(),
    {
        addSuffix: true,
        locale: locales.ptBR
    })

export const convert = (date, formatStr = 'dd/MM/yyyy') => {
    return format(date, formatStr, {
        locale: locales[window.__localeId__]
    })
}

export const lessThenDays = (date, days) => {
    return isBefore(date, addDays(new Date(), days))
}

export const getToday = () => {
    return convert(new Date())
}

export const isNull = (item) => item === null
export const isNotNull = (item) => item !== null
export const isEmpty = (item) => item.length === 0 || !item
export const isNotEmpty = (item) => item.length > 0 || !item
export const isEquals = (item, compare) => item === compare

export const getDifficulty = (dateObjective) => {
    if (lessThenDays(dateObjective, 30))
        return { text: 'Díficl', value: 'D' }
    if (lessThenDays(dateObjective, 120))
        return { text: 'Média', value: 'M' }
    if (lessThenDays(dateObjective, 240))
        return { text: 'Fácil', value: 'F' }
    return { text: 'Super Fácil', value: 'S' }
}