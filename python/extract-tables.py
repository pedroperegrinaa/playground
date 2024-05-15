import tabula

pdf_path = "./pdf.pdf"

def extrair_tabelas(pdf_path):
    tabelas = tabula.read_pdf(pdf_path, pages="all", lattice=True)
    res = tabelas[0].values.tolist()[1]
    return res

tabelas_extraidas = extrair_tabelas(pdf_path)

for tabela in tabelas_extraidas:
    print(tabela)
    # print("\n \n")
