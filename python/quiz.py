class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

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
{bcolors.OKCYAN}
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
        print(f'{bcolors.WARNING}{bcolors.UNDERLINE}\n{index + 1})', question['question'], f'{bcolors.ENDC}\n')

        for index, answer in enumerate(question['answers']):
            print(f'{index}. {bcolors.BOLD}{answer}{bcolors.ENDC}')

        userAnswer = input(f'\n{bcolors.HEADER}Digite a resposta para a questão: \n{bcolors.ENDC}')

        if userAnswer == question['correct']:
            points = points + 1

    print(f'\n{bcolors.OKGREEN}Respostas corretas: {bcolors.ENDC}')

    for index, question in enumerate(questions):
        print(f'{bcolors.WARNING}\n{index + 1})', question['question'], f'{bcolors.ENDC}')
        for index2, answer in enumerate(question['answers']):
            if index2 == int(question['correct']):
                answerNumber = int(question['correct'])
                print(f'{bcolors.OKGREEN}{answerNumber}. {answer}')

    print(f'\n{bcolors.ENDC}Você acertou {bcolors.OKGREEN}{bcolors.BOLD}{points}{bcolors.ENDC} questões!')

initQuiz()
