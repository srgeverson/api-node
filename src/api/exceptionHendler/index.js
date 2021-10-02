const exceptionHendler = (status) => {
    switch (status) {
        case 400:
            return {
                erro: true,
                codigo: 400,
                mensagem: "O servidor não entendeu a solicitação devido a uma sintaxe inválida."
            }
        default:
            return {
                erro: true,
                codigo: 500,
                mensagem: "O servidor encontrou uma situação que não sabe como lidar."
            };
    }
}
export default exceptionHendler;