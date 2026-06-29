# Atualizacao segura do CRM

Para atualizar um sistema ja publicado, use somente pacote de atualizacao segura.

Nunca envie para o site quente a pasta `data/` de uma base local, porque ela contem o banco operacional:

- `data/usuarios.json`
- `data/*/vendedores.json`
- `data/*/clientes.json`
- `data/*/vendas.json`
- `data/*/day_by_day_vendedores.json`
- `data/*/clientes_bloqueados.json`
- `data/*/orcamentos.json`
- `data/*/pedidos.json`

Use:

```powershell
powershell -ExecutionPolicy Bypass -File tools/gerar_pacote_atualizacao_seguro.ps1 -Versao 20260617
```

O script bloqueia o zip se encontrar `data/`, backups, outputs, `node_modules` ou arquivos JSON operacionais.

Antes de atualizar o site quente, faca backup da pasta `data/` do servidor publicado.
