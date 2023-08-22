import datetime

# Sequências de escape ANSI para cores
RESET = "\033[0m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
CYAN = "\033[36m"
RED = "\033[31m"

def calcular_valor_estacionamento(entrada, saida):
    valor_hora = 5  # Valor cobrado por hora
    periodo = saida - entrada  # Calcula o período de tempo em que o veículo ficou estacionado
    horas_estacionado = periodo.total_seconds() / 3600  # Converte o período para horas

    valor_cobrado = valor_hora * horas_estacionado  # Calcula o valor total a ser cobrado

    return valor_cobrado

def main():
    print(GREEN + "Bem-vindo ao sistema de cálculo de valor de estacionamento. \n")
    print(YELLOW + "Digite 0 e Enter para encerrar do programa.")

    while True:
        entrada_str = input(CYAN + "Digite a data e hora de entrada (formato: YYYY-MM-DD HH:MM): ")
        if entrada_str == "0":
            print(RED + "Encerrando o programa...")
            break
        saida_str = input(CYAN + "Digite a data e hora de saída (formato: YYYY-MM-DD HH:MM): ")
        if saida_str == "0":
            print(RED + "Encerrando o programa...")
            break

        try:
            # Converter strings de entrada e saída para objetos datetime
            entrada = datetime.datetime.strptime(entrada_str, "%Y-%m-%d %H:%M")
            saida = datetime.datetime.strptime(saida_str, "%Y-%m-%d %H:%M")

            valor_total = calcular_valor_estacionamento(entrada, saida)
            print(f"O valor total a ser cobrado é R${valor_total:.2f}")
        except ValueError:
            print(RED + "Formato inválido. Certifique-se de inserir as datas no formato correto.")

if __name__ == "__main__":
    main()
