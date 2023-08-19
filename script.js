
async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();

        var cidade = document.getElementById("cidade");
        var logradouro = document.getElementById("endereco");
        var estado = document.getElementById("estado");
        var bairro = document.getElementById("bairro");

        if (consultaCEPConvertida.erro) {
            throw Error("CEP não existente!");
        }
        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido, tente novamente.</p>`
        console.log(erro);
        cidade.value = "";
        logradouro.value = "";
        estado.value = "";
        bairro.value = "";
    }
}

let cep = document.getElementById("cep");
cep.addEventListener("focusout",() => buscaEndereco(cep.value));