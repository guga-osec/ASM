// ============================================================
// ELEMENTOS DA PÁGINA PRINCIPAL
// ============================================================

const input =
    document.getElementById('barra_pesquisa');


const checkboxes =
    document.querySelectorAll(
        'input[type="checkbox"]'
    );


// ============================================================
// ELEMENTOS DA PÁGINA DE OPÇÕES
// ============================================================

const inputsChoices =
    document.querySelectorAll(
        '.inputs_choices'
    );


const fileInput =
    document.getElementById(
        'fileInput'
    );


const fileName =
    document.getElementById(
        'fileName'
    );


const button =
    document.getElementById(
        'button'
    );


const removeButton =
    document.getElementById(
        'removeButton'
    );


// ============================================================
// CONSULTA PADRÃO
// ============================================================

const consultaPadrao = {

    // Opções da página principal

    'pt_site': 'site:.pt',

    'PDF_just_opt': 'filetype:pdf',

    'docx_just_opt': 'filetype:docx',

    'xlsx_just_opt': 'filetype:xlsx',


    // Opções avançadas

    'Exatamente': '',

    'site': '',

    'filetype': '',

    'intitle': '',

    'intext': '',

    'inurl': '',

    'inanchor': '',

    'related': '',

    'excluir': '',

    'before': '',

    'after': ''

};


// ============================================================
// CARREGAR CONSULTA DO LOCALSTORAGE
// ============================================================

let consulta = {
    ...consultaPadrao
};


const consultaGuardada =
    localStorage.getItem(
        'consulta'
    );


if (consultaGuardada) {

    try {

        const consultaJSON =
            JSON.parse(
                consultaGuardada
            );


        if (
            typeof consultaJSON === 'object' &&
            consultaJSON !== null &&
            !Array.isArray(consultaJSON)
        ) {

            consulta = {

                ...consultaPadrao,

                ...consultaJSON

            };

        }

    }

    catch (error) {

        console.error(
            'Erro ao carregar consulta:',
            error
        );


        consulta = {
            ...consultaPadrao
        };

    }

}


// ============================================================
// ORDEM DOS INPUTS DA PÁGINA ADVANCED CHOOSING
// ============================================================

const operadores = [

    'Exatamente',

    'site',

    'filetype',

    'intitle',

    'intext',

    'inurl',

    'inanchor',

    'related',

    'excluir',

    'before',

    'after'

];


// ============================================================
// GUARDAR CONSULTA
// ============================================================

function guardarConsulta() {

    localStorage.setItem(
        'consulta',
        JSON.stringify(
            consulta
        )
    );


    console.log(
        'Consulta guardada:',
        consulta
    );

}


// ============================================================
// PÁGINA ADVANCED CHOOSING
// ============================================================
//
// Só executa se existirem os inputs .inputs_choices
// ============================================================

if (
    inputsChoices.length > 0
) {


    // ========================================================
    // CARREGAR VALORES GUARDADOS NOS INPUTS
    // ========================================================

    inputsChoices.forEach(
        (inputElement, index) => {

            const operador =
                operadores[index];


            if (!operador) {
                return;
            }


            const valor =
                consulta[operador];


            if (!valor) {
                return;
            }


            let valorInput =
                valor;


            // Exatamente

            if (
                operador === 'Exatamente'
            ) {

                valorInput =
                    valor
                        .replace(/^"/, '')
                        .replace(/"$/, '');

            }


            // Retirar palavra

            else if (
                operador === 'excluir'
            ) {

                valorInput =
                    valor
                        .replace(/^-/, '');

            }


            // Restantes

            else {

                const prefixo =
                    `${operador}:`;


                if (
                    valor.startsWith(
                        prefixo
                    )
                ) {

                    valorInput =
                        valor.substring(
                            prefixo.length
                        );

                }

            }


            inputElement.value =
                valorInput;

        }
    );


    // ========================================================
    // ENTER NOS INPUTS
    // ========================================================

    inputsChoices.forEach(
        (inputElement, index) => {

            inputElement.addEventListener(
                'keydown',
                (event) => {

                    if (
                        event.key !== 'Enter'
                    ) {

                        return;

                    }


                    event.preventDefault();


                    const valor =
                        inputElement.value.trim();


                    const operador =
                        operadores[index];


                    if (!operador) {
                        return;
                    }


                    // ----------------------------------------
                    // INPUT VAZIO
                    // ----------------------------------------

                    if (valor === '') {

                        consulta[operador] =
                            '';


                        guardarConsulta();


                        console.log(
                            `Removido: ${operador}`
                        );


                        return;

                    }


                    // ----------------------------------------
                    // EXATAMENTE
                    // ----------------------------------------

                    if (
                        operador === 'Exatamente'
                    ) {

                        consulta[operador] =
                            `"${valor}"`;

                    }


                    // ----------------------------------------
                    // EXCLUIR
                    // ----------------------------------------

                    else if (
                        operador === 'excluir'
                    ) {

                        consulta[operador] =
                            `-${valor}`;

                    }


                    // ----------------------------------------
                    // OUTROS
                    // ----------------------------------------

                    else {

                        consulta[operador] =
                            `${operador}:${valor}`;

                    }


                    guardarConsulta();


                    console.log(
                        'Opção guardada:',
                        consulta[operador]
                    );

                }
            );

        }
    );

}


// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

if (input) {

    input.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key !== 'Enter'
            ) {

                return;

            }


            event.preventDefault();


            const texto =
                input.value.trim();


            if (texto === '') {

                return;

            }


            fazerPesquisa(
                texto
            );

        }
    );

}


