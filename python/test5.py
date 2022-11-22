numeros=[1,3,6,8,10]
numPar=[]
numImpar=[]
i=0

def contadorPar(n):
    if n%2==0:
        numPar.append(n)

def contadorImpar(n):
    if n%2!=0:
        numImpar.append(n)

def mostrarTodosPares(numPar):
        print(numPar)

def mostrarTodosImpares(numImpar):
        print(numImpar)

while i<=len(numeros)-1:
    contadorPar(numeros[i])
    contadorImpar(numeros[i])
    i+=1

def mostrarQtdPares(array):
    print(len(array))

def mostrarQtdImpares(array):
    print(len(array))

mostrarTodosPares(numPar)
mostrarTodosImpares(numImpar)
mostrarQtdPares(numPar)
mostrarQtdImpares(numImpar)
