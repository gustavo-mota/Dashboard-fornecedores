import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    processo: string,
    fornecedores: object[]
} 

/*type FornecedorObj = {
    key: number;
    fornecedor: string,
    cnpj: string,
    processo: string,
    descricao: string,
    inicio: object,
    inicioFim: object,
    disable: boolean,
}*/

const initialState = {
    value: {
        processo: 'processo-default',
        fornecedores: []
    }
} as InitialState

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        setProcesso: (state, action:PayloadAction<string>)=>{
            return {
                value: {
                    ...state.value,
                    processo: action.payload
                }
            }
        },
        addFornecedor: (state, action:PayloadAction<object>)=>{
            return {
                value: {
                    ...state.value,
                    fornecedores: [...state.value.fornecedores, action.payload]
                }
            }
        },
        dellfornecedor: (state, action:PayloadAction<object>)=>{
            console.log('dell value: ', action, ' state: ', state.value.fornecedores)
            return {
                value: {
                    ...state.value,
                    fornecedores: state.value.fornecedores.filter(obj=>obj.processo !== action.payload)
                }
            }
        },

        editFornecedor: (state, action: PayloadAction<object[]>)=>{
            console.log('redux do editFornecedor: ', action)
            return {
                value: {
                    ...state.value,
                    fornecedores: action.payload
                }
            }
        }
        
        /*
        setFornecedor: (state, action:PayloadAction<string>)=>{
            return {
                value: {
                    ...state.value,
                    fornecedor: action.payload
                }
            }
        },
        setCNPJ: (state, action:PayloadAction<string>)=>{
            return {
                value: {
                    ...state.value,
                    cnpj: action.payload
                }
            }
        },
        setDescricao: (state, action:PayloadAction<string>)=>{
            return {
                value: {
                    ...state.value,
                    descricao: action.payload
                }
            }
        },
        setDisable: (state, action:PayloadAction<boolean>)=>{
            return {
                value: {
                    ...state.value,
                    disable: action.payload
                }
            }
        },
        setInicio: (state, action:PayloadAction<object>)=>{
            return {
                value: {
                    ...state.value,
                    inicio: action.payload
                }
            }
        },
        setInicioFim: (state, action:PayloadAction<object>)=>{
            return {
                value: {
                    ...state.value,
                    inicioFim: action.payload
                }
            }
        }
        */
    }
})

export const {reset, setProcesso, addFornecedor, dellfornecedor, editFornecedor} = auth.actions;
export default auth.reducer;