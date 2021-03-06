import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import User from '../../../models/User';
import { buscaId, buscar, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokenReducer';
import './CadastroPostagem.css';

function CadastroPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  //buscar o ID armazenado no Store do redux
  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null //adicionando o atributo usuário na postagem
  });

  //useState para gerar o usuario
  const [usuario, setUsuario] = useState<User>({
    id: +userId,    // Faz uma conversão de String para Number
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
})

  // verificação do token
  useEffect(() => {
    if (token === '') {
      alert('Vai pá onde?');
      navigate('/login');
    }
  }, [token]);

  // buscar todos os temas
  async function getTemas() {
    await buscar('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  // use Effect para disparar a busca por todos os temas, caso tenha id de postagem, rodar o findPostagem
  useEffect(() => {
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario // adicionar efetivamente o usuario gerado acima, na postagem que vai para o backend
    });
  }, [tema]);

  async function findByIdPostagem(id: string) {
    await buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatePostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await put('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem alterada com sucesso');
      } catch (error) {
        console.log(`deu erro: ${error}`);
        alert('Falha ao atualziar a postagem');
      }
    } else {
      try {
        console.log(postagem)
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem criada com sucesso')
      } catch (error) {
        console.log(`deu erro: ${error}`);
        alert('Falha ao criar a postagem');
      }
    }

    back();
  }

  function back() {
    navigate('/posts');
  }

  return (
    <>
      <Container maxWidth="sm" className="topo">
        <form onSubmit={onSubmit}>
          <Typography
            variant="h3"
            color="textSecondary"
            component="h1"
            align="center"
          >
            Formulário de cadastro de postagem
          </Typography>

          <TextField
            id="titulo"
            label="Titulo da postagem"
            variant="outlined"
            name="titulo"
            margin="normal"
            fullWidth
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostagem(e)}
          />
          <TextField
            id="texto"
            label="Texto da postagem"
            variant="outlined"
            name="texto"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostagem(e)}
          />

          <FormControl fullWidth variant='filled'>
            <InputLabel id="selectTema-label">Tema</InputLabel>
            <Select
              labelId="selectTema-label"
              id="selectTema"
              onChange={(e) =>
                buscaId(`/temas/${e.target.value}`, setTema, {
                  headers: {
                    Authorization: token,
                  },
                })
              }
            >
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a postagem</FormHelperText>

            <Button type="submit" variant="contained" color="primary">
              Finalizar
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}

export default CadastroPostagem;
