'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Spin } from 'antd';
import Cadastro from '@/app/cadastro/page';


const ModalEditor = (args: any)=>{
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(Object)

  useEffect(()=>{
    console.log('edit clicado: ', args.dados)
    setDataEdit(args.dados)
    setIsModalOpen(args.editando)
  }, [args.editando])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    args.onChildClick(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    args.onChildClick(false);
  };

  return (
    <>
      
        <Modal title="" open={isModalOpen} onCancel={handleCancel} cancelText={'Cancelar'} footer={null} width={'55vw'}>
          
            <Cadastro titulo={'Editar fornecedor'} addButtonTitle={'Salvar'} cancelDeactivate={true} backDeactivate={true} saveDeactivate={false} initialValues={dataEdit} editMode={true} submitFunctionModal={handleCancel} />
          
        </Modal>
      
    </>
  );
};

export default ModalEditor;