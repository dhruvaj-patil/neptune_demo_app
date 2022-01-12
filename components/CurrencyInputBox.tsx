


import React from 'react'

interface BoxProps {
    label: string;
    placeholderValue: string;
    value: number
    onChangeHandler: (event: any) => void
}

const CurrencyInputBox = ({ label, placeholderValue, onChangeHandler, value }: BoxProps) => {
    return (
        <div className="my-5">
            <label >
                {label}
                <input className="mx-5 py-2 leading-none text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-center" value={value} type="number" placeholder={placeholderValue} onChange={(e) => onChangeHandler(e)} />
            </label>
        </div>
    )
}

export default CurrencyInputBox
