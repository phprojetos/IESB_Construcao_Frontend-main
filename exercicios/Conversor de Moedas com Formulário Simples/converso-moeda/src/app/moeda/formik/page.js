'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaDollarSign, FaEuroSign, FaBitcoin } from 'react-icons/fa';
import Pagina from '../../components/Pagina';

const pageformik = () => {
  const [resultado, setResultado] = useState('');

  const conversoes = {
    dolar: 0.20,
    euro: 0.18,
    bitcoin: 0.000003,
  };

  const converter = (values) => {
    const { valor, moeda } = values;
    const valorConvertido = (valor * conversoes[moeda]).toFixed(6);
    setResultado(`Resultado: ${valorConvertido} ${moeda === 'dolar' ? 'USD' : moeda === 'euro' ? 'EUR' : 'BTC'}`);
  };

  const limpar = (resetForm) => {
    resetForm();
    setResultado('');
  };

  return (
    <Pagina titulo="Convertendo Moedas">
      <div className="container mt-5">
        <h2 className="text-center mb-4">CONVERSOR</h2>
        <Formik
          initialValues={{ valor: '', moeda: 'dolar' }}
          onSubmit={converter}
        >
          {({ resetForm }) => (
            <Form className="form-group">
              <Field
                type="number"
                name="valor"
                className="form-control mb-2"
                placeholder="Valor em R$"
              />
              <Field as="select" name="moeda" className="form-control mb-2">
                <option value="dolar">Dólar</option>
                <option value="euro">Euro</option>
                <option value="bitcoin">Bitcoin</option>
              </Field>
              <div className="mt-2">
                <FaDollarSign className="mr-1" />
                <FaEuroSign className="mr-1" />
                <FaBitcoin className="mr-1" />
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Converter
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => limpar(resetForm)}>
                Limpar
              </button>
            </Form>
          )}
        </Formik>
        {resultado && <p className="mt-3 font-weight-bold">{resultado}</p>}
      </div>
    </Pagina>
  );
};

export default pageformik;