interface Controlador {
    ligar(): void;
    desligar(): void;
    abrirMenu(): void;
    fecharMenu(): void;
    maisVolume(): void;
    menosVolume(): void;
    ligarMudo(): void;
    desligarMudo(): void;
    play(): void;
    pause(): void;
}

class ControleRemoto implements Controlador {
  private volume
  private ligado
  private tocando

  constructor () {
    this.volume = 50
    this.tocando = false
    this.tocando = false
  }

  private getVolume () {
    return this.volume
  }

  private setVolume (volume: number) {
    this.volume = volume
  }

  private getLigado () {
    return this.ligado
  }

  private setLigado (ligado: boolean) {
    this.ligado = ligado
  }

  private getTocando () {
    return this.tocando
  }

  private setTocando (tocando: boolean) {
    this.tocando = tocando
  }

  ligar () {
    console.log('Ligando o controle...')
  }

  desligar () {
    console.log('Desligando o controle...')
  }

  abrirMenu () {
    console.log('Abrindo o menu...')
  }

  fecharMenu () {
    console.log('Fechando o menu...')
  }

  maisVolume () {
    console.log('Aumentando o volume')
  }

  menosVolume () {
    console.log('Diminuindo o volume')
  }

  ligarMudo () {
    console.log('Ligando o mudo')
  }

  desligarMudo () {
    console.log('Desligando o mudo')
  }

  play () {
    console.log('Tocando...')
  }

  pause () {
    console.log('Pausando...')
  }
}

class Cachorro {
  nome: string
  idade: number
  peso: number

  constructor (nome: string, idade: number, peso: number) {
    this.nome = nome
    this.idade = idade
    this.peso = peso
  }

  latir () {
    console.log('Au au au')
  }

  latir (a) {
    console.log('Au au au')
  }
}
