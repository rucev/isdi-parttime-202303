import { Link, useParams } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import toggleLike from '../logic/toggle-like';
import toggleSave from '../logic/toggle-save';
import isCurrentUser from '../logic/is-current-user';

const BasicLevelCard = ({ levelInfo, isLevelSaved }) => {
    const [authorData, setAuthorData] = useState({});
    const [title, setTitle] = useState('');
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(levelInfo.isLevelLiked);
    const [likes, setLikes] = useState(levelInfo.likes.length);
    const [isSaved, setIsSaved] = useState(isLevelSaved);
    const [isAuthorCurrentUser, setAuthorCurrentUser] = useState(null);
    const { id } = useParams();

    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            setAuthorData(user);
            const isUser = isCurrentUser(levelInfo.author);
            setAuthorCurrentUser(isUser);
        })
    }

    const handleSaveClick = () => {
        handleErrors(async () => {
            await toggleSave(levelInfo.id);
            setIsSaved(!isSaved);
        })
    }

    const handleLikeClick = () => {
        handleErrors(async () => {
            await toggleLike(levelInfo.id);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            setIsLiked(!isLiked);
        })
    }

    const setLevelTitle = (name) => {
        const displayName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
        setTitle(displayName)
    }

    useEffect(() => {
        getAuthorData();
        setLevelTitle(levelInfo.name);
    }, [levelInfo, id]);

    let timeDifference = new Date() - new Date(levelInfo.date);
    const hours = Math.floor(timeDifference / 3600000);
    let time;

    if (hours <= 24) {
        const minutes = Math.floor(timeDifference / 60000);
        if (hours > 0) time = <time>{hours} hours ago</time>
        if (hours === 0 && minutes > 0) time = <time>{minutes} minutes ago</time>
        if (minutes === 0) time = <time>just now</time>
    } else {
        time = <time>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</time>
    }

    return (
        <div className="w-full md:w-5/12 max-w-sm min-w-fit p-6 bg-light500 border border-light300 rounded-lg shadow">
            <div className="flex items-center flex-col">
                <div className={`flex flex-row gap-0.5 text-2xl font-semibold truncate text-${authorData.color} max-w-1/2`}>
                    <h3>{title}</h3>
                </div>
                <p className="text-secondary300 text-xs">{time}</p>
                <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-primary200 hover:underline">
                    Play now
                    <i className="bi bi-play-circle text-xl ps-1"></i>
                </Link>
                <div className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                    <p className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                        {isAuthorCurrentUser &&
                            <button className="flex flex-row text-primary200 text-sm font-semibold hover:text-primary400 items-center">
                                <i className="text-lg bi bi-pencil-square"></i>
                            </button>
                        }
                        <button onClick={handleSaveClick} className={`flex flex-row text-secondary500 text-sm font-semibold ${isSaved ? 'hover:text-light100' : 'hover:text-success100'} items-center`}>
                            <i className={`text-lg bi bi-bookmark-star${isSaved ? '-fill' : ''}`}></i>
                        </button>
                        <button onClick={handleLikeClick}>
                            <i className={`hover:text-light100 bi ${isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i>
                        </button>
                        {likes}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default inLogger(BasicLevelCard);