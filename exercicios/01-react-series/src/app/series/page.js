'use client'

import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Pagina from "../components/Pagina";
import apiSeries from "@/app/apis/apiSeries";

export default function Series() {

    const [series, setSeries] = useState([])

    useEffect(() => {
        
        buscarSeries()
    }, [])

    async function buscarSeries() {
        const resultado = await apiSeries.get("/tv/popular?language=pt-BR")
        console.log(resultado.data.results)
        setSeries(resultado.data.results)
    }

    return (
        <Pagina titulo="Series Populares">

            <Row md={4}>
                {
                    series.map(serie => {
                        return (
                            <Col className="py-2">
                                <Card style={{ height: '100%' }}>
                                    <Card.Img src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
                                    <Card.Body>
                                        <Card.Title>{serie.original_title}</Card.Title>
                                        <p><b>Nota: {serie.vote_average} ⭐</b></p>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        <Button href={"/series/" + serie.id}>Detalhes</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

        </Pagina>
    )
}