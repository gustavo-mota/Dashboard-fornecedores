'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// src\app\GlobalRedux\Features\actions.js

//import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import estados_cidades from './estados_cidades.json';

import { reset, setProcesso, addFornecedor, editFornecedor } from '@/redux/features/auth-sices';

import BackButton from '@/app/backbutton';

import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import {
  Button, Cascader, Checkbox, Card,
  DatePicker, Form, Input, InputNumber,
  Radio, Select, Slider, Switch, TreeSelect,
  Upload, notification
} from 'antd';
import type { NotificationArgsProps } from 'antd';

import moment from 'moment';

import Link from 'next/link';
import { AppDispatch, useAppSelector } from '@/redux/store';

export default function Cadastro(args: any) {
const [api, contextHolder] = notification.useNotification();
const [initValue, setInitValue] = useState(Object)

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const [dateDisable, setDateDisable] = useState(false)
const [notifica, setNotifica] = useState(false)

const [form] = Form.useForm();

useEffect(()=>{
  form.resetFields(); // necessário para mostrar os initValues
  setInitValue({...args.initialValues})
  if(args.initialValues != undefined){
    setDateDisable(args.initialValues.fim_indefinido)
  }
  
}, [args.initialValues])

// redux
const dispatch = useDispatch<AppDispatch>();
const fornecedoresReduxVar = useAppSelector((state)=>state.authReducer.value.fornecedores)

const openNotification = () => {
  api['success']({
    message: 'Adicionado com sucesso!',
    description:
    <Link href='/visualizar'>
      <Button type="primary">Ir para Visualizar</Button>
    </Link>,
    duration: 4,
    placement: 'topRight',
    
  });
};

const corrigeDatas = (values: any)=>{
  if(values.periodo != undefined){
    if(values.periodo.length == 2){
      // duas datas
      const new_periodo = values.periodo.map((M)=>{return M.format('YYYY-MM-DD')})
      return {...values, periodo: new_periodo}
    }else{
      // tem apenas 1 data
      const M = values.periodo
      const new_periodo_ = M.format('YYYY-MM-DD') //values.periodo.toString()
      return {...values, periodo: new_periodo_}
    }
  }else{
    return values
  }
}

const onFinish = (values: any) => {
  var values_corrected = corrigeDatas(values)
  //console.log('processo: ', values.processo)
  dispatch(setProcesso(values.processo));
  if(args.editMode){
    const index = fornecedoresReduxVar.findIndex(fornecedor => fornecedor.processo === args.initialValues.processo);
    if(index!=-1){
    var newfornecedores = [...fornecedoresReduxVar];
    newfornecedores[index] = values_corrected;
    dispatch(editFornecedor([...newfornecedores]));
    args.submitFunctionModal()
    }
  }else{
    dispatch(addFornecedor(values_corrected))
    setNotifica(true)
  }
};

//const pross = useSelector(state=>state.processo)

useEffect(()=>{
  if(notifica){
    openNotification()
    setNotifica(false)
  }
}, [notifica])


  return (
    <>
    {contextHolder}
    <Card 
      style={{ width: "50vw", padding: 30, margin: 'auto' , placeItems: 'center'}}
    >
      <h1 style={{ textAlign: 'center', fontSize: 24, fontStyle: 'bold' }}>{args.titulo ? args.titulo : 'Cadastro de fornecedores'}</h1>
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 28 }}
      layout="horizontal"
      style={{ maxWidth: 600, alignItems: 'center' }}
      onFinish={onFinish}
      initialValues={args.initialValues ? args.initialValues : undefined}
    >
      <Form.Item label="Número do processo" name='processo' rules={[{ required: true, message: 'Esse campo não pode ficar vazio!' }]}>
        <Input allowClear showCount maxLength={25} placeholder='Insira aqui o processo'/>
      </Form.Item>
      <Form.Item label="Nome do fornecedor" name='fornecedor' rules={[{ required: true, message: 'Esse campo não pode ficar vazio!' }]}>
        <Input allowClear placeholder='Insira aqui o nome' />
      </Form.Item>
      <Form.Item label="CNPJ" name='cnpj'  rules={[{ required: true, message: 'Esse campo não pode ficar vazio!' }]} >
        <Input allowClear placeholder="99.999.999/9999-99" />
      </Form.Item>      
      <Form.Item label="Cidade" name='uf_cidade' >
        <Cascader
          options={[
            ...estados_cidades
          ]}
          placeholder='Escolha a UF e a cidade'
        />
      </Form.Item>
      
      {dateDisable ? (
        <Form.Item label="Início de contrato" name='periodo'>
          <DatePicker placeholder='Início' />
        </Form.Item>
      ) : (
        <Form.Item label="Início e fim do contrato: " name='periodo'>
          <RangePicker placeholder={['Início', 'Fim']} format="YYYY-MM-DD"/>
        </Form.Item>
      )}
      
      <Form.Item label="Sem data de fim definido" name="fim_indefinido" valuePropName="checked" >
        <Checkbox 
        defaultChecked={dateDisable}
        checked={dateDisable}
        onChange={(e) => setDateDisable(e.target.checked)}
        >
          {dateDisable ? 
          'O contrato não possui data de encerramento definida' 
          : 'O contrato possui data de encerramento definida' }
        </Checkbox>
      </Form.Item>

      <Form.Item label="Descrição do produto" name='descricao'>
        <TextArea rows={4} maxLength={500} showCount placeholder='Descreve em até 500 caracteres o produto'/>
      </Form.Item>
      {
        args.saveDeactivate ? '' :
      <Form.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button type="primary" htmlType="submit"> {args.addButtonTitle ? args.addButtonTitle : 'Adicionar'}</Button>
      </Form.Item>
      }
      <Form.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button onClick={() => {
              form.resetFields();
            }} > Limpar</Button>
      </Form.Item>
      {
        args.cancelDeactivate ? '' :
      <Form.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link href='/'>
        <Button type="primary" danger> Cancelar</Button>
        </Link>
      </Form.Item>
      }
      {
        args.backDeactivate ? "" :
      <Form.Item>
        <BackButton></BackButton>
      </Form.Item>
      }
    </Form>
  </Card>
  </>
  );
}
