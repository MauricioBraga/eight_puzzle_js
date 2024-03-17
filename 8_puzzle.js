var solucao = 0;
var matriz_cores = [];
var cores = [];
var tabuleiro = [];
var movimento = 0;
var x_branco = 0;
var y_branco = 0;
var dificuldade = 100;

window.onload = function () {
    nova_partida();

}

function nova_partida() {
    inicializa_variaveis();
    embaralha_tabuleiro();
}

function inicializa_variaveis() {
    document.getElementById("resultado").innerHTML = "<strong>Dificuldade";
    
    if (frmSetup.dificuldade.value == "D") {
      dificuldade = 100;
    } else if (frmSetup.dificuldade.value == "N") {
      dificuldade = 50;
    } else {
      dificuldade = 5;
    }
    
    matriz_cores[0] = ["#FF8000", "#CC0000", "#660066"];
    matriz_cores[1] = ["#009900", "#000000", "#FF66FF"];
    matriz_cores[2] = ["#66FF66", "#0000CC", "#A8A8A8"];

    cores = ["#FF8000", "#CC0000", "#660066", "#009900", "#000000", "#FF66FF", "#66FF66", "#0000CC", "#A8A8A8"];
    
    tabuleiro[0] = [1, 2, 3];
    tabuleiro[1] = [4, 5, 6];
    tabuleiro[2] = [7, 8, 9];
    
    // guarda a posição inicial do branco (valor 9)
    x_branco = 2;
    y_branco = 2;
    movimento = 0;

    document.getElementById("jogadas_realizadas").innerHTML = "movimentos: " + movimento;

}

function preenche_tabuleiro() {
    cont = 0;
    for (i = 0; i < tabuleiro.length; i++) {
        for (j = 0; j < tabuleiro[i].length; j++) {
            cont = cont + 1;
            if (tabuleiro[i][j] != 9) {
                celulaTabela = document.getElementById('celula_' + (cont));
                matriz_cores[i][j] = cores[tabuleiro[i][j] - 1];
                document.getElementById('celula_' + (cont)).style.background = "" + matriz_cores[i][j];
                celulaTabela.innerHTML = "" + tabuleiro[i][j];
            }

            else {
                celulaTabela = document.getElementById('celula_' + (cont));
                celulaTabela.innerText = "";
                matriz_cores[i][j] = cores[tabuleiro[i][j] - 1];
                document.getElementById('celula_' + (cont)).style.background = "" + matriz_cores[i][j];
            }
        }
    }

}

function verifica_se_ganhou() {
    k = 0;
    solucao = 1;
    for (i = 0; i < tabuleiro.length; i++) {
        for (j = 0; j < tabuleiro[i].length; j++) {
            k = k + 1;
            if (tabuleiro[i][j] != k) // não venceu, solucao = 0;
                solucao = 0;
        }
    }
    return solucao;
}
function imprime_vitoria(solucao) {
    if (solucao == 1)
        document.getElementById("resultado").innerHTML = "<strong>Parabéns!!! ";
    else
        document.getElementById("resultado").innerHTML = "<strong>Dificuldade";

}


function checaControles(tecla) {
    if (tecla == 37) {
        // "esquerda"
        if ((y_branco + 1 >= 0) && (y_branco + 1 <= 2)) {
            numero = tabuleiro[x_branco][y_branco + 1];
            atualiza_tabuleiro(numero);
        }
    }
    if (tecla == 38) {
        //  "cima"
        numero = tabuleiro[x_branco + 1][y_branco];
        atualiza_tabuleiro(numero);

    }
    if (tecla == 39) {
        //   "direita";
        numero = tabuleiro[x_branco][y_branco - 1];
        atualiza_tabuleiro(numero);
    }
    if (tecla == 40) {
        //   "baixo";
        numero = tabuleiro[x_branco - 1][y_branco];
        atualiza_tabuleiro(numero);
    }
}





function atualiza_tabuleiro(jogada_realizada) {

    if ((jogada_realizada < 1) || (jogada_realizada > 8)) {
        jogada_valida = 0;
        return jogada_valida;
    }
    a = 0;
    b = 0;

    // se o cara fizer um lance inválido, jogada_valida = 0;
    jogada_valida = 1;

    // localiza o valor que será movido, e 	
    // guarda a posição dele em a e b.
    for (i = 0; i < tabuleiro.length; i++) {
        for (j = 0; j < tabuleiro[i].length; j++) {
            // procura onde está o número a ser movido.
            if (tabuleiro[i][j] == jogada_realizada) {
                a = i;
                b = j;
            }
        }
    }
    // verifica se a jogada é válida e se for, executa a jogada.
    if ((Math.abs(x_branco - a) + Math.abs(y_branco - b)) > 1) {
        // jogada inválida.
        jogada_valida = 0;
        return jogada_valida;
    }
    else {  	// jogada válida.
        temp = tabuleiro[x_branco][y_branco];
        tabuleiro[x_branco][y_branco] = tabuleiro[a][b];
        tabuleiro[a][b] = temp;

        // salva a nova posição do branco
        x_branco = a;
        y_branco = b;
        movimento = movimento + 1;
        preenche_tabuleiro();
        solucao = verifica_se_ganhou();
        imprime_vitoria(solucao);
        document.getElementById("jogadas_realizadas").innerHTML = "movimentos: " + movimento;

    }
    return jogada_valida;
}




function embaralha_tabuleiro() {

    // x e y: incrementos para realizar movimentos do branco
    // pelo tabuleiro. assumem valores 0, 1 e -1.
    temp = 0, x = 0, y = 0;
    // t1 a t4: verificações se os valores associados a x e y 
    // produzem movimentos válidos no tabuleiro.
    t1 = 0, t2 = 0, t3 = 0, t4 = 0;
    for (k = 1; k <= dificuldade; k = k + 1) {
        do {


            // chances iguais para x e y assumirem 0, 1 e -1.
            x = Math.floor((Math.random() * 3)) - 1;
            y = Math.floor((Math.random() * 3)) - 1;
            t1 = (x_branco + x);
            t2 = y_branco + y;
            t3 = Math.abs(x) + Math.abs(y);
            t4 = x + y;

        } while ((t1 > 2) || (t1 < 0) || (t2 > 2) || (t2 < 0) || (t3 > 1) || (t4 == 0));


        // realiza a movimentação do tabuleiro
        temp = tabuleiro[x_branco][y_branco];
        tabuleiro[x_branco][y_branco] = tabuleiro[x_branco + x][y_branco + y];
        tabuleiro[x_branco + x][y_branco + y] = temp;

        // guarda a nova posição do branco
        x_branco = x_branco + x;
        y_branco = y_branco + y;
    }
    preenche_tabuleiro();
}
