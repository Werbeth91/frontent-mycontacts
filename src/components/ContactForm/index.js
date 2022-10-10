import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import { Form, ContainerButton } from './style';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService'

function ContactForm({ buttonLabel, onSubmit }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors()

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const listCategories = await CategoriesService.listCategories()
        setCategories(listCategories)

      } catch { } finally { setIsLoadingCategories(false) }

    }

    loadCategories();

  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value)

    if (!event.target.value) {
      setError({ field: 'name', message: 'O nome é obrigatório' })
    } else {
      removeError('name')
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' })
    } else {
      removeError('email')
    }

  }

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value))

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({ name, email, phone, categoryId })

  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')} >
        <Input placeholder='Nome *'
          error={getErrorMessageByFieldName('name')}
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input type='email' placeholder='E-mail'
          error={getErrorMessageByFieldName('email')}
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          maxLength='15'
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories} >
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ContainerButton>
        <Button type='submit' disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ContainerButton>

    </Form>
  )

}

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}




