'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([])
  const [faculdades, setFaculdades] = useState([])
  const [cursos, setCursos] = useState([])
  const [cursoFiltrado, setCursoFiltrado] = useState('')

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    const faculdadesLocalStorage = JSON.parse(localStorage.getItem("faculdades")) || []
    const cursosLocalStorage = JSON.parse(localStorage.getItem("cursos")) || []

    // guarda as listas no estado
    setAlunos(alunosLocalStorage)
    setFaculdades(faculdadesLocalStorage)
    setCursos(cursosLocalStorage)

    console.log(alunosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(aluno) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nome}?`)) {
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      setAlunos(novaLista)
      alert("Aluno excluído com sucesso!")
    }
  }

  // Filtra os cursos pela faculdade selecionada
  function filtrarCursos(faculdade) {
    setCursoFiltrado(faculdade);
  }

  return (
    <Pagina titulo={"Lista de Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo Aluno</Button>
      </div>

      {/* Filtro de Faculdade */}
      <Form.Group className="mb-3">
        <Form.Label>Filtrar por Faculdade:</Form.Label>
        <Form.Select onChange={(e) => filtrarCursos(e.target.value)}>
          <option value=''>Selecione uma faculdade</option>
          {faculdades.map(faculdade => (
            <option key={faculdade.id} value={faculdade.nome}>{faculdade.nome}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Tabela com os Alunos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Matrícula</th>
            <th>Foto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alunos
            .filter(aluno => !cursoFiltrado || aluno.faculdade === cursoFiltrado) // Filtra alunos pela faculdade
            .map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.sobrenome}</td>
                <td>{aluno.email}</td>
                <td>{new Date(aluno.dataNascimento).toLocaleDateString()}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.faculdade}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.periodo}</td>
                <td>{aluno.matricula}</td>
                <td><img src={aluno.foto} alt={aluno.nome} width="100" /></td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/alunos/form?id=${aluno.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(aluno)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
