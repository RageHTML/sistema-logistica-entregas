import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.utils import timezone  
from .models import Order, OrderStatus

@csrf_exempt
def order_manager(request, pk=None):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            new_order = Order.objects.create(
                id_client = data["id_client"],
                id_product = data["id_product"],
                p_name = data["p_name"],
                p_qnt = int(data["p_qnt"]),
                p_prc = float(data["p_prc"]),
                p_address = data["p_address"]
            ) 
            return JsonResponse({
                "log": "Pedido criado com sucesso",
                "pedido_id": new_order.id
            }, status=201)
        except KeyError as e:
            return JsonResponse({"Erro": f"O campo {str(e)} e obrigatorio!"}, status=400)
        except Exception as e:
            return JsonResponse({"Erro": str(e)}, status=500)
        
    elif request.method == "GET":
        Orders = Order.objects.all()
        Orders_List = []
        for p in Orders:
            Orders_List.append({
                "id": p.id,
                "id_client": p.id_client,
                "id_product": p.id_product,
                "p_name": p.p_name,
                "p_qnt": p.p_qnt,
                "p_prc": p.p_prc,
                "p_address": p.p_address,
                "p_status": p.p_status,
                "p_od": p.p_od.strftime('%Y-%m-%d %H:%M:%S') if p.p_od else None,
                "p_sd": p.p_sd.strftime('%Y-%m-%d %H:%M:%S') if p.p_sd else None, 
                "p_dd": p.p_dd.strftime('%Y-%m-%d %H:%M:%S') if p.p_dd else None   
            })
        return JsonResponse(Orders_List, safe=False, status=200)

    elif request.method == "DELETE":
        if pk is None:
            return JsonResponse({"Erro": "ID do pedido nao informado"}, status=400)
        try:
            order = Order.objects.get(pk=pk)
            order.delete()
            return JsonResponse({"log": "Pedido deletado com sucesso"}, status=200)
        except Order.DoesNotExist:
            return JsonResponse({"Erro": "Pedido nao encontrado"}, status=404)

    elif request.method == "PUT": 
        if pk is None:
            return JsonResponse({"Erro": "ID do pedido nao informado"}, status=400)
        try:
            order = Order.objects.get(pk=pk)
            data = json.loads(request.body)
            
            if "p_status" in data:
                novo_status = data["p_status"].lower()
                order.p_status = novo_status
                
                if novo_status == "enviado":
                    order.p_sd = timezone.now() 
                elif novo_status == "entregue":
                    order.p_dd = timezone.now()  
                
                order.save()
                return JsonResponse({"log": "Status e datas atualizados com sucesso"}, status=200)
                
            return JsonResponse({"Erro": "p_status nao fornecido"}, status=400)
        except Order.DoesNotExist:
            return JsonResponse({"Erro": "Pedido nao encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"Erro": str(e)}, status=500)