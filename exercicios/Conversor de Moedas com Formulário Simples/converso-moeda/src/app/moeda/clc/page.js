'use client';

import { useState } from 'react';
import Pagina from '../../components/Pagina';

export default function HomePage(){
 {
    const [valor, setValor] = useState('');
    const [moeda, setMoeda] = useState('dolar');
    const [resultado, setResultado] = useState('');
  
    const conversoes = {
      dolar: 0.20,
      euro: 0.18,
      bitcoin: 0.000003,
    };
  
    const converter = () => {
      const valorConvertido = (valor * conversoes[moeda]).toFixed(6);
      setResultado(`Resultado: ${valorConvertido} ${moeda === 'dolar' ? 'USD' : moeda === 'euro' ? 'EUR' : 'BTC'}`);
    };
  
    const limpar = () => {
      setValor('');
      setMoeda('dolar');
      setResultado('');
    };
  
    return (

      <Pagina titulo="Convertendo Moedas">
      <div className="container mt-5">
        <h2 className="text-center mb-4">CONVERSOR</h2>
        <div className="form-group">
          <input
            type="number"
            className="form-control mb-2"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor em R$"
          />
          <select
            className="form-control mb-2"
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
          >
            <option value="dolar">Dólar</option>
            <option value="euro">Euro</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
          <button className="btn btn-primary mr-2" onClick={converter}>
            Converter
          </button>
          <button className="btn btn-secondary" onClick={limpar}>
            Limpar
          </button>
        </div>
        {resultado && <p className="mt-3 font-weight-bold">{resultado}</p>}
      </div>
      </Pagina>
    );
  };
}

