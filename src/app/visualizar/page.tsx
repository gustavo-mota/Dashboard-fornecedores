'use client';

import React, { useEffect, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
// src\app\GlobalRedux\Features\actions.js
//import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Empty, Button, ConfigProvider } from 'antd';
import {table_columns, table_rows} from './table_definitions.js'
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import BackButton from '@/app/backbutton';

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

export default function Visualizar() {
    const fornecedores = useAppSelector((state)=>state.authReducer.value.fornecedores)    
    const [noData, setNoData] = useState(false)

    useEffect(()=>{
      if(fornecedores.length == 0){
        setNoData(true)
      }else{      
        setNoData(false)
      }
    }, [fornecedores])

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Fornecedores cadastrados no sistema</h1>
        <ConfigProvider renderEmpty={noData ? customizeRenderEmpty : undefined}>
          <Table 
            dataSource={[...fornecedores]} 
            columns={table_columns} 
            expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.descricao}</p>,
              }} 
            />
        </ConfigProvider>
        <Link href='/'>
          <Button type="primary" danger >Tela inicial</Button>
        </Link>

        <BackButton />
      </div>
    );
  }
  