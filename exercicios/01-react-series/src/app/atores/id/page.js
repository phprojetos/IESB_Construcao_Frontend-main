'use client'


import apiSeries from '@/app/apis/apiSeries'
import Pagina from '@/app/components/Pagina'
import { useEffect, useState } from 'react'
import { CardImg, Col, Row, Card, Button } from 'react-bootstrap'
import 'bootstrap';
import Serie from '@/app/series/[id]/page'


export default function page(props) {

    const id = props.params.id
    const [ator, setAtor] = useState({})
    const [series, setSeries] = useState([])

    useEffect(() => {
        buscarAtor()
        buscarSeries()
    }, [])

    async function buscarAtor() {
        const resultado = await apiSeries.get("/person/" + id + "?language=pt-BR")
        console.log(resultado.data)
        setAtor(resultado.data)
    }

    async function buscarSeries() {
        const resultado = await apiSeries.get("/person/" + id + "/credits?language=pt-BR")
        console.log(resultado.data.cast)
        setSeries(resultado.data.cast)
    }

    return (
        <Pagina titulo={ator.name}>

            {ator.id && (
                <>

                    {/*  Detalhes do Ator */}
                    <Row>
                        {/* Imagem do Ator */}
                        <Col md={3}>
                            <CardImg src={"https://image.tmdb.org/t/p/w500/" + ator.profile_path} />
                        </Col>

                        {/* Dados do Ator */}
                        <Col md={9}>
                            <p><b>Nome:</b> {ator.name}</p>
                            <p><b>Nascimento:</b> {ator.birthday}</p>
                            <p><b>Cidade:</b> {ator.place_of_birth}</p>
                            <p><b>Popularidade:</b> {ator.popularity} ❤️</p>
                            <p><b>Biografia:</b> {ator.biography}</p>
                        </Col>
                    </Row>

                    {/* Filmes do Ator */}

                    <h2 className='text-center'>Series</h2>
                    <hr />

                    <Row md={4}>

                        {series.map(serie => {
                            return (
                                <Col className="py-2">
                                    <Card style={{ height: '100%' }}>
                                        <Card.Img src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
                                        <Card.Body>
                                            <Card.Title>{serie.original_title}</Card.Title>
                                            <p><b>Nota: {serie.vote_average} ⭐</b></p>
                                        </Card.Body>
                                        <Card.Footer className="text-end">
                                            <Button href={"/serie/" + serie.id}>Detalhes</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })}

                    </Row>

                </>

            )
            }


        </Pagina>
    )
}
