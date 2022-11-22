def asteriscador(corpo, expressao):
    print(len(expressao))

    novaExpressao = "*"
    i= 0
    while i <= len(expressao):
        novaExpressao.join('*')
        i += 1

    print(novaExpressao)

    # expressao = expressao.replace(expressao, '*')
    print(corpo, expressao)

# ent = input('Insira o corpo da frase: ')
# ent2 = input('Insira a expressão da frase: ')

asteriscador('ent', 'ent2')
