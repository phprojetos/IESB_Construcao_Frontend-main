'use client';

import React from 'react';
import Layout from '@/components/page.js'; // Certifique-se de que o caminho está correto
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  endereco: Yup.string().required('Endereço é obrigatório'),
  telefone: Yup.string().required('Telefone é obrigatório').min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  valor: Yup.number().required('Valor é obrigatório').positive('O valor deve ser positivo'),
});

const CadastroImoveis = () => {
  const handleSubmit = (values) => {
    console.log('Formulário enviado:', values);
  };

  return (
    <Layout titulo="Cadastro de Imóveis">
      <Formik
        initialValues={{ nome: '', endereco: '', telefone: '', valor: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="nome">Nome:</label>
              <Field name="nome" placeholder="Nome do imóvel" />
              <ErrorMessage name="nome" component="div" />
            </div>

            <div>
              <label htmlFor="endereco">Endereço:</label>
              <Field name="endereco" placeholder="Endereço do imóvel" />
              <ErrorMessage name="endereco" component="div" />
            </div>

            <div>
              <label htmlFor="telefone">Telefone:</label>
              <Field name="telefone">
                {({ field }) => (
                  <InputMask {...field} mask="(99) 99999-9999" placeholder="Telefone" />
                )}
              </Field>
              <ErrorMessage name="telefone" component="div" />
            </div>

            <div>
              <label htmlFor="valor">Valor:</label>
              <Field name="valor" type="number" placeholder="Valor do imóvel" />
              <ErrorMessage name="valor" component="div" />
            </div>

            <button type="submit">Cadastrar Imóvel</button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CadastroImoveis;