// ============================================================
// FAZER PESQUISA
// ============================================================

function fazerPesquisa(texto) {

    const partes = [];


    // ========================================================
    // TEXTO PRINCIPAL
    // ========================================================

    const exatamente =
        Array.from(
            checkboxes
        ).some(
            checkbox =>
                checkbox.checked &&
                checkbox.value === 'Exatamente'
        );


    if (exatamente) {

        partes.push(
            `"${texto}"`
        );

    }

    else {

        partes.push(
            texto
        );

    }


    // ========================================================
    // CHECKBOXES
    // ========================================================

    checkboxes.forEach(
        checkbox => {

            if (
                !checkbox.checked
            ) {

                return;

            }


            const valor =
                checkbox.value;


            // Já foi tratado acima

            if (
                valor === 'Exatamente'
            ) {

                return;

            }


            // Adicionar opção

            if (
                consulta[valor]
            ) {

                partes.push(
                    consulta[valor]
                );

            }

        }
    );


    // ========================================================
    // OPÇÕES AVANÇADAS
    // ========================================================

    const opcoesAvancadas =
        obterOpcoesAvancadas();


    opcoesAvancadas.forEach(
        opcao => {

            if (
                !partes.includes(
                    opcao
                )
            ) {

                partes.push(
                    opcao
                );

            }

        }
    );


    // ========================================================
    // EXPRESSÃO FINAL
    // ========================================================

    const pesquisaFinal =
        partes.join(' ');


    console.log(
        '--------------------------------'
    );


    console.log(
        'Texto:',
        texto
    );


    console.log(
        'Consulta:',
        consulta
    );


    console.log(
        'Expressão final:',
        pesquisaFinal
    );


    console.log(
        '--------------------------------'
    );


    // ========================================================
    // ABRIR NOVA JANELA
    // ========================================================

    abrirGoogle(
        pesquisaFinal
    );

}


// ============================================================
// OBTER OPÇÕES AVANÇADAS
// ============================================================

function obterOpcoesAvancadas() {

    const opcoes = [];


    const nomes = [

        'site',

        'filetype',

        'intitle',

        'intext',

        'inurl',

        'inanchor',

        'related',

        'excluir',

        'before',

        'after'

    ];


    nomes.forEach(
        nome => {

            const valor =
                consulta[nome];


            if (
                valor &&
                valor.trim() !== ''
            ) {

                opcoes.push(
                    valor
                );

            }

        }
    );


    return opcoes;

}


// ============================================================
// ABRIR GOOGLE
// ============================================================

function abrirGoogle(pesquisa) {

    const url =
        'https://www.google.com/search?q=' +
        encodeURIComponent(
            pesquisa
        );


    window.open(
        url,
        '_blank'
    );

}


// ============================================================
// FICHEIRO JSON
// ============================================================

if (
    fileInput &&
    fileName
) {

    // ----------------------------------------
    // Nome anteriormente guardado
    // ----------------------------------------

    const nomeGuardado =
        localStorage.getItem(
            'nomeFicheiro'
        );


    if (nomeGuardado) {

        mostrarNomeFicheiro(
            nomeGuardado
        );

    }


    // ----------------------------------------
    // Escolher novo ficheiro
    // ----------------------------------------

    fileInput.addEventListener(
        'change',
        function () {

            if (
                this.files.length > 0
            ) {

                const file =
                    this.files[0];


                mostrarNomeFicheiro(
                    file.name
                );

            }

            else {

                fileName.textContent =
                    '';

            }

        }
    );

}


// ============================================================
// MOSTRAR NOME DO FICHEIRO
// ============================================================

