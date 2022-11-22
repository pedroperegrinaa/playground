def qtdPalavras(frase):

    print(frase)

    if frase[:1] == ' ':
        frase = frase[1:]
    if frase[-1:] == ' ':
        frase = frase[:-1]

    print(frase)
    print(frase.count(' ') + 1)

qtdPalavras(input())
