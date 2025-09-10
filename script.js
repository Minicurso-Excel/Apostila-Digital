document.addEventListener('DOMContentLoaded', () => {
    const linksNavegacao = document.querySelectorAll('.link-nav');
    const secoesConteudo = document.querySelectorAll('.secao-conteudo');
    const appWrapper = document.getElementById('app-wrapper');

    const gerenciarNavegacao = (hash) => {
        if (!hash) {
            hash = '#home';
        }

        linksNavegacao.forEach(link => link.classList.remove('ativo'));
        secoesConteudo.forEach(secao => secao.classList.remove('ativo'));

        const linkAlvo = document.querySelector(`.link-nav[href="${hash}"]`);
        const secaoAlvo = document.querySelector(hash);

        if (linkAlvo) {
            linkAlvo.classList.add('ativo');
        }
        if (secaoAlvo) {
            secaoAlvo.classList.add('ativo');
            document.getElementById('conteudo-principal').scrollTop = 0;
        }

        if (window.innerWidth <= 992) {
            appWrapper.classList.remove('barra-lateral-aberta');
        }
    };

    gerenciarNavegacao(window.location.hash);

    linksNavegacao.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href');
            window.location.hash = hash;
        });
    });

    window.addEventListener('hashchange', () => {
        gerenciarNavegacao(window.location.hash);
    });


    const botoesRevelar = document.querySelectorAll('.botao.botao-revelar');
    botoesRevelar.forEach(botao => {
        botao.addEventListener('click', () => {
            const secao = botao.closest('.secao-conteudo');
            const respostas = secao.querySelectorAll('.resposta');
            respostas.forEach(resposta => {
                resposta.textContent = resposta.dataset.resposta;
                resposta.classList.add('revelada');
            });
            botao.style.display = 'none';
        });
    });


    const botoesSolucao = document.querySelectorAll('.botao-solucao');
    botoesSolucao.forEach(botao => {
        botao.addEventListener('click', () => {
            const container = botao.closest('.container-solucao');
            const solucao = container.querySelector('.solucao-oculta');
            solucao.classList.toggle('ativa');

            if (solucao.classList.contains('ativa')) {
                botao.textContent = 'Ocultar Solução';
            } else {
                botao.textContent = 'Solução (Clique para exibir)';
            }
        });
    });

    document.addEventListener('click', function (evento) {
        const clicouNoBotaoMenu = evento.target.matches('#botao-menu') ||
            evento.target.closest('#botao-menu');

        if (window.innerWidth <= 992 && clicouNoBotaoMenu) {
            appWrapper.classList.toggle('barra-lateral-aberta');
        }
    });

    document.getElementById('conteudo-principal').addEventListener('click', () => {
        if (window.innerWidth <= 992 && appWrapper.classList.contains('barra-lateral-aberta')) {
            appWrapper.classList.remove('barra-lateral-aberta');
        }
    });
});
