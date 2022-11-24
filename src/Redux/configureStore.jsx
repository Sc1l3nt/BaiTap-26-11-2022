import { configureStore } from '@reduxjs/toolkit';

const inputDefault = {
    idSV: '',
    nameSV: '',
    phoneSV: '',
    emailSV: ''
}

const stateDefault = [
    { idSV: '1', nameSV: 'Nguyen Van A', phoneSV: '0123456781', emailSV: 'aaaa@gmail.com' },
    { idSV: '2', nameSV: 'Vo Van B', phoneSV: '0123456782', emailSV: 'bbbb@gmail.com' },
    { idSV: '3', nameSV: 'Vo Thi C', phoneSV: '0123456783', emailSV: 'cccc@gmail.com' },
    { idSV: '4', nameSV: 'Nguyen Thi D', phoneSV: '0123456784', emailSV: 'dddd@gmail.com' },
];

export const store = configureStore({
    reducer: {
        inputSV: (state = inputDefault, action)=>{
            switch(action.type){
                case 'SUA':{
                    let sv = action.payload;
                    state.idSV = sv.idSV
                    state.nameSV = sv.nameSV
                    state.phoneSV = sv.phoneSV
                    state.emailSV = sv.emailSV
                    return {...state}
                }
                default: return state
            }
        },
        submitText: (state = 'Thêm sinh viên', action)=>{
            switch(action.type){
                case 'THEM_SINH_VIEN':{
                    state = 'Thêm sinh viên';
                    return state
                }
                case 'SUA':{
                    state = 'Cập nhật'
                    return state
                }
                default: return state
            }
        },
        arrRender: (state = stateDefault, action)=>{
            switch(action.type){
                case 'RENDER':{
                    state = action.payload
                    return [...state]
                }
                case 'THEM_SINH_VIEN': {
                    state.push(action.payload);
                    return [...state];
                }
                case 'DELETE': {
                    let indexXoa = state.findIndex(sv => sv.idSV === action.payload);
                    state.splice(indexXoa, 1);
                    return [...state];
                }
                case 'SUA': {
                    let indexXoa = state.findIndex(sv => sv.idSV === action.payload.idSV);
                    state.splice(indexXoa, 1);
                    return [...state];
                }
                default: return state;
            }
        },
        arrSV: (state = stateDefault, action) => {
            switch (action.type) {
                case 'THEM_SINH_VIEN': {
                    state.push(action.payload);
                    return [...state];
                }
                case 'DELETE': {
                    let indexXoa = state.findIndex(sv => sv.idSV === action.payload);
                    state.splice(indexXoa, 1);
                    return [...state];
                }
                case 'SUA': {
                    let indexXoa = state.findIndex(sv => sv.idSV === action.payload.idSV);
                    state.splice(indexXoa, 1);
                    return [...state];
                }
                default: {
                    return state
                }
            }
        }
    }
})