questions = [
    {
     'question': 'Qual desses itens não é necessário para manusear o computador?',
     'answers': ['Pulseira antiestática', 'Luvas', 'Chaves imantadas', 'Placa-mãe'],
     'correct': '3'
    },
    {
     'question': 'Para que serve a pasta térmica aplicada na CPU de um computador durante a montagem?',
     'answers': ['Cobrir a CPU para reforçar sua proteção.',
                 'Cobrir as lacunas de ar entre a CPU e o cooler para ajudar na dissipação de calor.',
                 'Amenizar a pressão física na CPU feita pelo cooler.',
                 'Resfriar a CPU, aumentando assim seu desempenho.'
                 ],
     'correct': '1'
    },
]

def initQuiz():
    print(f"""\

___________           .__     ________        .__
\__    ___/___   ____ |  |__  \_____  \  __ __|__|_______
  |    |_/ __ \_/ ___\|  |  \  /  / \  \|  |  \  \___   /
  |    |\  ___/\  \___|   Y  \/   \_/.  \  |  /  |/    /
  |____| \___  >\___  >___|  /\_____\ \_/____/|__/_____
             \/     \/     \/        \__>              \/
by: @pedroribeiroou
""")

    points = 0

    for index, question in enumerate(questions):
        print(f'\n{index + 1})', question['question'], f'\n')

        for index, answer in enumerate(question['answers']):
            print(f'{index}. {answer}')

        userAnswer = input(f'\nDigite a resposta para a questão: \n')

        if userAnswer == question['correct']:
            points = points + 1

    print(f'\nRespostas corretas: ')

    for index, question in enumerate(questions):
        print(f'\n{index + 1})', question['question'], f'')
        for index2, answer in enumerate(question['answers']):
            if index2 == int(question['correct']):
                answerNumber = int(question['correct'])
                print(f'{answerNumber}. {answer}')

    print(f'\nVocê acertou {points} questões!')

initQuiz()
