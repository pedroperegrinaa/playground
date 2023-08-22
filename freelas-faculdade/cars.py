import datetime

def calcular_valor_estacionamento(entrada, saida):
    valor_hora = 5  # Valor cobrado por hora
    periodo = saida - entrada  # Calcula o período de tempo em que o veículo ficou estacionado
    horas_estacionado = periodo.total_seconds() / 3600  # Converte o período para horas

    valor_cobrado = valor_hora * horas_estacionado  # Calcula o valor total a ser cobrado

    return valor_cobrado

# Solicitação de entrada de dados interativa
print("Bem-vindo ao sistema de cálculo de valor de estacionamento.")
entrada_str = input("Digite a data e hora de entrada (formato: YYYY-MM-DD HH:MM): ")
saida_str = input("Digite a data e hora de saída (formato: YYYY-MM-DD HH:MM): ")

# Converter strings de entrada e saída para objetos datetime
entrada = datetime.datetime.strptime(entrada_str, "%Y-%m-%d %H:%M")
saida = datetime.datetime.strptime(saida_str, "%Y-%m-%d %H:%M")

valor_total = calcular_valor_estacionamento(entrada, saida)
print(f"O valor total a ser cobrado é R${valor_total:.2f}")
