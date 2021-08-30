import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

const Contact: StorefrontFunctionComponent = () => {
  const CSS_HANDLES = [
    'form_wrapper',
    'group',
    'input',
    'label',
    'form_submit',
    'message',
  ]

  const handles = useCssHandles(CSS_HANDLES)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const changeName = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setName(event.target.value)
  }

  const changeEmail = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEmail(event.target.value)
  }

  const changePhone = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setPhone(event.target.value)
  }

  const today = new Date()
  const hoje = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate()}`

  const data = {
    id: Date.now().toString(),
    name,
    email,
    telephone: phone,
    prospect_date: hoje,
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
    // console.log('Enviando informações')
    await axios
      .put(
        'https://yomcu4f1tc.execute-api.us-east-2.amazonaws.com/default/lead',
        data
      )
      .then(() => {
        // console.log('Informações enviadas', res.data)
        setSucesso(true)
        setName('')
        setPhone('')
        setEmail('')
        setTimeout(() => {
          setSucesso(false)
        }, 3000)
      })
  }

  return (
    <form className={`${handles.form_wrapper} pa4 `} onSubmit={handleSubmit}>
      <div className={`${handles.group} w-100 mt3`}>
        <label
          className={`${handles.label} db fw4 lh-copy f6 c-on-action-primary`}
          htmlFor="name"
        >
          Nome*
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nome Completo"
          required
          className={`${handles.input} mt2 pa2 input-reset ba br2 w-100 measure`}
          value={name}
          onChange={changeName}
        />
      </div>
      <div className={`${handles.group} mt3 w-50`}>
        <label
          className={`${handles.label} db fw4 lh-copy f6  c-on-action-primary`}
          htmlFor="email"
        >
          E-mail*
        </label>
        <input
          type="email"
          name="email"
          placeholder="email@email.com"
          required
          className={`${handles.input} mt2 pa2 input-reset ba br2 w-100 measure`}
          value={email}
          onChange={changeEmail}
        />
      </div>
      <div className={`${handles.group} mt3`}>
        <label
          className={`${handles.label} db fw4 lh-copy f6  c-on-action-primary`}
          htmlFor="phone"
        >
          Telefone
        </label>
        <input
          type="phone"
          name="phone"
          placeholder="(99) 99999-9999"
          className={`${handles.input} mt2 pa2 input-reset ba br2 w-100 measure`}
          value={phone}
          onChange={changePhone}
        />
      </div>
      <div className={`${handles.group} w-100 mt6`}>
        <button className={`${handles.form_submit}`} type="submit">
          {' '}
          ENVIAR{' '}
        </button>
      </div>
      {sucesso ? (
        <div className={`${handles.group} mt3 w-100`}>
          <p className={`${handles.message}`}>
            Você foi Cadastrado com sucesso :D
          </p>
        </div>
      ) : (
        ''
      )}
    </form>
  )
}

Contact.schema = {
  title: 'editor.contact.title',
  description: 'editor.contact.description',
  type: 'object',
  properties: {},
}

export default Contact
