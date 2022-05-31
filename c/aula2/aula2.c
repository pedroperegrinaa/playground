#include <stdio.h>
#include <stdlib.h>
#define alturaMaxima 225

typedef struct {
    int peso;
    int altura;
} PesoAltura;

int main(){
    PesoAltura pessoa1;
    pessoa1.peso = 80;
    pessoa1.altura = 185;

    PesoAltura* pessoa2 = (PesoAltura*) malloc(sizeof(PesoAltura));

    pessoa2->peso = 60;
    pessoa2->altura = 160;

    printf("Peso: %i, Altura %i. \n", pessoa1.peso, pessoa1.altura);
    if (pessoa1.altura > alturaMaxima) printf("Altura acima da maxima. \n");
    else printf("Altura abaixo da maxima. \n");

    printf("\nHello World!\n\n");
	
	return 0;
}
