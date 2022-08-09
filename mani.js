// 705.484.450-52 070.987.720-03

/*
7  0  5  4  8  4  4  5  0   valor
x  x  x  x  x  x  x  x  x  
10 9  8  7  6  5  4  3  2   indice
70 0  40 28 48 20 16 15 0  soma tudo = 237


formula para o primeiro digito 11 - (237 % 11) = 5 (primeiro digito)

se o digito for mair  que 9  digito vira 0

7  0  5  4  8  4  4  5  0  5
x  x  x  x  x  x  x  x  x  x
11 10 9  8  7  6  5  4  3  2
77 0  45 32 56 24 20 20 0  10 = 284

formula para o segundo digito 11 - (284 % 11) = 2

se cpf === a cfp gerado valodo

let cpf = '705.484.450-52';
let cpfLimpo = cpf.replace(/\D+/g, '')

console.log(Array.from(cpfLimpo))
*/

function ValidaCPF(cpf){
    Object.defineProperty(this, 'cpfLimpo', {
        get: function() {
            if(cpf === undefined) return false
            return cpf.replace(/\D+/g, '')
        }
    })
};

ValidaCPF.prototype.valida = function(){
    if(this.cpfLimpo.length !== 11) return false
    if(this.isSequencia()) return false

    const cpfAParvial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criarDigito(cpfAParvial)
    const digito2 = this.criarDigito(cpfAParvial + digito1)
   

    const cpfNovo = cpfAParvial + digito1 + digito2

    
    return cpfNovo === this.cpfLimpo? true : false
};

ValidaCPF.prototype.criarDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial)
    let regrecivo = cpfArray.length + 1


    let digito = cpfArray.reduce((ac, val)=>{
        ac += regrecivo * Number(val)
        regrecivo--

        return ac
    }, 0)
    digito = 11 - (digito % 11)
    return digito > 9 ? '0' : digito
}

ValidaCPF.prototype.isSequencia = function (){
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

const cpf1 = new ValidaCPF('43726531822')

if(cpf1.valida()){
     console.log(`cpf valido`)
}else{
    console.log('CPF Invalido')
}