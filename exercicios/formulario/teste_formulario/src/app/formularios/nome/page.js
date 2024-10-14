'use client'

import React, { useState } from 'react'
import Pagina from '@/components/Pagina'
import { Button, Form } from 'react-bootstrap'

export default function pageNome() {
  const [nome, setNome] = useState('')

  function handleNome(evento) {
    setNome(evento.target.value)
  }

  function handleEmail(evento) {
    setEmail(evento.target.value)
  }

  function reset(){
    console.log("CHAMOU O RESET")
    setNome('')
    setEmail('')
  }

  function submit(evento) {
    evento.preventDefault()
    console.log(nome,email)
  }
  return (
    <Pagina titulo="Formulário Teste">
      <Form.Group className='mb-2'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            name='nome'
            value={nome}
            onChange={handleNome}
            placeholder='Informe o seu nome'
          />
          <Form.Text>Informe o seu nome</Form.Text>
        </Form.Group>
    </Pagina>
  )
}