function mostrarNomeFicheiro(nome) {

    if (!fileName) {
        return;
    }


    fileName.textContent =
        nome;


    fileName.style.marginLeft =
        '15px';


    fileName.style.backgroundColor =
        'grey';


    fileName.style.color =
        'white';


    fileName.style.padding =
        '10px';


    fileName.style.borderRadius =
        '7px';

}


// ============================================================
// CARREGAR JSON
// ============================================================

if (
    button &&
    fileInput
) {

    button.addEventListener(
        'click',
        async () => {

            const file =
                fileInput.files[0];


            if (!file) {

                console.log(
                    'Nenhum ficheiro selecionado.'
                );

                return;

            }


            // ----------------------------------------
            // Verificar extensão
            // ----------------------------------------

            const extensao =
                file.name
                    .split('.')
                    .pop()
                    .toLowerCase();


            if (
                extensao !== 'json'
            ) {

                console.log(
                    'Erro: seleciona um ficheiro .json'
                );

                return;

            }


            try {

                // ------------------------------------
                // Ler ficheiro
                // ------------------------------------

                const texto =
                    await file.text();


                // ------------------------------------
                // Converter JSON
                // ------------------------------------

                const novaConsulta =
                    JSON.parse(
                        texto
                    );


                // ------------------------------------
                // Verificar objeto
                // ------------------------------------

                if (
                    typeof novaConsulta !== 'object' ||
                    novaConsulta === null ||
                    Array.isArray(novaConsulta)
                ) {

                    console.log(
                        'O JSON tem de conter um objeto.'
                    );

                    return;

                }


                // ------------------------------------
                // Guardar
                // ------------------------------------

                consulta = {

                    ...consultaPadrao,

                    ...novaConsulta

                };


                guardarConsulta();


                // ------------------------------------
                // Guardar nome
                // ------------------------------------

                localStorage.setItem(
                    'nomeFicheiro',
                    file.name
                );


                mostrarNomeFicheiro(
                    file.name
                );


                // ------------------------------------
                // Atualizar inputs
                // ------------------------------------

                atualizarInputs();


                console.log(
                    'JSON carregado!'
                );


                console.log(
                    consulta
                );

            }

            catch (error) {

                console.error(
                    'Erro no ficheiro JSON:',
                    error
                );

            }

        }
    );

}


// ============================================================
// ATUALIZAR INPUTS DA PÁGINA DE OPÇÕES
// ============================================================

function atualizarInputs() {

    if (
        inputsChoices.length === 0
    ) {

        return;

    }


    inputsChoices.forEach(
        (inputElement, index) => {

            const operador =
                operadores[index];


            if (!operador) {
                return;
            }


            const valor =
                consulta[operador];


            if (!valor) {

                inputElement.value =
                    '';

                return;

            }


            let valorInput =
                valor;


            if (
                operador === 'Exatamente'
            ) {

                valorInput =
                    valor
                        .replace(/^"/, '')
                        .replace(/"$/, '');

            }


            else if (
                operador === 'excluir'
            ) {

                valorInput =
                    valor
                        .replace(/^-/, '');

            }


            else {

                const prefixo =
                    `${operador}:`;


                if (
                    valor.startsWith(
                        prefixo
                    )
                ) {

                    valorInput =
                        valor.substring(
                            prefixo.length
                        );

                }

            }


            inputElement.value =
                valorInput;

        }
    );

}


// ============================================================
// REMOVER CONSULTA
// ============================================================

if (removeButton) {

    removeButton.addEventListener(
        'click',
        () => {

            // ----------------------------------------
            // Apagar localStorage
            // ----------------------------------------

            localStorage.removeItem(
                'consulta'
            );


            localStorage.removeItem(
                'nomeFicheiro'
            );


            // ----------------------------------------
            // Restaurar consulta
            // ----------------------------------------

            consulta = {
                ...consultaPadrao
            };


            // ----------------------------------------
            // Limpar inputs
            // ----------------------------------------

            inputsChoices.forEach(
                inputElement => {

                    inputElement.value =
                        '';

                }
            );


            // ----------------------------------------
            // Limpar ficheiro
            // ----------------------------------------

            if (fileInput) {

                fileInput.value =
                    '';

            }


            // ----------------------------------------
            // Limpar nome
            // ----------------------------------------

            if (fileName) {

                fileName.textContent =
                    '';

                fileName.removeAttribute(
                    'style'
                );

                fileName.className =
                    '';

            }


            console.log(
                'Consulta removida.'
            );


            console.log(
                'Consulta restaurada:',
                consulta
            );

        }
    );

}
