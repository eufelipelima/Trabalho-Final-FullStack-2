//Esse é um componente que possui uma aparência para
//o usuário, onde existe um espaço para o usuário 
//informar seu termo de busca, e esse espaço está
//cercado por duas imagens, do lado esquerdo o
//desenho de uma lupa e do lado direito o desenho
//de um X
//  _0|João               |X
//     João
//     João Pedro
//     João Silva

//Parte 2 do desenvolvimento da barra de busca consiste em
//permitir que um item seja selecionado - ok
//estilizar a barra de busca
//permitir que esse componente também seja validado pelo formulário em que ele está contido

import { useState, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import './barraBusca.css';
export default function BarraBusca({ placeHolder,
    dados,
    campoChave,
    campoBusca,
    funcaoSelecao,
    valor }) {

    //manipula o elemento input
    const inputBusca = useRef();
    //definição dos estados do componente
    const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState(dados); //dados utilizados para exibir o resultado
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado() {
        //exige que o termo da busca seja conhecido e que
        //esse termo seja utilizado como critério de seleção
        setDadosLista(dados.filter((item) => {
            return termoBusca.length > 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()) : false
        }
        )
        );
        let componenteResultado = document.querySelector('[data-resultado]');
        if (dadosLista.length > 0) {
            componenteResultado.style.display = 'block';
        }
        else {
            componenteResultado.style.display = "none";
        }

    }

    return (
        <Container>
            <div className='barra'>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                <Form.Control
                    type="text"
                    ref={inputBusca}
                    placeholder={placeHolder}
                    value={termoBusca}
                    required
                    onChange={e => {
                        setTermoBusca(e.target.value.toLowerCase());
                        filtrarResultado();
                        if (!itemSelecionado) {
                            //esse atribuito é utilizado pelo HTML5 para verificar
                            //se os elementos do formulário estão válidos ou não
                            e.target.setAttribute('aria-invalid', true);
                            e.target.setCustomValidity('erro');
                        }
                        else {
                            e.target.removeAttribute('aria-invalid');
                            e.target.setCustomValidity("");
                        }
                    }}
                ></Form.Control>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                    onClick={() => {
                        setTermoBusca('');
                        filtrarResultado();
                        setItemSelecionado(false);
                        funcaoSelecao({});
                        inputBusca.current.setAttribute('aria-invalid', true);
                        inputBusca.current.setCustomValidity("erro");
                    }}
                >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div className='resultado'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            //ex: cliente campoChave=cpf campoBusca=nome
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setTermoBusca(item[campoBusca]);
                                    setItemSelecionado(true);
                                    funcaoSelecao(item);
                                    //informar que o componente está "limpo" ou válido
                                    inputBusca.current.setCustomValidity("");
                                    //deixa de exibir a lista com os resultados
                                    let componenteResultado = document.querySelector('[data-resultado]');
                                    componenteResultado.style.display = "none";
                                }}>
                                {
                                    item[campoChave] + '-' + item[campoBusca]
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </Container >
    );

}