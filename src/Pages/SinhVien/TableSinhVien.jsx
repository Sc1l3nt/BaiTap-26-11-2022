import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableSinhVien extends Component {
    renderTable = (arrSV) => {
        return arrSV.map((sv, index) => {
            return <tr key={index}>
                <td>{sv.idSV}</td>
                <td>{sv.nameSV}</td>
                <td>{sv.phoneSV}</td>
                <td>{sv.emailSV}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => {
                        this.handleXoa(sv.idSV)
                    }}><i className="fa fa-trash-alt"></i></button>
                    <button className='btn btn-primary ms-3' onClick={() => {
                        this.handleSua(sv)
                    }}><i className="fa fa-edit"></i></button>
                </td>
            </tr>
        })
    }

    handleSua = (sv) => {
        const action = {
            type: 'SUA',
            payload: sv
        }
        this.props.dispatch(action)
    }

    handleXoa = (id) => {
        const action = {
            type: 'DELETE',
            payload: id,
        }
        this.props.dispatch(action)
    }

    handleSearch = (e) => {
        let { value } = e.target;
        value = value.toLowerCase();
        let { arrSV } = this.props;
        let newArr = []
        if (value !== '') {
            newArr = arrSV.filter(sv => {
                for (let key in sv) {
                    let name = sv[key].toLowerCase()
                    if (name.search(value) !== -1) {
                        return sv
                    }
                }
            })
        } else {
            newArr = arrSV
        }

        const action = {
            type: 'RENDER',
            payload: newArr,
        }
        this.props.dispatch(action)
    }

    render() {
        let { arrRender } = this.props
        return (
            <>
                <div className='d-flex justify-content-end my-2'>
                    <input className="form-control w-50" type="search" placeholder="Search" aria-label="Search" onInput={this.handleSearch} />
                </div>
                <table className='table'>
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th className='pb-3'>Mã SV</th>
                            <th className='pb-3'>Họ tên</th>
                            <th className='pb-3'>Số điện thoại</th>
                            <th className='pb-3'>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(arrRender)}
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    arrSV: state.arrSV,
    arrRender: state.arrRender
})

export default connect(mapStateToProps)(TableSinhVien)