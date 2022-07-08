import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { buscar } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';

function ListaPostagem() {

  let navigate = useNavigate()

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )

  const [posts, setPosts] = useState<Postagem[]>([])

  useEffect(() => {
    if (token === '') {
      alert('Ta tirando já');
      navigate('/login');
    }
  }, [token]);

  async function getPosts(){
    await buscar('/postagens', setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getPosts()
  }, [posts.length])

  return (
    <>
      {
        posts.map(post => (
          <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {post.titulo}
            </Typography>
            <Typography variant="body2" component="p">
              {post.texto}
            </Typography>
            <Typography variant="body2" component="p">
              {post.tema?.descricao}
            </Typography>
            <Typography variant="body2" component="p">
              Postado por: {post.usuario?.nome}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/formularioPost/${post.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPost/${post.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
        ))
      }
    </>)
}

export default ListaPostagem;