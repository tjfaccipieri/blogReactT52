import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId, post } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokenReducer';

function DeletarPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  const [post, setPost] = useState<Postagem>();

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  useEffect(()=>{
    if (id !== undefined) {
      findPostById(id)
    }
  }, [id])

  async function findPostById(id: string) {
    buscaId(`/postagens/${id}`, setPost, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function sim() {
    try {
      await deleteId(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      alert('Postagem apagada')
      navigate('/posts')
    } catch (error) {
      console.log(`deu ruim: ${error}`)
      alert('Falha ao apagar a postagem')
    }
  }

  function nao(){
    navigate('/posts')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{post?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default DeletarPostagem;
