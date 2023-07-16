import update from 'immutability-helper'
import type { CSSProperties, RefObject } from 'react'

import Card from './Card'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Identifier } from 'dnd-core'

export interface Item {
    id: number
    text: string
}

export type RenderCardFunc<T> = (cardInfo: T, ref: RefObject<any>, handlerId: Identifier | null, index: number, style?: CSSProperties) => JSX.Element;

export type DndContainerProps<T> = {
    cards: T[],
    setCards: (cards: T[], props: DndContainerProps<T>) => void,
    cardGroup: string;
    renderCard?: RenderCardFunc<T>
}

export const DndContainer = <T,>(props: DndContainerProps<T>) => {

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = props.cards[dragIndex];
        props.setCards(update(props.cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]]
        }), props);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {props.cards.map((card, index) => (
                <Card
                    key={props.cardGroup + index.toString()}
                    index={index}
                    cardInfo={card}
                    moveCard={moveCard}
                    cardGroup={props.cardGroup}
                    renderElement={props.renderCard}
                />))
            }
        </DndProvider>
    )
}