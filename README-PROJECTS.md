# Portfolio - Sistema de Projetos JSON

## ⚠️ IMPORTANTE: Problema do Cache

**Se você editou o arquivo JSON mas as mudanças não aparecem no portfólio, é porque o sistema usa cache (localStorage) para melhorar a performance.**

### Soluções Rápidas:

#### Método 1: URL com parâmetro de reload
Adicione `?reload=true` na URL:
```
file:///c:/caminho/para/seu/portfolio/index.html?reload=true
```

#### Método 2: Usar o botão de debug
- O botão "🔄 Reload Projects" aparece automaticamente quando você abre o arquivo localmente
- Clique nele após editar o JSON

#### Método 3: Limpar localStorage manualmente
1. Abra o Developer Tools (F12)
2. Vá para Application > Storage > Local Storage
3. Clique com botão direito e "Clear"
4. Recarregue a página

#### Método 4: Console do navegador
1. Abra o Developer Tools (F12)
2. Vá para a aba Console
3. Digite: `reloadProjects()` e pressione Enter

## Como Funciona

O portfólio agora carrega os projetos dinamicamente do arquivo `projects-data.json`, facilitando a adição, edição ou remoção de projetos sem modificar o código JavaScript.

## Estrutura do JSON

O arquivo `projects-data.json` contém um objeto com a propriedade `projects` que é um array de objetos de projeto. Cada projeto deve ter a seguinte estrutura:

```json
{
  "id": "identificador-unico",
  "title": "Título do Projeto",
  "subtitle": "Subtítulo do Projeto",
  "description": "Descrição detalhada do projeto...",
  "category": "ai|automation|web|iot",
  "status": "completed|active|in-progress",
  "date": "2025",
  "progress": 85,
  "image": "URL_da_imagem",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "githubLink": "https://github.com/usuario/repo",
  "liveLink": "https://projeto-demo.com",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "challenges": "Desafios enfrentados no projeto...",
  "outcomes": "Resultados obtidos com o projeto..."
}
```

## Categorias Disponíveis

- `ai` - Artificial Intelligence
- `automation` - Automation  
- `web` - Web Development
- `iot` - IoT & Analytics

## Status Disponíveis

- `completed` - Projeto finalizado
- `active` - Projeto ativo/em manutenção
- `in-progress` - Projeto em desenvolvimento

## Como Adicionar um Novo Projeto

1. Abra o arquivo `projects-data.json`
2. Adicione um novo objeto projeto no array `projects`
3. Preencha todos os campos obrigatórios
4. Salve o arquivo
5. Recarregue a página do portfólio

## Como Editar um Projeto Existente

1. Abra o arquivo `projects-data.json`
2. Encontre o projeto pelo `id`
3. Modifique as propriedades desejadas
4. Salve o arquivo
5. Recarregue a página do portfólio

## Como Remover um Projeto

1. Abra o arquivo `projects-data.json`
2. Remova o objeto do projeto desejado do array `projects`
3. Salve o arquivo
4. Recarregue a página do portfólio

## Sistema de Cache

O sistema utiliza localStorage para armazenar os dados dos projetos localmente, melhorando a performance. Se você fizer mudanças no arquivo JSON e elas não aparecerem imediatamente:

1. Abra o Developer Tools (F12)
2. Vá para a aba Application/Storage
3. Limpe o localStorage
4. Recarregue a página

Ou simplesmente adicione `?refresh=true` na URL para forçar o reload dos dados.

## Imagens dos Projetos

Atualmente o sistema usa imagens placeholder. Para usar suas próprias imagens:

1. Coloque as imagens na pasta `assets/`
2. Atualize o campo `image` no JSON para apontar para o arquivo correto
3. Exemplo: `"image": "assets/meu-projeto.jpg"`

## Troubleshooting

Se os projetos não estiverem aparecendo:

1. Verifique se o arquivo `projects-data.json` está na raiz do projeto
2. Verifique se o JSON está válido (use um validador JSON online)
3. Abra o Developer Tools e verifique se há erros no console
4. Limpe o localStorage e recarregue a página
