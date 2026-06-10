from django.urls import path
from . import views

urlpatterns = [
    path('pedidos/', views.order_manager, name='gerenciar_pedidos'),
    path('pedidos/<int:pk>/', views.order_manager, name='detalhar_pedido'),
]