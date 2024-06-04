'use client';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function BackButton(){
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined') {
        router.back();
      }
  };

  return (
    <Button type="primary" icon={<ArrowLeftOutlined />} onClick={handleBack}>
      Voltar
    </Button>
  );
};
