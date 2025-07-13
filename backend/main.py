from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String 
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
import uuid

app = FastAPI()

# uvicorn main:app --reload
# rm pedidos.db para atualizar os dados

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Database config
DATABASE_URL = "sqlite:///./pedidos.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# tabela que representa os pedidos no banco de dados 
# cada produto possui uma UUID unica
class PedidoDB(Base):
    __tablename__ = "pedidos"
    id = Column(String, primary_key=True, index=True) # UUID unico
    id_client = Column(String)
    id_product = Column(String)
    quantity = Column(Integer)
    address = Column(String)
    status = Column(String)
    hora = Column(String, default=datetime.now)

Base.metadata.create_all(bind=engine)

# sistemas frontend tem que mandar um metodo post com esses tipos de dados 
class Pedido(BaseModel):
    id_client: str
    id_product: str
    quantity: int
    address: str
    status: str

# http://localhost:8000/pedidos 
@app.get("/pedidos")
def listar_pedidos():
    db = SessionLocal()
    pedidos = db.query(PedidoDB).all()
    return pedidos
# Criar Pedidos
@app.post("/pedidos")
def criar_pedido(pedido: Pedido):
    db = SessionLocal()
    novo = PedidoDB(id=str(uuid.uuid4()), **pedido.dict()) # criando uuid unico do pedido
    db.add(novo)
    db.commit()
    db.refresh(novo)
# 
@app.put("/pedidos/{pedido_id}")
def atualizar_status(pedido_id: str, dados: dict):
    db = SessionLocal()
    pedido = db.query(PedidoDB).filter(PedidoDB.id == pedido_id).first()
    if not pedido:
        raise HTTPException(status_code=500,detail="Pedido não encontrado")
    if "status" in dados:
        pedido.status = dados["status"]
        db.commit()
    return pedido

@app.delete("/pedidos/{pedido_id}")
def deletar_pedido(pedido_id: str):
    db = SessionLocal()
    pedido = db.query(PedidoDB).filter(PedidoDB.id == pedido_id).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido nao encontrado")
    db.delete(pedido)
    db.commit()
    return {"mensagem": "Pedido deletado com sucesso"}