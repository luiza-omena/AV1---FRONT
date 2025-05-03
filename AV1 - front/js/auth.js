// Funções de autenticação
const auth = {
    // Verifica se o usuário está logado
    isLoggedIn: () => {
        return localStorage.getItem('user') !== null;
    },

    // Retorna o usuário logado
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Faz login
    login: (email, password) => {
        // Simula verificação de credenciais
        if (email && password) {
            const user = {
                email,
                name: 'João Silva' // Nome fixo para demonstração
            };
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
        return false;
    },

    // Faz logout
    logout: () => {
        localStorage.removeItem('user');
    }
}; 