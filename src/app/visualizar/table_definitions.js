import dayjs from 'dayjs';

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
        render: (_, record)=>{
            if(record.uf_cidade != undefined){
                return `${record.uf_cidade[0]}, ${record.uf_cidade[1]}`
            }else{
                return  'Não informado.'
            }
        },
    },
    {
        title: 'Período de contrato',
        dataIndex: 'periodo',
        key: 'periodo',
        render: (_, record)=>{
            console.log('render periodo: ', record.periodo)
            if(record.periodo != undefined){ // recebe o date time
                
                const periodo = record.periodo
                if(periodo.length==2){
                    const inicio = periodo[0]
                    const fim = periodo[1]
                    return `${inicio} até ${fim}`
                }else if (periodo.length > 2){
                    return record.periodo
                }
                
            }else{
                return 'Não informado.'
            }
        }
    },
    {
        title: 'Descrição do produto',
        dataIndex: 'descricao',
        key: 'descricao',
        render: (_, record)=>{
            if(record.descricao != undefined){
                if(record.descricao.length > 20){
                    return "Clique em + para ver a descrição."
                }else{
                    return record.descricao
                }
            }else{
                return 'Sem descrição.'
            }
        }
    },
  ]

export const table_rows = [
    {
        key: 1,
        processo: 'default'
    }
]