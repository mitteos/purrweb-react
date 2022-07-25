import React, {FC} from 'react';
import EditIcon from '../static/editIcon.svg';
import ProfileBanner from '../static/profileBanner.svg';
import CustomButton from "../components/UI/CustomButton/CustomButton";
import AccordionItem, {AccordionItemProps} from "../components/AccordionItem";
import {useAppSelector} from "../hooks/redux";


const accordionItems: AccordionItemProps[] = [
    {id: 1, title: 'Сколько займет создание MVP?', description: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'},
    {id: 2, title: 'Подписываете ли вы соглашение о неразглашении?', description: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'},
    {id: 3, title: 'Предоставляете ли вы маркетинговые услуги?', description: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'},
    {id: 4, title: 'Различается ли MVP от прототипов?', description: 'Чтобы создать надежный продукт, вам необходимо создать его прототип, спроектировать, разработать и протестировать. На прохождение всех этих этапов у вас уйдет около 3 месяцев.'},
]



const ProfilePage: FC = () => {

    const {userInfo} = useAppSelector(state => state.UserReducer)

    return (
        <div className="profile container">
            <div className="profile__header">
                <div className="profile__header-title">Мой профиль</div>
                <div className="profile__edit">
                    <img src={EditIcon} alt="edit profile" className="profile__edit-icon"/>
                    <div className="profile__edit-text">Редактировать</div>
                </div>
            </div>
            <div className="profile__info">
                <div className="profile__item">
                    <div className="profile__item-title">Имя</div>
                    <div className="profile__item-data">{userInfo.name}</div>
                </div>
                <div className="profile__item">
                    <div className="profile__item-title">Фамилия</div>
                    <div className="profile__item-data">{userInfo.surname}</div>
                </div>
                <div className="profile__item">
                    <div className="profile__item-title">Телефон</div>
                    <div className="profile__item-data">{userInfo.phone}</div>
                </div>
                <div className="profile__item">
                    <div className="profile__item-title">Электронная почта</div>
                    <div className="profile__item-data">{userInfo.email}</div>
                </div>
            </div>
            <div className="profile__banner">
                <div className="profile__statistic">
                    <div className="profile__statistic-title">Ваша продуктивность выросла!</div>
                    <div className="profile__statistic-subtitle">За прошлую неделю вы выполнили 12 задач</div>
                    <CustomButton additionalClass="profile__statistic-button" variant={"primary"}>Подробнее</CustomButton>
                </div>
                <div className="profile__illustration">
                    <img src={ProfileBanner} alt="profile illustration" className="profile__illustration-image"/>
                </div>
            </div>
            <div className="profile__questions">
                <div className="profile__questions-title">Часто задаваемые вопросы</div>
                <div className="profile__accordions">
                    {accordionItems.map(accord =>
                        <AccordionItem key={accord.id} title={accord.title} description={accord.description} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
