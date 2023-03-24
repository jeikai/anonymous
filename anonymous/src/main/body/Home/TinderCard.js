import React, { useState, useMemo, useRef } from 'react'
import './Home.css'
import { propTypes } from 'react-bootstrap/esm/Image'
import TinderCard from 'react-tinder-card'

// Tinder_Card.propTypes = {
//     db: propTypes.Array
// }
// Tinder_Card.defaultProps = {
//     db: []
// }
function Tinder_Card({ db }) {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(db.length)
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
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <>
            <div className='cardContainer'>
                {db.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                        <div className="card">
                        <div className='image'>
                            <img src={character.url} alt="" />
                        </div>
                        <div className="info">
                            <span>{character.name}, 26</span>
                            <span>
                                <i class="fa-solid fa-crown"></i>  Lorem ipsum dolor sit amet.
                            </span>
                            <span>
                                <i class="fa-solid fa-crown"></i>  Lorem ipsum dolor sit amet.
                            </span>
                            <span>
                                <i class="fa-solid fa-crown"></i>  Lorem ipsum dolor sit amet.
                            </span>
                        </div>
                        <hr />
                        <div className='description'>
                            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis nam fugiat amet blanditiis tempora voluptate tempore quas minima dolorem exercitationem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti quod quas quis quaerat ea. Accusamus earum aut porro commodi maiores voluptates eos eum placeat nihil. Soluta asperiores dicta nam excepturi architecto distinctio, tenetur praesentium sit, tempora, odit similique deleniti amet.</span>
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