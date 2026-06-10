# Conteúdo do Ebook para montagem no Canva
**Trabalho Final — Ambientes de Desenvolvimento de Software (2026.1)**

Como usar: cada bloco abaixo corresponde a uma página/seção do ebook. Copie o texto para as páginas do Canva e aplique o design (sugestão de paleta: verde Node #339933 / #5ddb8a, azul escuro #0a1628, fundo claro). Os pontos marcados com [PRINT] indicam onde inserir capturas de tela reais.

---

## PÁGINA 1 — CAPA

**Selo:** EBOOK • AMBIENTES DE DESENVOLVIMENTO DE SOFTWARE

**Título:** Node.js na Prática: do código ao deploy na nuvem

**Subtítulo:** Construindo uma aplicação CRUD completa com JavaScript no back-end — ferramentas, versionamento com Git e GitHub, deploy na AWS e boas práticas de qualidade.

**Autores:**
- Matheus Albuquerque Bezerra Porto
- João Gabriel Sousa e Silva
- Felipe Diniz Mariano
- Thiago Yan De Paula Lima
- Rafaele Gomes
- Paulo Haskley Queiroz de Lima

**Rodapé:** Universidade de Fortaleza — Análise e Desenvolvimento de Sistemas • 2026.1

---

## PÁGINA 2 — SUMÁRIO

01. Introdução ao Node.js — O que é, como funciona, história e onde é usado
02. Ferramentas de Desenvolvimento — VS Code, npm, Express, Supabase e configuração do ambiente
03. Passo a Passo: Construindo a Aplicação — Uma API REST de produtos com front-end web
04. Versionamento com Git e GitHub — Commits, branches, pull requests e boas práticas
05. Deploy na Nuvem (AWS EC2) — Publicando o front-end e o back-end em máquinas virtuais
06. Testes e Qualidade de Software — Jest, Supertest, ESLint e integração contínua
07. Conclusão e Reflexão — Desafios enfrentados e aprendizados da equipe

---

## CAPÍTULO 01 — INTRODUÇÃO AO NODE.JS

**Frase de abertura:** E se a mesma linguagem que dá vida às páginas web pudesse também rodar no servidor? Essa é a ideia por trás do Node.js.

### O que é o Node.js?
O Node.js é um ambiente de execução (runtime) que permite rodar JavaScript fora do navegador. Antes dele, o JavaScript era uma linguagem exclusiva do front-end: servia para criar interatividade nas páginas, mas não para construir servidores, acessar bancos de dados ou manipular arquivos. O Node.js mudou isso ao levar o motor V8 — o mesmo que executa JavaScript dentro do Google Chrome — para qualquer computador ou servidor.

Na prática, isso significa que um desenvolvedor pode usar uma única linguagem para todo o sistema: o JavaScript escreve tanto a interface que o usuário vê quanto a lógica que roda no servidor. Foi exatamente essa a abordagem usada no projeto deste ebook.

### Um pouco de história
O Node.js foi criado em 2009 por Ryan Dahl, que estava insatisfeito com a forma como os servidores web da época lidavam com muitas conexões simultâneas. A solução dele foi um modelo baseado em eventos e operações não bloqueantes: em vez de criar um processo pesado para cada usuário conectado, o Node.js usa um laço de eventos (event loop) que atende milhares de requisições de forma assíncrona, com baixo consumo de memória.

Em 2010 surgiu o npm (Node Package Manager), o gerenciador de pacotes que hoje é o maior ecossistema de bibliotecas de software do mundo. Em 2015, a comunidade se reorganizou sob a Node.js Foundation (hoje parte da OpenJS Foundation), garantindo a evolução aberta e contínua da plataforma.

### Como ele funciona?
O coração do Node.js é o event loop. Imagine um restaurante com um único garçom extremamente eficiente: ele anota o pedido da mesa 1, e enquanto a cozinha prepara o prato, já vai atender as mesas 2 e 3 — em vez de ficar parado esperando. Quando a cozinha avisa que o prato está pronto, ele o entrega. O Node.js trabalha da mesma forma: enquanto espera uma resposta do banco de dados, ele já atende outras requisições.

[IMAGEM: diagrama do event loop — requisições → event loop (thread única) → banco de dados / resposta. Descrição alternativa: diagrama com três blocos; requisições de usuários entram em um círculo central chamado event loop, que delega tarefas demoradas e devolve respostas sem bloquear o atendimento.]

### Vantagens e onde é mais utilizado
- **Uma linguagem só:** JavaScript no front-end e no back-end reduz a curva de aprendizado da equipe.
- **Alta performance em I/O:** ideal para APIs, chats e aplicações em tempo real com muitas conexões.
- **Ecossistema gigante:** o npm oferece pacotes prontos para quase tudo.
- **Comunidade ativa:** usado por Netflix, Uber, LinkedIn, PayPal e milhares de startups.

Usos mais comuns: APIs REST (caso deste projeto), microsserviços, aplicações em tempo real, ferramentas de linha de comando e automações.

---

## CAPÍTULO 02 — FERRAMENTAS DE DESENVOLVIMENTO

**Frase de abertura:** Um bom ambiente de desenvolvimento é como uma oficina organizada: cada ferramenta tem seu papel e o trabalho flui melhor.

### As ferramentas do projeto (tabela)
| Ferramenta | Categoria | Papel no projeto |
|---|---|---|
| VS Code | Editor / IDE | Escrita do código, extensões para JavaScript e Git integrado |
| Node.js + npm | Runtime e gerenciador | Executa o servidor e instala as bibliotecas |
| Express | Framework web | Cria as rotas da API REST de forma simples |
| Supabase | Banco de dados | PostgreSQL gerenciado na nuvem, com painel visual |
| Git + GitHub | Versionamento | Histórico de alterações e trabalho em equipe |
| Postman | Teste de API | Testa as rotas antes do front-end existir |
| AWS EC2 | Nuvem | Máquinas virtuais onde a aplicação foi publicada |

### Bibliotecas utilizadas
- `express` — framework minimalista que organiza as rotas HTTP da API
- `@supabase/supabase-js` — cliente oficial para conversar com o banco PostgreSQL
- `cors` — libera o acesso à API a partir de outros endereços (essencial porque front e back rodam em servidores diferentes)
- `dotenv` — carrega senhas e chaves de um arquivo .env, mantendo segredos fora do código

### Configurando o ambiente do zero
**Passo 1 — Instalar o Node.js.** Baixar a versão LTS em nodejs.org e confirmar no terminal:
```
node -v   # ex.: v22.14.0
npm -v    # ex.: 10.9.2
```

**Passo 2 — Criar o projeto** (o package.json é a "certidão de nascimento" do projeto):
```
mkdir backend && cd backend
npm init -y
```

**Passo 3 — Instalar as dependências:**
```
npm install express cors dotenv @supabase/supabase-js
```

**Passo 4 — Criar o arquivo .env:**
```
SUPABASE_URL=https://seuprojeto.supabase.co
SUPABASE_KEY=sua-chave-secreta
PORT=3000
```

**⚠ Atenção:** o arquivo .env guarda segredos e NUNCA deve ser enviado ao GitHub. Ele precisa estar no .gitignore.

[PRINT: VS Code aberto com a estrutura do projeto (pastas backend e frontend). Descrição alternativa: editor VS Code exibindo a árvore de arquivos do projeto com o terminal integrado aberto.]

---

## CAPÍTULO 03 — PASSO A PASSO: CONSTRUINDO A APLICAÇÃO

**Frase de abertura:** A aplicação desenvolvida é um CRUD de produtos: um sistema que permite Criar, Listar (Read), Atualizar (Update) e Deletar produtos de um estoque.

### A arquitetura
O sistema foi dividido em três partes independentes, cada uma rodando em um lugar diferente — uma arquitetura comum em aplicações reais na nuvem:

[IMAGEM: diagrama — Usuário (navegador) → Front-end HTML+CSS+JS (VM EC2 #1) → Back-end Node.js+Express (VM EC2 #2) → Supabase PostgreSQL. Descrição alternativa: fluxo da esquerda para a direita, do navegador ao banco de dados.]

### O banco de dados
No Supabase foi criada a tabela `produtos`, com as colunas: id (chave primária auto-increment), nome, descricao, preco, quantidade e created_at (automática).

### O servidor Express
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
app.use(cors());          // permite acesso do front-end
app.use(express.json());  // entende requisições em JSON
const PORT = process.env.PORT || 3000;
```

### As rotas da API — exemplo de listagem (GET /produtos)
```javascript
app.get('/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});
```

### Criação de produto (POST /produtos) — com validação
```javascript
app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  if (!nome || !descricao || !preco || quantidade === undefined) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, descricao, preco, quantidade }])
    .select();
  res.status(201).json(data[0]);
});
```

### Tabela de rotas
| Método | Rota | Ação | Sucesso |
|---|---|---|---|
| GET | /produtos | Lista todos | 200 + lista JSON |
| GET | /produtos/:id | Busca um | 200 (404 se não existir) |
| POST | /produtos | Cria | 201 + produto criado |
| PUT | /produtos/:id | Atualiza | 200 + produto atualizado |
| DELETE | /produtos/:id | Exclui | 200 + confirmação |

### O front-end
Interface em HTML, CSS e JavaScript puros — o consumo da API depende apenas da função nativa fetch:
```javascript
async function listarProdutos() {
  const res = await fetch(`${API_URL}/produtos`);
  const produtos = await res.json();
  renderizarTabela(produtos);
}
```
A tela reúne formulário de cadastro/edição, busca por ID e tabela com ações de editar e excluir.

[PRINT: aplicação rodando no navegador — formulário e tabela de produtos. Descrição alternativa: página web do Gerenciador de Produtos com formulário no topo e tabela com botões de editar e deletar.]

---

## CAPÍTULO 04 — VERSIONAMENTO COM GIT E GITHUB

**Frase de abertura:** O Git é a "máquina do tempo" do projeto: cada mudança fica registrada, pode ser revisada e desfeita. O GitHub é onde esse histórico vive na nuvem e onde a equipe colabora.

### Configuração inicial
```
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git init
```

### O fluxo de trabalho
[IMAGEM: diagrama — Diretório de trabalho → (git add) → Staging → (git commit) → Repositório local → (git push) → GitHub. Descrição alternativa: quatro caixas em sequência conectadas pelos comandos git add, git commit e git push.]

```
git add backend/index.js
git commit -m "feat: backend e frontend completos"
git push origin main
```

### Commits semânticos (Conventional Commits)
Histórico real do projeto:
```
8140f98 fix(backend): adiciona ws para compatibilidade com Node < 22
c0467cf feat: backend e frontend completos
0971c16 Merge pull request #1 from matheusabporto/feat/setup-supabase
38d7572 docs(backend): documenta schema da tabela produtos
eed319d chore: estrutura inicial do projeto
ee5c7ab Initial commit
```
Prefixos: feat (funcionalidade) • fix (correção) • docs (documentação) • chore (manutenção).

### Branches e Pull Requests
A configuração do banco foi feita na branch `feat/setup-supabase` e integrada à main por meio de um Pull Request:
```
git checkout -b feat/setup-supabase
# ... trabalho e commits ...
git push origin feat/setup-supabase
# No GitHub: abrir Pull Request → revisar → Merge
```

### Boas práticas adotadas
- Commits pequenos e frequentes, cada um com propósito único
- Mensagens no padrão semântico
- .gitignore bem configurado: node_modules/ e .env fora do repositório
- Uma branch por funcionalidade, integrada via Pull Request

[PRINT: repositório no GitHub mostrando o Pull Request #1 com merge realizado. Descrição alternativa: página do GitHub exibindo o pull request aprovado e mesclado.]

---

## CAPÍTULO 05 — DEPLOY NA NUVEM (AWS EC2)

**Frase de abertura:** Desenvolver é metade do caminho; a outra metade é fazer a aplicação existir na internet. O deploy foi feito na AWS, usando duas máquinas virtuais EC2 — uma para o front-end e outra para o back-end.

### Por que duas máquinas?
Separar front-end e back-end espelha a arquitetura de sistemas profissionais: cada parte pode ser atualizada, escalada ou reiniciada sem afetar a outra. O banco nem precisa de servidor próprio — o Supabase o oferece como serviço gerenciado (DBaaS).

[IMAGEM: diagrama — Código local → (push) → GitHub → (clone) → EC2 front-end / EC2 back-end → Supabase. Descrição alternativa: o código sai do computador local para o GitHub, é clonado nas duas máquinas EC2 e o back-end conecta-se ao Supabase.]

### Passo a passo do deploy do back-end
1. **Criar a instância EC2** (Ubuntu Server, t2.micro — nível gratuito) e configurar o Security Group liberando as portas 22 (SSH) e 3000 (API).
2. **Conectar via SSH:**
```
ssh -i "chave-projeto.pem" ubuntu@IP_PUBLICO_DA_VM
```
3. **Instalar o Node.js e clonar o projeto:**
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
git clone https://github.com/matheusabporto/projeto3-cloud-crud-produtos.git
cd projeto3-cloud-crud-produtos/backend
npm install
nano .env   # credenciais do Supabase
```
4. **Manter o servidor no ar com PM2:**
```
sudo npm install -g pm2
pm2 start index.js --name api-produtos
pm2 startup && pm2 save
```

