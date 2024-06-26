const users = [
    {
        username: 'juan',
        password: '1234',
        admin: true
    },
    {
        username: 'jose',
        password: '123456',
        admin: false
    }
];

export const login = (req, res) => {
    try {
        const { username, password } = req.body;
        const index = users.findIndex((user)=>user.username === username && user.password === password);
        if(index < 0) res.status(401).json({ msg: 'No estas autorizado' });
        else {
            const user = users[index];
            req.session.info = {
                loggedIn: true,
                contador: 1,
                username: user.username,
                admin: user.admin
            };
        }
        res.json({msg: 'Bienvenido'})
    } catch (error) {
        throw new Error(error)
    }
};

export const visit = (req, res) => {
    req.session.info && req.session.info.contador++;
    res.json({ msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces` })
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    })
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send('session destroy')
};