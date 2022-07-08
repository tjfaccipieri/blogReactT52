import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bp2022.herokuapp.com',
  // baseURL: 'http://localhost:8080'
});

export const cadastroUsuario = async (url: any, dados: any, setDado: any) => {
  const resposta = await api.post(url, dados);
  setDado(resposta.data);
};

export const login = async (url: any, dados: any, setDado: any) => {
  const resposta = await api.post(url, dados);
  setDado(resposta.data);
};

export const post = async(url: any, dados: any, setDados: any, headers: any) => {
  const resposta = await api.post(url, dados, headers)
  setDados(resposta.data)
}

export const buscar = async(url: any, setDado: any, headers: any) => {
  const resposta = await api.get(url, headers)
  setDado(resposta.data)
}

export const buscaId = async(url: any, setDado: any, headers: any) => {
  const resposta = await api.get(url, headers)
  setDado(resposta.data)
}

export const put = async(url: any, dados: any, setDados: any, headers: any) => {
  const resposta = await api.put(url, dados, headers)
  setDados(resposta.data)
}

export const deleteId = async(url: any, headers: any) => {
  await api.delete(url, headers)
}