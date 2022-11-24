import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableSinhVien from './TableSinhVien'

class DanhSachSinhVien extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSV: {
                idSV: '',
                nameSV: '',
                phoneSV: '',
                emailSV: ''
            },
            inputErr: {
                idSV: '',
                nameSV: '',
                phoneSV: '',
                emailSV: ''
            },
        }
    }

    handleInput = (e) => {
        let { value, name } = e.target;
        let newInput = this.state.inputSV;
        newInput[name] = value;

        let newErr = this.state.inputErr;
        let message = '';
        switch (name) {
            case 'idSV': {
                message = this.kiemTraRong(value, 'Mã SV');
                break
            }
            case 'nameSV': {    // Cách này không hay lắm nên đổi cách khác hay hơn
                message = this.kiemTraRong(value, 'Họ tên');
                if (message === '') {
                    message = this.kiemTraKyTu(value, 'Họ tên')
                }
                break
            }
            case 'phoneSV': {
                message = this.kiemTraRong(value, 'Số điện thoại');
                if (message === '') {
                    message = this.kiemTraSo(value, 'Số điện thoại')
                }
                break
            }
            case 'emailSV': {
                message = this.kiemTraRong(value, 'Email');
                if (message === '') {
                    message = this.kiemTraEmail(value, 'Email')
                }
                break
            }
            default: {
                message = ''
                break
            }
        }
        newErr[name] = message;

        this.setState({
            inputSV: newInput,
            inputErr: newErr,
        })
    }

    kiemTraRong = (value, nameErr) => {
        if (value.trim() === '') {
            return nameErr + ' không được bỏ trống!';
        }
        return ''
    }
    kiemTraKyTu = (value, nameErr) => {
        let regexLetter = /^[A-Z a-z]+$/;
        if (!regexLetter.test(value)) {
            return nameErr + ' chỉ nhận ký tự A-Z và a-z!'
        }
        return ''
    }
    kiemTraSo = (value, nameErr) => {
        let regexNumber = /^[0-9]+$/;
        if (!regexNumber.test(value)) {
            return nameErr + ' chỉ nhận ký tự số 0-9!'
        }
        return ''
    }
    kiemTraEmail = (value, nameErr) => {
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(value)) {
            return nameErr + ' không hợp lệ!'
        }
        return ''
    }

    handleSubmit = () => {
        console.log('Submit')
        let { inputErr, inputSV } = this.state;
        let valid = true
        for (let key in inputErr) {
            if (inputErr[key] !== '' || inputSV[key] === '') {
                valid &= false;
            }
        }
        if (valid) {
            const action = {
                type: 'THEM_SINH_VIEN',
                payload: inputSV,
            }
            this.props.dispatch(action)
        }
    }

    static getDerivedStateFromProps(newProps, currentState){
        console.log(currentState.inputSV)
        console.log(newProps.inputSV)
        return {
            inputSV: newProps.inputSV
        }
    }

    render() {
        let { inputSV } = this.state;
        let {submitText} = this.props;
        return (
            <div className='container'>
                <div className='card'>
                    <h3 className='card-header bg-dark text-light px-3 py-2'>Thông tin sinh viên</h3>
                    <div className='card-body'>
                        <div className='row gx-5 gy-3'>
                            <div className='col-lg-6'>
                                <label htmlFor="idSV" className='form-label ps-2'>Mã SV</label>
                                <input value={inputSV.idSV} type="text" id='idSV' className='form-control' name='idSV' onInput={this.handleInput} />{this.state.inputErr.idSV && <div className='alert alert-danger mt-2'>{this.state.inputErr.idSV}</div>}
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor="nameSV" className='form-label ps-2'>Họ tên</label>
                                <input value={inputSV.nameSV} type="text" id='nameSV' className='form-control' name='nameSV' onInput={this.handleInput} />{this.state.inputErr.nameSV && <div className='alert alert-danger mt-2'>{this.state.inputErr.nameSV}</div>}
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor="phoneSV" className='form-label ps-2'>Số điện thoại</label>
                                <input value={inputSV.phoneSV} type="text" id='phoneSV' className='form-control' name='phoneSV' onInput={this.handleInput} />{this.state.inputErr.phoneSV && <div className='alert alert-danger mt-2'>{this.state.inputErr.phoneSV}</div>}
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor="emailSV" className='form-label ps-2'>Email</label>
                                <input value={inputSV.emailSV} type="text" id='emailSV' className='form-control' name='emailSV' onInput={this.handleInput} />{this.state.inputErr.emailSV && <div className='alert alert-danger mt-2'>{this.state.inputErr.emailSV}</div>}
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button className='btn btn-success' type='submit' onClick={() => {
                                this.handleSubmit()
                            }}>{submitText}</button>
                        </div>
                    </div>
                </div>
                <TableSinhVien />
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevProps.inputSV)
        console.log(this.props.inputSV)
        if(prevProps.inputSV.idSV !== this.props.inputSV.idSV){
            this.setState({
                inputSV: this.props.inputSV
            })
        }
    }
}

const mapStateToProps = (state) => ({
    inputSV: state.inputSV,
    arrSV: state.arrSV,
    submitText: state.submitText
})

export default connect(mapStateToProps)(DanhSachSinhVien)