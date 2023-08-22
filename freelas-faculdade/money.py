import json
import urllib.request

def obter_cotacao_dolar_para_rupia():
    url = "https://open.er-api.com/v6/latest/USD"
    
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode("utf-8"))
        
        if "result" in data and data["result"] == "success":
            cotacao = data["rates"]["INR"]
            return cotacao
        else:
            print("Não foi possível obter a cotação. Verifique a API ou tente novamente mais tarde.")
            return None
    except Exception as e:
        print(f"Erro ao obter cotação: {e}")
        return None

def converter_dolar_para_rupia(dolar, taxa):
    rupia = dolar * taxa
    return rupia

try:
    cotacao_dolar_para_rupia = obter_cotacao_dolar_para_rupia()

    if cotacao_dolar_para_rupia is not None:
        valor_em_dolar = float(input("Digite o valor em DÓLAR AMERICANO: "))
        valor_em_rupia = converter_dolar_para_rupia(valor_em_dolar, cotacao_dolar_para_rupia)
        print(f"O valor em Rúpia Indiana é: {valor_em_rupia:.2f} INR")
except ValueError:
    print("Por favor, insira um valor numérico válido.")
