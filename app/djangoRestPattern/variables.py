from djangoRestPattern import variables as var


class ERRORS:

    EMAIL_SEND_ERROR = {
        'code': 'EMAIL-SEND-002',
        'message': 'Tivemos problemas para enviar o email...\
            Desculpe o imprevisto, tente novamente mais tarde.',
        'severity': 'error',
        'title': 'Envio de email'
    }

    EMPTY_FIELD = {
        'code': 'FIELD-001',
        'message': 'Por favor, preencha todos os campos.',
        'severity': 'error',
        'title': 'Campos Vázios'
    }

    PASSWORD_RECOVERY_USER_NOT_EXIST = {
        'code': 'PASSWORD-RECOVERY-001',
        'message': 'Tivemos problemas com seu email...\
            Não encontramos o email informado. Não é cadastrado? junte-se a nós!',
        'severity': 'error',
        'title': 'Email não encontrado'
    }

    USER_NOT_EXIST = {
        'code': 'AUTH-001',
        'message': 'Tivemos problemas com seu email ou sua senha...\
            Você pode recuperar sua senha ou se cadastrar!',
        'severity': 'error',
        'title': 'Usuário ou senhas errados'
    }

    USER_IS_NOT_VERIFY = {
        'code': 'AUTH-002',
        'message': 'Você já verificou seu email? \
            Caso não tenha recebido email clique aqui que enviaremos outro para você!',
        'severity': 'error',
        'title': 'Usuário não verificado'
    }

    USER_IS_NOT_ACTIVE = {
        'code': 'AUTH-003',
        'message': 'Ops... Você não está ativo.',
        'severity': 'error',
        'title': 'Usuário não ativo'
    }

    USER_CREATE = {
        'code': 'USER-002',
        'message': 'Tivemos um problema na hora de criar sua conta, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Cadastro'
    }

    USER_UPDATE = {
        'code': 'USER-003',
        'message': 'Tivemos um problema na hora de atualizar seus dados, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Atualizar'
    }

    USER_PASSWORD_NOT_MATCH = {
        'code': 'USER-001',
        'message': 'As senhas não são iguais, por favor, verifique e tente novamente!',
        'severity': 'error',
        'title': 'Senhas não conferem'
    }

    INVALID_TOKEN = {
        'code': 'TOKEN-001',
        'message': 'Esse token já foi utilizado, por favor solicite outro!',
        'severity': 'error',
        'title': 'Token já utilizado'
    }

    OBJECTIVE_CREATE = {
        'code': 'OBJECTIVE-001',
        'message': 'Tivemos um problema na hora de criar seu objetivo, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Cadastro'
    }

    GOAL_CREATE = {
        'code': 'GOAL-001',
        'message': 'Tivemos um problema na hora de criar sua meta, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Desculpe...'
    }

    GOAL_DONE = {
        'code': 'GOAL-002',
        'message': 'Tivemos um problema na hora de concluir sua meta, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Desculpe...'
    }

    GOAL_UPDATE = {
        'code': 'OBJECTIVE-001',
        'message': 'Tivemos um problema na hora de atualizar sua meta, desculpe, tente novamente mais tarde...',
        'severity': 'error',
        'title': 'Desculpe...'
    }


class SUCCESS:
    USER_CREATE = {
        'code': 'USER-SUCCESS-001',
        'message': 'Parabéns! Para ser um de nós, verifique seu email, mandamos um link para que você possa ativar sua conta!',
        'severity': 'success',
        'title': 'Cadastro'
    }

    USER_UPDATE = {
        'code': 'USER-SUCCESS-002',
        'message': 'Pronto! Já atualizamos seus dados!',
        'severity': 'success',
        'title': 'Atualizar'
    }

    USER_VERIFY = {
        'code': 'USER-VERIFY-001',
        'message': 'Pronto! Agora você foi verificado, acesse e aproveite!',
        'severity': 'success',
        'title': 'Usuário verificado'
    }

    RECOVERY_SUCCESS = {
        'code': 'RECOVERY-SUCCESS-001',
        'message': 'Pronto! Agora você pode acessar usando sua nova senha!',
        'severity': 'success',
        'title': 'Recuperação de Senha'
    }

    PASSWORD_RECOVERY_EMAIL_SEND_SUCCESS = {
        'code': 'EMAIL-SEND-002',
        'message': 'Pronto! Verifique seu email, mandamos um link para recuperar sua senha!',
        'severity': 'success',
        'title': 'Recuperação de Senha'
    }

    OBJECTIVE_CREATE = {
        'code': 'OBJECTIVE-001',
        'message': 'Pronto! Criamos o seu objetivo!',
        'severity': 'success',
        'title': 'Cadastro'
    }


class OBJECT:
    VERIFY_EMAIL = {
        'title': 'Parabens! Agora é só confirmar sua conta',
        'sub_title': 'Estamos quase lá, acesse o link e verifique sua conta.',
        'message': 'Para verificar sua conta clique no botão abaixo. \
        Você será redirecionado para nossa página de verificação, \
                Assim que você for verificado, pode acessar utilizando seu email e sua senha!',
        'tokenType': 'V',
        'subject': 'Verificação de conta',
        'message_email': 'Segue o link para verificação',
        'success': var.SUCCESS.USER_CREATE,
        'button': 'Verificar conta!'
    }

    RECOVERY_EMAIL = {
        'title': 'Vamos recuperar sua senha!',
        'sub_title': 'Estamos quase lá, acesse o link e você poderá recueprar sua senha.',
        'message': 'Para recuperar sua senha clique no botão abaixo. \
        Você será redirecionado para nossa página de recuperação de senha, \
            onde você deverá por um nova senha e a senha de confirmação. \
                Se tudo estiver certo você pode acessar utilizando sua nova senha!',
        'tokenType': 'R',
        'subject': 'Recuperação de senha',
        'message_email': 'Segue o link para recuperação de senha',
        'success': var.SUCCESS.PASSWORD_RECOVERY_EMAIL_SEND_SUCCESS,
        'button': 'Recuperar Senha!'
    }
