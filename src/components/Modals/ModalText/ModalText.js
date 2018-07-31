import React, { Component } from 'react';
import { string } from 'prop-types';
import Parser from 'html-react-parser';
import './ModalText.css';

class ModalText extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      parsedHTML: Parser( props.textContent )
    };
  }

  componentDidMount() {
    const parsedHTMLScripts = [];
    const { parsedHTML } = this.state;

    parsedHTML
      .filter( ( el ) => {
        if ( !el.props ) return false;
        return el.props.children && el.props.children.type === 'script';
      } )
      .forEach( ( el ) => {
        if ( !parsedHTMLScripts.includes( el.props.children.props.src ) ) {
          parsedHTMLScripts.push( el.props.children.props.src );
        }
      } );

    parsedHTMLScripts.forEach( ( s ) => {
      const domScript = document.createElement( 'script' );
      domScript.src = s;
      this.contentDiv.appendChild( domScript );
    } );
  }

  render() {
    const { parsedHTML } = this.state;
    const parsedHTMLRemovedScripts = parsedHTML.filter( ( el ) => {
      if ( !el.props ) return false;
      return el.props.children && el.props.children.type !== 'script';
    } );

    return (
      <section className="modal_section modal_section--textContent">
        <div className="textContent" ref={ ( node ) => { this.contentDiv = node; } }>
          { parsedHTMLRemovedScripts }
        </div>
      </section>
    );
  }
}

ModalText.propTypes = {
  textContent: string
};

export default ModalText;
