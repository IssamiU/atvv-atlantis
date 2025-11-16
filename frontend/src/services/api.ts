import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const clienteAPI = {
  listar: () => api.get('/clientes'),
  criar: (data: any) => api.post('/clientes', data),
  atualizar: (id: string, data: any) => api.put(`/clientes/${id}`, data),
  deletar: (id: string) => api.delete(`/clientes/${id}`)
};

export const hospedagemAPI = {
  listar: () => api.get('/hospedagens'),
  criar: (data: any) => api.post('/hospedagens', data),
  deletar: (id: string) => api.delete(`/hospedagens/${id}`)
};

export default api;