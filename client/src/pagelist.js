import React from 'react';
import './style/pagelist.css';

class PageList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <table className="Page-Table">
                <tbody>
                {this.props.pages.map((page, i)=>(
                    <tr className="Page-Rows" key={page.pageid}>
                        <td className="Page-Cell">
                            <span>{i+1}. </span>
                            <a className="Row-Title" href={page.fullurl} target="_blank">{page.title}</a>
                            <span> (</span>
                            <a className="Row-Url" href={page.fullurl} target="_blank">{page.fullurl}</a>
                            <span>)</span><br/>
                            <div className="Row-Description">{page.extract}</div>
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
        )
    }
}

export default PageList;