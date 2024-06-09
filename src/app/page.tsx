
import Link from "next/link";
import { Card, Col, Row, Popover, Image } from "antd";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
//import styles from "./page.module.css";



export default function Home() {
const text_cadastro = <span>Cadastrando fornecedores</span>;

const content_cadastro = (
  <div>
    <p>Gif</p>
    <Image height='150px' src='https://media1.tenor.com/m/YAClYZzwPn8AAAAC/hello-hi.gif'  alt="Gatinho tocando a tela" className="img-responsive"/>
  </div>
);

const text_visualizando = <span>Visualizando os fornecedores</span>;

const content_visualizando = (
  <div>
    <p>Gif</p>
    <Image src="https://media1.tenor.com/m/dG5tuneH22YAAAAC/cat-ears-cat-eyes.gif"  alt="Gatinho amarelo semi escondido dilatando as pupilas de maneira travessa" className="img-responsive"/>
  </div>
);

const text_editar = <span>Edição das informações</span>;

const content_editar = (
  <div>
    <p>Gif</p>
    <Image src="https://media1.tenor.com/m/8QsOaiMKvWQAAAAd/cat-crunch.gif"  alt="Gatinho branco comendo algo muito duro" className="img-responsive"/>
  </div>
);

  return (
    
    <div>
      <header>
        <h1 style={{textAlign: 'center', margin: '50px'}}>Dashboard de fornecedores</h1>
      </header>  
      {
        //<Navbar/>
        }
      <div style={{margin: '50px'}}>
      <Row gutter={16}>
        <Col  xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card style={{textAlign: 'center'}} title="Cadastrar" bordered={true}>
          
            Cadastre <Link href='/cadastro'>aqui</Link> novos fornecedores.
          
          </Card>
        </Col>
        <Col  xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card style={{textAlign: 'center'}} title="Visualizar" bordered={true}>
            
              Visualize <Link  href='/visualizar'>aqui</Link> a lista de fornecedores cadastrados.
            
          </Card>
        </Col>
        <Col  xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card style={{textAlign: 'center'}} title="Editar" bordered={true}>
            
              Clique <Link  href='/editar'>aqui</Link> para editar informações ou excluir fornecedores.
            
          </Card>
        </Col>
      </Row>
      </div>
      {
        //<Footer/>
      }
    </div>
    
  );
}
