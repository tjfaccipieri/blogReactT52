import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Tema from '../../../models/Tema';
import { buscaId, deleteId } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokenReducer';

function DeletarTema() {
  let navigate = useNavigate();

  const {id} = useParams<{id: string}>()

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
    if(token === ''){
      alert('Denovo??')
      navigate('/login')
    }
  },[token] )

  useEffect(() => {
    if(id !== undefined) {
      findById(id)
    }
  },[id])

  async function findById(id: string){
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function sim() {
    await deleteId(`/temas/${id}`, {
      headers: {
        'Authorization': token
      }
    })
    alert('Tema apagado com sucesso');
    navigate('/temas')
  }

  function nao(){
    navigate('/temas')
  }

  return (
    <>
      <Box m={2}>
        <Card variant='outlined'>
          <CardContent>
            <Box justifyContent='center'>
              <Typography color='textSecondary' gutterBottom>Deseja deletar o tema: </Typography>
              <Typography color='textSecondary'>{tema?.descricao} </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <Box display='flex' justifyContent='start' ml={1} mb={2}>
              <Box mx={2}>
                <Button onClick={sim} variant='contained' size='large' color='primary' className='marginLeft'>Sim</Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant='contained' size='large' color='secondary'>Não</Button>
              </Box>
            </Box>
          </CardActions>
        </Card>

      </Box>
    </>
  )
}

export default DeletarTema