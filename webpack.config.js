module.exports ={
    entry: ['@babel/polyfill','./src/main.js'],
    output: {
        //qual lugar enviar o codigo convertido
        path: __dirname + '/public',//raiz do projeto
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public'
    },
    module: {
        rules:[
            {
                //qnd tiver inportando os aquivos js vai dizer com o arquivo vai se comportar
                //vai mostra qua o loader va carregasr primeiro
                //ou seja o babel não vai precisarr ser iniciado em background
                test:/\.js$/, 
                exclude: /node_moddules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }

};