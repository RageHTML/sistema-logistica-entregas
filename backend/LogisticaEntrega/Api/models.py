from django.db import models

class OrderStatus(models.TextChoices):
    PENDENTE = "pendente", "Pendente",
    ENVIADO = "enviado", "Enviado",
    ENTREGUE = "entregue", "Entregue",
    CANCELADO = "cancelado","Cancelado",

class Order(models.Model):
    id_client = models.CharField(max_length=50, db_index=True, null=False)
    id_product = models.CharField(max_length=50, db_index=True, null=False)
    p_name = models.CharField(max_length=255, blank=True, null=False)
    p_qnt = models.IntegerField(null=False)
    p_prc = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    p_address = models.CharField(max_length=255, null=False)
    p_status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDENTE, db_index=True, null = False)
    p_od = models.DateTimeField(auto_now_add=True, null=False)
    p_sd = models.DateTimeField(null=True, blank=True) 
    p_dd = models.DateTimeField(null=True, blank=True)  
