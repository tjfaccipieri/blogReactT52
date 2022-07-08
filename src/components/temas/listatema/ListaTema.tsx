import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';

function ListaTema() {
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );
  const [temas, setTemas] = useState<Tema[]>([]);

  useEffect(() => {
    if (token === '') {
      alert('Ai não meu chapa');
      navigate('/login');
    }
  }, [token]);

  async function getTema() {
    await buscar(`/temas`, setTemas, {
      headers: {
        Authorization: token,
      },
    });
    console.log(temas);
  }

  useEffect(() => {
    getTema();
  }, [temas.length]);

  return (
    <>
      {temas.map((tema) => (
        <Box m={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema numero {tema.id}
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft"
                      size="small"
                      color="primary"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaTema;
