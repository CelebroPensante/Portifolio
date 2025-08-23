# Configuração do EmailJS para Receber Emails Reais

Para que o formulário de contato envie emails reais para **vitor.gustavo.jc@gmail.com**, siga estes passos:

## 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu email

## 2. Configurar Serviço de Email

1. No dashboard do EmailJS, vá para **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha **"Gmail"** (recomendado)
4. Faça login com sua conta Gmail (**vitor.gustavo.jc@gmail.com**)
5. Autorize o EmailJS a enviar emails
6. **Anote o Service ID** (exemplo: `service_abc123`)

## 3. Criar Template de Email

1. Vá para **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template assim:

**Subject (Assunto):**
```
Novo contato do portfólio: {{subject}}
```

**Content (Conteúdo):**
```
Você recebeu uma nova mensagem através do seu portfólio:

Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada através do formulário de contato do seu portfólio.
Para responder, use o email: {{from_email}}
```

4. **Settings do Template:**
   - To Email: `vitor.gustavo.jc@gmail.com`
   - From Name: `Portfolio - {{from_name}}`
   - Reply To: `{{from_email}}`

5. Clique em **"Save"**
6. **Anote o Template ID** (exemplo: `template_xyz789`)

## 4. Obter Public Key

1. Vá para **"Account"** → **"General"**
2. Copie sua **Public Key** (exemplo: `abcd1234567890`)

## 5. Atualizar o Código JavaScript

No arquivo `script.js`, substitua as seguintes linhas:

```javascript
// Linha ~135 - Substitua pela sua Public Key
emailjs.init("YOUR_PUBLIC_KEY"); 

// Linha ~165 - Substitua pelos seus IDs
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Exemplo:**
```javascript
// Substitua por seus valores reais
emailjs.init("abcd1234567890"); 
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## 6. Testar o Formulário

1. Abra seu portfólio no navegador
2. Preencha o formulário de contato
3. Clique em "Send Message"
4. Verifique sua caixa de entrada em **vitor.gustavo.jc@gmail.com**

## 7. Planos do EmailJS

- **Gratuito**: 200 emails/mês
- **Pago**: A partir de $15/mês para mais emails

## Solução de Problemas

### Se não funcionar:
1. Verifique se as IDs estão corretas
2. Confira o console do navegador (F12) para erros
3. Certifique-se de que o Gmail está configurado corretamente
4. Teste o template no dashboard do EmailJS

### Exemplo de configuração completa:
```javascript
emailjs.init("pk_12345abcdef"); 
emailjs.send('service_gmail_123', 'template_contact_456', templateParams)
```

## Recursos Úteis

- [Documentação EmailJS](https://www.emailjs.com/docs/)
- [Integração com Gmail](https://www.emailjs.com/docs/examples/gmail/)
- [Templates de Email](https://www.emailjs.com/docs/user-guide/creating-email-template/)

---

**Nota:** Após configurar, todas as mensagens do formulário serão enviadas diretamente para seu email!
