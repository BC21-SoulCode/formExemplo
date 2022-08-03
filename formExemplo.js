import { LightningElement } from 'lwc';
//importando o showToastEvent
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//importando createRecord
import { createRecord } from 'lightning/uiRecordApi';

export default class FormExemplo extends LightningElement {
    fields = {
        Name:"",
        Phone: ""
    };

    handleInputChange(event){
        let name = event.target.name;
        let value = event.detail.value;

        this.fields = {
            ...this.fields, [name]:value
        };

        console.log(this.fields);
    }
    /**
     * função responsável por montar um objeto para inserção 
     * e criar um registro na ORG
     */
    handleOnClick(){
        //montar o objeto de envio(criação de registro)
        const recordInput = {
            apiName: 'Account',
            fields: this.fields
        }

        /**
         * recordInput = {
         *  apiName: 'Account',
         *  fields: {
         *      Name: 'Filipe',
         *      Phone: '8899'
         *  }
         * }
         */

        console.log(recordInput);
        
        /**
         * createRecord(objeto a ser inserdo)
         * 
         * quando utilizamos essa função podemos criar caminhos de execução extra
         * createRecord(recordInput).then( conjunto de ações positivas).catch(conjunto de ações de falha)
         * 
         * 
         * then e o catch utilizam função anonima
         */
        

        createRecord(recordInput).then(
            /**entrou no then executa a função anonima dela 
             * responsavel por emitir a mensagem show toast de sucesso
             * 
                event -> recebe um conjunto de valores no caso de sucesso, inclusive id
                (event.id)
            */
            (event)=>{
                console.log(event);
                /**
                 * variavel sucesso = por montar a mensagem de sucesso (ShowToast)
                 * 
                 * ShowToastEvent
                 * cria uma caixa de alerta para emissão de mensagens, ele recebe um objeto como parametro e lá está configurada a mensagem
                 * 
                 * title -> titulo da mensagem
                 * message -> mensagem a ser exibida
                 * varinat -> determina que tipo de alerta será a caixa (sucess, warning, error)
                 */
                const sucesso = new ShowToastEvent({
                    title:'Conta criada',
                    message: 'Sua conta foi criada com sucesso Id: ' + event.id ,
                    variant: 'success'
                });

                //o disparo do evento deve ser feito
                this.dispatchEvent(sucesso);
            }
        ).catch(
            /**entrou no catch executa a função anonima dela 
             * responsavel por emitir a mensagem de falha
             * 
             * error parametro da função recebe valores relacionados a falha
             * 
            */
            (error)=>{
                console.log(error);
                const erro = new ShowToastEvent({
                    title:'Falha ao Inserir',
                    message: error.body.message,
                    variant: 'error'
                });

                this.dispatchEvent(erro);
            }
        )
    }
}