# Validator for React-Form-Reducer

An extension package for [`react-form-reducer`](https://github.com/sweetscript/react-form-reducer).

The resolver wraps and uses the [`validatorjs`](https://www.npmjs.com/package/validatorjs) library, the library allows for a neat & simple way of adding validation rules. and the resolver allows for partial validation which is useful for stepped forms. You can also build and use your own resolver library if you like!


## Install

```bash
npm install react-form-reducer-validator
```

## Usage

```tsx
import { Resolver } from 'react-form-reducer-validator';

type MyValidatedFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
};

export function ValidatedForm() {
  const {
    fields,
    handleInputChange,
    validate,
    errors
  } = useForm<MyValidatedFormType>(
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false
    },
    {
      validation: new Resolver(
      	{
	      // Validation rules
          name: 'required',
          email: 'required|email',
          password: 'required',
          password_confirmation: 'required|same:password',
          terms: 'accepted'
        },
        {
	      // Custom messages
          'accepted.terms': 'Please accept the :attribute',
          'same.password_confirmation': "Passwords don't match"
        },
        [
          // Custom Validation Rules
          {
            name: 'telephone',
            callback: (fieldValue, args, attribute, data) => {
              return fieldValue.match(/^\d{3}-\d{3}-\d{4}$/);
            },
            message: 'The :attribute phone number is not in the format XXX-XXX-XXXX.'
          }
        ]
      )
    }
  );


  const handleSubmit = async ()=>{
    const { passed } = await validate()

    if(!passed){
      // throw error
    }
  }
}

```

## Contribution

![GitHub issues](https://img.shields.io/github/issues/sweetscript/react-form-reducer-validator)

Feedback, Issue reports, suggestions and contributions are appreciated and welcome.

[majid@sweetscript.com](mailto:majid@sweetscript.com)
