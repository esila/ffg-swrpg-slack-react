import React, { useState, useEffect, useRef } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getMessagesByTimestamp } from '../graphql/queries';
import { deleteMessage as deleteMessageMutation } from "../graphql/mutations";
import { onCreateMessage } from "../graphql/subscriptions";
import './Chat.css';

function AutoScroller(props) {
    const scrollerRef = useRef();
    const autoScrollingRef = useRef(true);

    function scrollToBottom() {
        const scroller = scrollerRef.current;
        if (scroller && autoScrollingRef.current === true) {
            scroller.scrollTop = scroller.scrollHeight;
        }
    }

    useEffect(scrollToBottom);

    function handleScroll(event) {
        const scroller = event.target;
        const distanceToBottom = scroller.scrollHeight - (scroller.scrollTop + scroller.offsetHeight);
        autoScrollingRef.current = distanceToBottom < 10
    }

    return <div {...props} onScroll={(e) => handleScroll(e)} ref={scrollerRef} />
}

function Message({message, timestamp, user}) {
    return (
        <div className="message">
            <div className="message__info">
                <h4>
                    {user} <span className="message__timestamp">{timestamp}</span>
                </h4>
                <p>{message}</p>
            </div>

        </div>
    )
}

function Chat({ handleOpen, handleClose }) {
    const [messages, setMessages] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);

    // useRef to update current messages since I can't seem to access state in the async subscribe
    const latestMessages = useRef([]);
    latestMessages.current = messages;

    useEffect(() => {
        fetchMessages();
        subscribeMessages();
    }, []);

    async function fetchMessages() {
        const apiData = await API.graphql(graphqlOperation(getMessagesByTimestamp, {sortDirection: 'ASC', type: 'swrpg'}));
        setMessages(apiData.data.getMessagesByTimestamp.items);
        !firstLoad && handleOpen();
        setFirstLoad(false);
    }

    async function subscribeMessages() {
        await API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: subonCreateMessage => {
                console.log(`subscribed message: ${JSON.stringify(subonCreateMessage.value.data.onCreateMessage)}`);
                setMessages([...latestMessages.current, subonCreateMessage.value.data.onCreateMessage]);
                setFirstLoad(false);
                handleOpen();
            }
        })
    }

    async function deleteMessage({ id }) {
        await API.graphql({ query: deleteMessageMutation, variables: { input: { id } }});
    }

    return (
        <>
            <AutoScroller className="chat__messages">
                {messages.map((message, idx) => (
                    <Message
                        key={idx}
                        message={message.message}
                        timestamp={message.timestamp}
                        user={message.user}
                        userImage={message.userImage}
                     />
                ))}
            </AutoScroller>
            <button
                className="chat__delete"
                onClick={(event) => {
                    event.preventDefault();
                    messages.map((msg) => {
                        deleteMessage({id: msg.id});
                        return 0;
                    })
                }}
            >
                DELETE ALL
            </button>
        </>
    );
}

export default Chat;
