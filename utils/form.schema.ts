import * as yup from 'yup';

export const jokeSchema = yup.object().shape({
    limit: yup.number().typeError('Please fill only integer number').integer('Please fill only integer number').min(1,'Please fill number more than 0'),
    firstName: yup.string().matches(/^[\u0E00-\u0E7Fa-zA-Z,.'-]+$/,{message:"Please fill only alphabet",excludeEmptyString:true}),
    lastName: yup.string().matches(/^[\u0E00-\u0E7Fa-zA-Z,.'-]+$/,{message:"Please fill only alphabet",excludeEmptyString:true}),
    category: yup.array().of(yup.string()).min(0),
})