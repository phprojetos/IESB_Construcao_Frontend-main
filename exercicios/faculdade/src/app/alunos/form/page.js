'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function AlunoFormPage(props) {
  const router = useRouter()

  // Carregando as listas de faculdades e cursos
  const faculdades = JSON.parse(localStorage.getItem('faculdades')) || []
  const cursos = JSON.parse(localStorage.getItem('cursos')) || []

  const [cursosFiltrados, setCursosFiltrados] = useState([])

  // Recuperando o id para edição
  const id = props.searchParams.id
  const alunos = JSON.parse(localStorage.getItem('alunos')) || []
  const alunoEditado = alunos.find(item => item.id == id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (alunoEditado) {
      Object.assign(alunoEditado, dados)
      localStorage.setItem('alunos', JSON.stringify(alunos))
    } else {
      dados.id = v4()
      alunos.push(dados)
      localStorage.setItem('alunos', JSON.stringify(alunos))
    }

    alert("Aluno cadastrado com sucesso!")
    router.push("/alunos")
  }

  // Função para limpar o formulário
  function limpar(resetForm) {
    resetForm()
  }

  // Campos do form e valores iniciais
  const initialValues = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    faculdade: '',
    curso: '',
    periodo: '',
    matricula: '',
    foto: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    foto: Yup.string().url("URL inválida").required("Campo obrigatório"),
  })

  // Efeito para filtrar cursos pela faculdade selecionada
  useEffect(() => {
    const faculdadeSelecionada = alunoEditado ? alunoEditado.faculdade : initialValues.faculdade
    if (faculdadeSelecionada) {
      const cursosFiltrados = cursos.filter(curso => curso.faculdade === faculdadeSelecionada)
      setCursosFiltrados(cursosFiltrados)
    } else {
      setCursosFiltrados([])
    }
  }, [initialValues.faculdade, alunoEditado])

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
      <Formik
        initialValues={alunoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            {/* Dados Pessoais */}
            <h4 className="text-center">Dados Pessoais</h4>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  placeholder="Ex: João"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Sobrenome:</Form.Label>
                <Form.Control
                  name='sobrenome'
                  type='text'
                  placeholder="Ex: Silva"
                  value={values.sobrenome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.sobrenome && !errors.sobrenome}
                  isInvalid={touched.sobrenome && errors.sobrenome}
                />
                <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder="Ex: exemplo@dominio.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  name='dataNascimento'
                  type='date'
                  value={values.dataNascimento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataNascimento && !errors.dataNascimento}
                  isInvalid={touched.dataNascimento && errors.dataNascimento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  placeholder="Ex: (11) 91234-5678"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Dados Acadêmicos */}
            <h4 className="text-center">Acadêmico</h4>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Faculdade:</Form.Label>
                <Form.Select
                  name='faculdade'
                  value={values.faculdade}
                  onChange={(e) => {
                    handleChange(e)
                    const faculdadeSelecionada = e.target.value
                    const cursosFiltrados = cursos.filter(curso => curso.faculdade === faculdadeSelecionada)
                    setCursosFiltrados(cursosFiltrados)
                  }}
                  onBlur={handleBlur}
                  isValid={touched.faculdade && !errors.faculdade}
                  isInvalid={touched.faculdade && errors.faculdade}
                >
                  <option value=''>Selecione</option>
                  {faculdades.map(faculdade => <option key={faculdade.id} value={faculdade.nome}>{faculdade.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Curso:</Form.Label>
                <Form.Select
                  name='curso'
                  value={values.curso}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.curso && !errors.curso}
                  isInvalid={touched.curso && errors.curso}
                >
                  <option value=''>Selecione</option>
                  {cursosFiltrados.map(curso => <option key={curso.id} value={curso.nome}>{curso.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Período:</Form.Label>
                <Form.Select
                  name='periodo'
                  value={values.periodo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.periodo && !errors.periodo}
                  isInvalid={touched.periodo && errors.periodo}
                >
                  <option value=''>Selecione</option>
                  <option value='matutino'>Matutino</option>
                  <option value='vespertino'>Vespertino</option>
                  <option value='noturno'>Noturno</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.periodo}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Matrícula:</Form.Label>
                <Form.Control
                  name='matricula'
                  type='text'
                  placeholder="Ex: 123456"
                  value={values.matricula}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.matricula && !errors.matricula}
                  isInvalid={touched.matricula && errors.matricula}
                />
                <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  name='foto'
                  type='text'
                  placeholder="Ex: http://exemplo.com/imagem.jpg"
                  value={values.foto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.foto && !errors.foto}
                  isInvalid={touched.foto && errors.foto}
                />
                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/alunos'><FaArrowLeft /> Voltar</Button>
              <Button className='me-2' onClick={() => limpar(resetForm)} variant='danger'><FaTimes /> Limpar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
