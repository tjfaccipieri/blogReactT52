import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokenReducer';

import './CadastroTema.css';

function CadastroTema() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  useEffect(() => {
    if (token === '') {
      alert('Ta tirando já');
      navigate('/login');
    }
  }, [token]);

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await put(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema atualizado');
      } catch (error) {
        console.log(`Deu erro: ${error}`);
        alert('Erro, por favor, verifique os campos');
      }
    } else {
      try {
        await post(`temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema cadastrado com sucesso');
      } catch (error) {
        console.log(`Deu erro: ${error}`);
        alert('Erro, por favor, verifique os campos');
      }
    }
    back();
  }

  function back() {
    navigate('/temas');
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Formulário de cadastro de tema
        </Typography>
        <TextField
          id="descricao"
          label="Descrição"
          variant="outlined"
          name="descricao"
          margin="normal"
          fullWidth
          value={tema.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        />

        <Button type="submit" variant="contained" color="primary">
          Finalizar
        </Button>
      </form>
    </Container>
  );
}

export default CadastroTema;
