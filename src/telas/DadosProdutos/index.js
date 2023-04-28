import { Alert, View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from "../../componentes/Botao";
import estilos from "./estilos";
import { useState } from "react";
import { salvarProduto } from "../../servicos/firestore";
import { Alerta } from "../../componentes/Alerta";

export default function DadosProdutos({ navigation }) {
   const [nome, setNome] = useState('')
   const [preco, setPreco] = useState('')
   const [mensagem, setMensagem] = useState('')
   const [mostrarMensagem, setMonstrarMensagem] = useState(false)

   async function salvar(){
      if(nome == '' || preco == '') {
         setMensagem("Por favor preencha todos os campos")
         setMonstrarMensagem(true)
         return
      }
      const resultado = await salvarProduto({
         nome,
         preco
      })
      if (resultado == 'erro'){
         setMensagem('Erro ao criar produto')
         setMonstrarMensagem(true)
      } else {
         navigation.goBack()
      }
   }

   return(
      <View style={estilos.container}>
         <EntradaTexto
            label="Nome do Produto"
            value={nome}
            onChangeText={texto => setNome(texto)}
         />
         <EntradaTexto
            label="Preço do Produto"
            value={preco}
            onChangeText={texto => setPreco(texto)}
         />
         <Botao 
            onPress={() => salvar()}
         >
            Salvar
         </Botao>
         <Alerta
            mensagem={mensagem}
            error={mostrarMensagem}
            setError={setMonstrarMensagem}
         />
      </View>
   )
}