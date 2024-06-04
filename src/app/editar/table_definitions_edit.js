import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { reset, dellfornecedor } from '@/redux/features/auth-sices';

//const dispatch = useDispatch();

export const table_columns = [
    {
        title: 'Processo',
        dataIndex: 'processo',
        key: 'processo',
    },
    {
        title: 'Fornecedor',
        dataIndex: 'fornecedor',
        key: 'fornecedor',
    },
    {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
    },
    {
        title: 'UF/Cidade',
        dataIndex: 'uf_cidade',
        key: 'uf_cidade',
    },
    {
        title: 'Período de contrato',
        dataIndex: 'periodo',
        key: 'periodo',
    },
    {
        title: 'Descrição do produto',
        dataIndex: 'descricao',
        key: 'descricao',
    },
    
]

export const table_rows = [
    {
        key: 1,
        processo: 'default'
    }
]