### Deploy do front-end
Na segunda VM: clonar o repositório e servir a pasta frontend com um servidor web estático. Antes, apontar o front-end para o IP público do back-end:
```javascript
// frontend/config.js
const API_URL = 'http://IP_PUBLICO_DO_BACKEND:3000';
```

**💡 Alternativas:** Vercel e Render automatizam o deploy a partir do GitHub — a cada git push, novo deploy. A EC2 foi escolhida por expor o processo completo, com mais aprendizado.

[PRINT 1: console AWS com as duas instâncias EC2 em "Running" + terminal com PM2 listando a API ativa.]
[PRINT 2: navegador acessando a aplicação pelo IP público — resultado final no ar.]

---

## CAPÍTULO 06 — TESTES E QUALIDADE DE SOFTWARE

**Frase de abertura:** Código que funciona hoje precisa continuar funcionando amanhã. Testes e ferramentas de qualidade são o seguro de vida de uma aplicação.

### Testes manuais com Postman
Cada rota da API foi testada manualmente com o Postman: requisições GET, POST, PUT e DELETE, conferindo códigos de resposta (200, 201, 400, 404, 500) e o corpo em JSON — validando a API antes mesmo de o front-end existir.

### Testes automatizados (tabela)
| Ferramenta | Tipo | O que faz |
|---|---|---|
| Jest | Testes unitários | Verifica funções isoladas |
| Supertest | Testes de integração | Simula requisições HTTP reais contra a API |
| ESLint | Análise estática | Aponta erros antes de o código rodar |
| Prettier | Formatação | Padroniza o estilo do código da equipe |

