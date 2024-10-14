'use client'

import {Container, Nav, Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Pagina(props) {
    

    return (
        <>

            {/* Barra de Navegação */}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/series">Na TV</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/series">Series</Nav.Link>
                        <Nav.Link href="/atores">Atores</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Barra de Titulo */}
            <div className='text-center text-white py-2 bg-secondary'>
                <h1>{props.titulo}</h1>
            </div>

            {/* Filhos -> Código da Página */}
            <Container className='mt-2'>
                {props.children}
            </Container>


        </>

    )

}
