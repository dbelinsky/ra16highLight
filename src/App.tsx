import React, { useState } from 'react';
import './App.css'; 

interface NewProps {
    children: React.ReactNode;
}

interface PopularProps {
    children: React.ReactNode;
}

interface ArticleProps {
    title: string;
    views: number;
}

interface VideoProps {
    url: string;
    views: number;
}

interface ListItem {
    type: 'video' | 'article';
    url?: string;
    title?: string;
    views: number;
}

function New(props: NewProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    );
}

function Popular(props: PopularProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    );
}

function Article(props: ArticleProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    );
}

function Video(props: VideoProps) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    );
}

function withPopularity(WrappedComponent: React.ComponentType<any>) {
    return function EnhancedComponent(props: any) {
        const { views } = props;
        let Wrapper: React.ComponentType<any> | null = null;

        if (views >= 1000) {
            Wrapper = Popular;
        } else if (views < 100) {
            Wrapper = New;
        }

        return (
            Wrapper ? (
                <Wrapper>
                    <WrappedComponent {...props} />
                </Wrapper>
            ) : (
                <WrappedComponent {...props} />
            )
        );
    };
}

const EnhancedVideo = withPopularity(Video);
const EnhancedArticle = withPopularity(Article);

function List(props: { list: ListItem[] }) {
    return props.list.map((item, index) => {
        switch (item.type) {
            case 'video':
                return (
                    <EnhancedVideo key={index} {...item} />
                );
            case 'article':
                return (
                    <EnhancedArticle key={index} {...item} />
                );
            default:
                return null;
        }
    });
}

export default function App() {
    const [list, setList] = useState<ListItem[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
            <List list={list} />
    );
}