import React, { Component } from 'react';
import { Icon } from 'antd';
import pizza from './pizza.svg';

class EachRow extends Component {

    displayData = (props) => {
        const { name, number, icon, size, handler, plus, minus } = props;
        const element = 
            <div className="d-flex justify-content-between my-2">
                <div className="d-flex position-relative" >
                    { icon === 'pizza' ?
                        <img 
                            src={pizza} 
                            alt="pizza logo" 
                            width={26} 
                            height={size}
                            style={{ margin: 0,
                                position: 'relative',
                                top: '40%',
                                transform: 'translateY(-50%)'
                            }} 
                        />
                        : <Icon type={icon} style={{ fontSize: '26px', lineHeight: 1 }} />
                    }
                    <h4 className="pl-3 m-0">{name}</h4> 
                </div>
                <div className="d-flex">
                    <button 
                        className='p-0' 
                        style={{ 
                            backgroundColor: 'white', 
                            border: 'none' 
                        }} 
                        disabled={minus} 
                        onClick={() => handler(name, 'minus')}
                    >
                        <Icon 
                            className={"btn p-0 " + (minus ? 'text-secondary' : 'text-danger')} 
                            theme="filled" 
                            type='minus-circle' 
                            style={{ 
                                fontSize: '30px', 
                                lineHeight: 1
                            }}
                        />
                    </button>
                    <span 
                        className="h4 my-0 mx-2 text-center pt-1" 
                        style={{width: '30px'}}
                    >
                        {number}
                    </span>
                    <button 
                        className='p-0' 
                        style={{ 
                            backgroundColor: 'white', 
                            border: 'none' 
                        }} 
                        disabled={plus} 
                        onClick={() => handler(name, 'plus')}
                    >
                        <Icon 
                            className={"btn p-0 " + (plus ? 'text-secondary' : 'text-danger')} 
                            theme="filled" 
                            type='plus-circle' 
                            style={{ 
                                fontSize: '30px', 
                                lineHeight: 1
                            }} 
                        />
                    </button>
                </div>
            </div>;
        
        return element;
    }

    render() {
        return (
            this.displayData(this.props)
        )
    }
}

export default EachRow;