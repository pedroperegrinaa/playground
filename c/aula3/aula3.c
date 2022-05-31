#include <stdio.h>
#include <stdlib.h>


void imprimir(int* w){
    printf("v0: %i, v1: %i, v2: %i", w[0], w[1], w[2]);
    printf("&w: %p, w: %p, *w: %p\n\n", &w, w, *w);
}

int main(){

    int x[3];

    x[0] = 1;
    x[1] = 2;
    x[2] = 3;

    printf("x0: %i x1: %i x2: %i\n", x[0], x[1], x[2]);
    printf("&x: %p, x1: %p, x2: %p\n\n", &x, x, *x);

    imprimir(x);

    return 0;
}