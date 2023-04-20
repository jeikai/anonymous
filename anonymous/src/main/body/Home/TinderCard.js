import React, { useState, useMemo, useRef } from 'react'
import './Home.css'
import TinderCard from 'react-tinder-card'

function Tinder_Card({ post }) {
    const [currentIndex, setCurrentIndex] = useState(post.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(post.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < post.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }   
        console.log("haha")
    }
    return (
        <>
            <div className='cardContainer'>
                {post.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={character.userName}
                        onSwipe={(dir) => swiped(dir, character.userName, index)}
                        onCardLeftScreen={() => outOfFrame(character.userName, index)}
                    >
                        <div className="card">

                            <div className='image'>
                                <img src={"./assets/uploads/"+character.postImg} alt="" />
                            </div>

                            <div className="info">
                                <span>{character.title}</span>
                                <span><i class="fa-solid fa-person"></i> {character.userName}, {character.age}</span>
                                <span><i class="fa-solid fa-venus-mars"></i> {character.gender == true ? "Nam" : "Nữ"}</span>
                                <span>
                                    <i class="fa-solid fa-heart"></i> {character.favorite}
                                </span>
                            </div>
                            <hr />
                            <div className='description'>
                                <span>{character.description}</span>
                            </div>
                            <div className='buttons'>
                                <button id='remove' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}><i class="fa fa-remove"></i></button>
                                <button id='heart' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}><i class="fa fa-heart"></i></button>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </>
    )
}

export default Tinder_Card;