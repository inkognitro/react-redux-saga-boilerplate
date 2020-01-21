import React, {Component} from 'react';

export type CardProps = {
    title?: (Component | string),
    footer?: (Component | string),
    className?: string,
};

export class Card extends Component<CardProps> {
    renderTitle() {
        if(!this.props.title) {
            return null;
        }
        return (<h5 className="card-title">{this.props.title}</h5>);
    }

    render() {
        return (
            <div className={'card' + (this.props.className ? ' ' + this.props.className : '')}>
                <div className="card-body">
                    {this.renderTitle()}
                    {this.props.children}
                </div>
            </div>
        );
    }
}