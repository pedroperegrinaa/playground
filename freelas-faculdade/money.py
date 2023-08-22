import json
import urllib.request

# Sequências de escape ANSI para cores
RESET = "\033[0m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
CYAN = "\033[36m"
RED = "\033[31m"

def obter_cotacao_dolar_para_rupia():
    url = "https://open.er-api.com/v6/latest/USD"
    
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode("utf-8"))
        
        if "result" in data and data["result"] == "success":
            cotacao = data["rates"]["INR"]
            return cotacao
        else:
            print(RED + "Não foi possível obter a cotação. Verifique a API ou tente novamente mais tarde.")
            return None
    except Exception as e:
        print(f"Erro ao obter cotação: {e}")
        return None

def converter_dolar_para_rupia(dolar, taxa):
    rupia = dolar * taxa
    return rupia

while True:
    print(YELLOW + "Digite 0 e Enter para encerrar do programa.")
    try:
        cotacao_dolar_para_rupia = obter_cotacao_dolar_para_rupia()

        if cotacao_dolar_para_rupia is not None:
            valor_em_dolar_str = input(CYAN + "Digite o valor em DÓLAR AMERICANO (ou 0 para encerrar): ")
            
            if valor_em_dolar_str == "0":
                print(RED + "Encerrando o programa...")
                break
                
            valor_em_dolar = float(valor_em_dolar_str)
            valor_em_rupia = converter_dolar_para_rupia(valor_em_dolar, cotacao_dolar_para_rupia)
            print(f"O valor em Rúpia Indiana é: {valor_em_rupia:.2f} INR")
    except ValueError:
        print(RED + "Por favor, insira um valor numérico válido.")
