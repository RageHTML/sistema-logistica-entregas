from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, DateTime, Enum, func, String, Index 
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
import uuid
import enum
app = FastAPI()
# uvicorn backend.main:app --reload
# rm pedidos.db para atualizar os dados
# venv\Scripts\activate
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
# Enum para Status dos Pedidos 
class StatusPedido(str,enum.Enum):
    pendente="pendente"
    enviado="enviado"
    entregue="entregue"
    cancelado="cancelado"
# tabela que representa os pedidos no banco de dados 
# cada produto possui uma UUID unica
class PedidoDB(Base):
    __tablename__ = "pedidos"
    id=Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    id_client=Column(String, nullable=False, index=True)
    id_product=Column(String, nullable=False, index=True)
    quantity=Column(Integer, nullable=False)
    address=Column(String, nullable=False)
    status=Column(Enum(StatusPedido, name="statuspedido"), nullable=False, index=True)
    data_pedido=Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    data_envio=Column(DateTime(timezone=True), nullable=True)
    data_entregue=Column(DateTime(timezone=True), nullable=True)
    #Indice compostos para otimizar filtros por tempo e status 
    __table_args__ = (
        Index("idx_status_data","status","data_pedido"),
    )

Base.metadata.create_all(bind=engine)
# sistemas frontend tem que mandar um metodo post com esses tipos de dados 
class Pedido(BaseModel):
    id_client: str
    id_product: str
    quantity: int
    address: str
    status: StatusPedido
    data_pedido: datetime | None = None
    data_envio: datetime | None = None
    data_entregue: datetime | None = None



# http://localhost:8000/pedidos 
@app.get("/pedidos")
def listar_pedidos():
    db = SessionLocal()
    pedidos = db.query(PedidoDB).all()
    return pedidos
# Criar Pedidos
@app.post("/pedidos")  # executado quando alguem fizer um post na rota 
def criar_pedido(pedido: Pedido): # o corpo da requisicao tem que ser igual a
    db = SessionLocal()
    novo = PedidoDB(id=str(uuid.uuid4()), **pedido.dict()) # criando uuid unico do pedido
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo
#
class AtualizarStatus(BaseModel):
    status: StatusPedido
@app.put("/pedidos/{id}")
def atualizar_status(id: str, dados: dict = Body(...)):
    db = SessionLocal()
    pedido = db.query(PedidoDB).filter(PedidoDB.id == id).first()
    if not pedido:
        raise HTTPException(status_code=404,detail="Pedido não encontrado")
    novo_status = dados.get("status")
    try:
        novo_status_enum = StatusPedido(novo_status)
    except ValueError:
        raise HTTPException(status_code=400, detail="Status Invalido")
    pedido.status = novo_status_enum
    if novo_status_enum == StatusPedido.enviado:
        pedido.data_envio = datetime.now()
    elif novo_status_enum == StatusPedido.entregue:
        pedido.data_entregue = datetime.now()
    db.commit()
    db.refresh(pedido)
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