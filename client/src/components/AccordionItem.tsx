import React, {FC, useState} from 'react';
import Arrow from '../static/arrowMin.svg';

export interface AccordionItemProps {
    id?: number;
    title: string;
    description: string;
}

const AccordionItem: FC<AccordionItemProps> = ({title, description}) => {

    const [accordOpen, setAccordOpen] = useState<boolean>(false);

    return (
        <div className="profile__accordion">
            <div className="profile__accord-title" onClick={() => setAccordOpen(accordOpen ? false : true)}>
                <span>{title}</span>
                <img src={Arrow} alt="" className={`profile__accordion-icon ${accordOpen ? 'active' : ''}`}/>
            </div>
            <div className={`profile__accord-body ${accordOpen ? 'open' : ''}`}>{description}a</div>
        </div>
    );
};

export default AccordionItem;
