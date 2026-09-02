# Vista Mar Hotel — Site (versão para abrir no VS Code)

## Como abrir corretamente

1. Extraia esta pasta (`hotel-site-vscode`) em qualquer lugar do seu computador.
2. Abra a pasta inteira no VS Code: **File → Open Folder...** e selecione `hotel-site-vscode`.
3. **Importante:** não adianta só clicar no `index.html` dentro do VS Code — isso abre o código-fonte, não o site.
   Para ver a página funcionando de verdade:
   - Instale a extensão **Live Server** (Ritwick Dey) no VS Code, se ainda não tiver.
   - Clique com o botão direito em `index.html` → **"Open with Live Server"**.
   - O navegador vai abrir automaticamente com o site rodando.

   Alternativa sem extensão: dê duplo clique no arquivo `index.html` pelo Explorador de Arquivos do
   Windows/Mac (fora do VS Code) para abrir direto no navegador.

## Estrutura da pasta
```
hotel-site-vscode/
├── index.html        → página principal
├── css/style.css      → estilos
├── js/main.js         → motor de busca (roda no navegador, sem precisar de servidor)
└── images/            → fotos das suítes (ilustrações geradas)
```

## Sobre as imagens
As fotos em `images/` são ilustrações estilizadas geradas para representar cada suíte
(Standard, Luxo, Master, Família, Presidencial, Econômica), pensadas para funcionar
100% offline. Quando quiser usar fotos reais do seu hotel, basta substituir os arquivos
dentro de `images/` mantendo os **mesmos nomes**:

- `hero-bg.jpg` — imagem de fundo do topo do site
- `suite-luxo-1.jpg`, `suite-luxo-2.jpg`
- `suite-master-1.jpg`, `suite-master-2.jpg`
- `suite-familia-1.jpg`
- `suite-presidencial-1.jpg`
- `suite-economica-1.jpg`

Não precisa mexer em nenhum código — é só sobrescrever os arquivos com o mesmo nome.

## Sobre o motor de busca
Nesta versão, os dados das suítes ficam dentro de `js/main.js` (array `SUITES`), e as
reservas ficam apenas na memória do navegador (somem ao recarregar a página) — ideal
para testar e apresentar o design e o funcionamento.

Para um site em produção de verdade, com banco de dados MySQL persistente, peça a
versão com back-end PHP + MySQL (já te entreguei antes como `hotel-site.zip`).
