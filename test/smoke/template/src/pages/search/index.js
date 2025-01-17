import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from '../../assets/images/image.png';
import logo2 from '../../assets/images/image2.png';
import { common } from '../../../common';
import { a, b } from './tree-shaking';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: null
        }
    }

    loadComponent = () => {
        import('./text.js').then((Text) => {
            this.setState({ Text: Text.default })
        })
    }

    render() {
        const { Text } = this.state
        if (false) {
            const astr = a();
        }
        console.log('hello world');
        return (
            <div className='box'>
                <img src={logo} alt='logo' />
                <img src={logo2} alt='logo2' />
                <h1 className='search'>Search</h1>
                <h1 className='search'>{common()}</h1>
                <h1 className='search' onClick={this.loadComponent}>动态加载</h1>
                {
                    Text ? <Text /> : null
                }
            </div>
        )
    }
}

ReactDOM.render(<Search />, document.getElementById('root'));