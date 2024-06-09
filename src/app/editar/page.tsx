'use client';

import React, { useEffect, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
// src\app\GlobalRedux\Features\actions.js
//import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Empty, Button, ConfigProvider, DatePicker } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { AppDispatch, useAppSelector } from '@/redux/store';
import { reset, dellfornecedor } from '@/redux/features/auth-sices';

//import {table_columns, table_rows} from '../visualizar/table_definitions'
import {table_columns} from './table_definitions_edit.js'
import Link from 'next/link';
import BackButton from '@/app/backbutton';
import ModalEditor from '@/components/modalEditor';
import moment from 'moment'; 

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


const customizeRenderEmpty = () => (
  // sempre que não há dados, essa tela é mostrada
  <div style={{ textAlign: 'center' }}>
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description='Nenhum fornecedor salvo foi encontrado!'
    >
      <Link href='/cadastro'>
        <Button type="primary">Adicionar agora</Button>
      </Link>
    </Empty>
  </div>
);

export default function Editar() {
    const fornecedores = useAppSelector((state)=>state.authReducer.value.fornecedores)    
    const [noData, setNoData] = useState(false)
    const [edit, setEdit] = useState(false)
    const [dadosEditar, setDadosEditar] = useState(Object)

    useEffect(()=>{
      if(fornecedores.length == 0){
        setNoData(true)
      }else{      
        setNoData(false)
      }
    }, [fornecedores])

    const dispatch = useDispatch<AppDispatch>();


    const handleClickDelete = (arg: any)=>{
      dispatch(dellfornecedor(arg.processo))
    }

    const dateRefatora = (arg: any)=>{
      
      if(arg.periodo != undefined){
        if(arg.periodo.length != 2){
          return {...arg, periodo: dayjs(arg.periodo)}
        }else{
          return {
            ...arg,
            periodo: [
              dayjs(arg.periodo[0]),
              dayjs(arg.periodo[1])
            ]
          }
        }
        
      }else{
        return arg
      }
    }

    const handleClickEdit = (arg: any)=>{
      const dadosEditar_refatorados = dateRefatora(arg)
      setDadosEditar(dadosEditar_refatorados)
      setEdit(true)
    }

    const handleChildrenClick = (args: any)=>{
      setEdit(false)
    }

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Visualizar, editar ou excluir fornecedores salvos</h1>
        <ConfigProvider renderEmpty={noData ? customizeRenderEmpty : undefined}>
          <Table 
            dataSource={[...fornecedores]} 
            columns={[...table_columns, {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                  <>
                      <Button onClick={() => handleClickEdit(record)} shape='circle' icon={<EditOutlined />} style={{color: '#50FA6E'}} />
                      <Button onClick={() => handleClickDelete(record)} shape="circle" icon={<DeleteOutlined />} style={{color: '#FA5A50'}}/>
                  </>
              ),
            },]} 
            expandable={{
              expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.descricao}</p>,
            }} 
            />
        </ConfigProvider>
        <ModalEditor editando={edit} onChildClick={handleChildrenClick} dados={dadosEditar}/>
        <Link href='/'>
          <Button type="primary" danger >Tela inicial</Button>
        </Link>

        <BackButton />
      </div>
    );
  }
  