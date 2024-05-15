import requests
import json
import os

with open('product-images-all.json') as json_file:
    dados = json.load(json_file)

print(dados)

pasta_destino = 'imagens_produtos'

cookies = {'_ga_P6EHZG9H8E': 'GS1.1.1714067439.6.1.1714067445.54.0.0', '_ga': 'GA1.1.1767805784.1713963917', '_gid': 'GA1.3.738019516.1713963917', '_hjSessionUser_3563339': 'eyJpZCI6ImM0ZjUyYWI2LTQ5M2YtNWFiMS1hNTY3LTVmNjM5NjQ3MjZlNCIsImNyZWF0ZWQiOjE3MTM5NjM5MTc0MjIsImV4aXN0aW5nIjp0cnVlfQ==', 'PHPSESSID': 'ektu0rnq1n4kpun8fplk470psd', '_gat_UA-91734355-4': '1', '_hjSession_3563339': 'eyJpZCI6ImIzOTlhMmQwLTI0ZWQtNDM0MC04ZTlkLTlhOWY0NTM1ZTczNiIsImMiOjE3MTQwNjc0Mzk5MDcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0='}

for url_imagem in dados:

    response = requests.get(url_imagem, cookies=cookies)

    if response.status_code == 200:
        filename = response.url.split('?id=')[-1] + '.zip'
        # print(response.text)
        nome_arquivo = os.path.join(pasta_destino, os.path.basename(url_imagem.split('?id=')[-1] + '.zip'))

        with open(nome_arquivo, 'wb') as f:
            f.write(response.content)
        print(f'Arquivo "{filename}" baixado com sucesso.')
    else:
        print(f'Falha ao baixar o arquivo. Status code: {response.status_code}')