URL=https://www.siseducon.com.br/

# Loop infinito
while true; do
    # Envia uma solicitação GET para a URL especificada usando curl
    curl $URL 
    # Aguarda 1 segundo antes de enviar a próxima solicitação
    sleep 1
done