Exemplo de teste de integração:
```javascript
const request = require('supertest');
const app = require('../index');

describe('GET /produtos', () => {
  test('deve retornar 200 e uma lista', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

### Ambientes separados
Nunca testar em produção. O ideal: desenvolvimento (máquina local), homologação/teste (réplica na nuvem) e produção (o que o usuário acessa). As variáveis do .env facilitam a troca entre ambientes.

### Integração contínua (CI)
Com GitHub Actions, os testes rodam automaticamente a cada push ou pull request: se algo quebrar, o GitHub bloqueia o merge e avisa a equipe. É a ponte entre versionamento e qualidade — e o primeiro passo rumo ao deploy contínuo.

---

## CAPÍTULO 07 — CONCLUSÃO E REFLEXÃO

**Frase de abertura:** Mais do que um sistema de cadastro de produtos, este projeto foi um mergulho no ciclo de vida completo de um software: da primeira linha de código ao endereço público na internet.

### Desafios enfrentados
- **CORS:** com front e back em servidores diferentes, o navegador bloqueava as requisições — entender e configurar o middleware cors foi o primeiro obstáculo real de "mundo distribuído".
- **Compatibilidade de versões:** o cliente do Supabase exigiu um ajuste (pacote ws) para funcionar em versões mais antigas do Node — registrado no histórico como um commit fix.
- **Segurança de credenciais:** manter chaves e senhas fora do repositório usando .env e .gitignore.
- **Deploy manual na EC2:** Security Groups, SSH e PM2 exigiram paciência, mas revelaram o que plataformas automatizadas escondem.

### Aprendizados
O maior aprendizado foi perceber que desenvolvimento de software vai muito além de programar. Escolher ferramentas, organizar o ambiente, versionar com disciplina, testar e publicar são etapas tão importantes quanto o código em si — e são exatamente essas etapas que diferenciam um exercício de aula de um produto real.

O Node.js se mostrou uma porta de entrada generosa para o back-end: a familiaridade com o JavaScript reduziu a curva de aprendizado, e o ecossistema npm resolveu com poucas linhas problemas que pareciam grandes. O trabalho com Git e GitHub transformou a colaboração da equipe — conflitos que antes seriam "versão final 2 (3) DEFINITIVA.zip" viraram branches, commits semânticos e pull requests revisáveis.

Por fim, o deploy na AWS desfez a aura de mistério da "nuvem": ela é, no fundo, o computador de outra pessoa — mas um computador que nunca desliga, acessível ao mundo, e que agora sabemos configurar.

**🔗 Repositório:** github.com/matheusabporto/projeto3-cloud-crud-produtos

---

## CHECKLIST DE PRINTS QUE A EQUIPE PRECISA TIRAR

1. ✔ FEITO — VS Code (pasta prints/print-vscode.png)
2. ✔ FEITO — App rodando (prints/print-app.png)
3. ✔ FEITO — PR no GitHub (prints/print-github-pr.png)
4. Console AWS: instâncias EC2 em "Running" (Cap. 5)
5. Terminal: `pm2 list` mostrando a API online (Cap. 5)
6. Navegador acessando a aplicação pelo IP público (Cap. 5)
7. (Opcional) Postman testando uma rota (Cap. 6)
8. ✔ FEITO — Supabase (prints/print-supabase.png)

Lembrete do professor: toda imagem precisa de descrição alternativa — elas já estão escritas neste documento, basta copiá-las junto.
