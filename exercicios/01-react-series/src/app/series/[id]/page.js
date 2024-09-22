'use client'

import apiSeries from '@/app/apis/apiSeries'
import Pagina from '@/app/components/Pagina'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CardImg, Col, Row } from 'react-bootstrap'

export default function page(props) {

    const id = props.params.id
    const [serie, setSeries] = useState({})
    const [atores, setAtores] = useState([])


    useEffect(() => {
        buscarSeries()
        buscarAtores()
    }, [])

    async function buscarSeries() {
        const resultado = await apiSeries.get('/tv/' + id + '?language=pt-BR')
        console.log(resultado.data)
        setSeries(resultado.data)
    }

    async function buscarAtores() {
        const resultado = await apiSeries.get('/tv/' + id + '/credits?language=pt-BR')
        console.log(resultado.data.cast)
        setAtores(resultado.data.cast)
    }

    return (
        <Pagina titulo={serie.title}>

            {serie.id && (
                <>
                    {/* Detalhes */}
                    <Row className='mt-2'>
                        {/* Imagem do poster do filme */}
                        <Col md={3}>
                            <CardImg src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
                        </Col>

                        {/* Informações do filme */}
                        <Col m={6}>
                            <p><b>Orçamento:</b> {serie.revenue} $</p>
                            <p><b>Data de Lançamento:</b> {serie.release_date}</p>
                            <p><b>Duração:</b> {serie.runtime} min</p>
                            <p><b>Nota:</b> {serie.vote_average} ⭐</p>

                            <p><b>Generos:</b></p>
                            <ul>
                                {serie.genres.map(item => {
                                    return <li>{item.name}</li>
                                })}

                            </ul>

                            <p><b>Sinopse:</b> {serie.overview}</p>
                        </Col>

                        {/* Imagem de divulgação do filme */}
                        <Col md={3}>
                            <CardImg src={'https://image.tmdb.org/t/p/w500/' + serie.backdrop_path} />
                        </Col>
                    </Row>

                    {/* Elenco */}
                    <h2 className='text-center'>Elenco</h2>
                    <hr />
                    <Row md={6}>
                        {atores.map(ator => {
                                return (
                                    <Col className='py-2'>
                                        <Link href={"/atores/" + ator.id}>
                                            <CardImg src={"https://image.tmdb.org/t/p/w500/" + ator.profile_path} />
                                        </Link>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                </>
            )}

        </Pagina>
    )

}
