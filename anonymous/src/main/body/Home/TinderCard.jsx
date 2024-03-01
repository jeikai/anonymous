import React, { useState, useMemo, useRef, useEffect } from 'react';
import './Home.css';
import TinderCard from 'react-tinder-card';

function Tinder_Card({ post }) {
	const [currentIndex, setCurrentIndex] = useState(
		post ? Math.max(0, post.length - 1) : 0
	);

	const [lastDirection, setLastDirection] = useState();
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(
		() =>
			Array(post.length)
				.fill(0)
				.map((i) => React.createRef()),
		[post]
	);
	useEffect(() => {
		if (post) {
			setCurrentIndex(post.length - 1);
		}
	}, [post]);
	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canSwipe = currentIndex >= 0;

	const swiped = (direction, nameToDelete, index) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const outOfFrame = (name, idx) => {
		console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
		currentIndexRef.current >= idx &&
			childRefs.current[idx].current.restoreCard();
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < post.length) {
			console.log(childRefs);
			console.log(childRefs[currentIndex]);
			if (childRefs[currentIndex].current) {
				await childRefs[currentIndex].current.swipe(dir);
			} else {
				console.warn('Card ref not yet available at index:', currentIndex);
			}
		}
	};
	return (
		<>
			{post && post.length > 0 ? (
				<div className="cardContainer">
					{post.map((character, index) => (
						<TinderCard
							ref={childRefs[index]}
							className="swipe"
							key={character.userName}
							onSwipe={(dir) => swiped(dir, character.userName, index)}
							onCardLeftScreen={() => outOfFrame(character.userName, index)}>
							<div className="card">
								<div className="image">
									<img src={'./assets/uploads/' + character.postImg} alt="" />
								</div>

								<div className="info">
									<span>{character.title}</span>
									<span>
										<i className="fa-solid fa-person"></i> {character.userName},{' '}
										{character.age}
									</span>
									<span>
										<i className="fa-solid fa-venus-mars"></i>{' '}
										{character.gender == true ? 'Nam' : 'Nữ'}
									</span>
									<span>
										<i className="fa-solid fa-heart"></i> {character.favorite}
									</span>
								</div>
								<hr />
								<div className="description">
									<span>{character.description}</span>
								</div>
								<div className="buttons">
									<button
										id="remove"
										style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
										onClick={() => swipe('left')}>
										<i className="fa fa-remove"></i>
									</button>
									<button
										id="heart"
										style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
										onClick={() => swipe('right')}>
										<i className="fa fa-heart"></i>
									</button>
								</div>
							</div>
						</TinderCard>
					))}
				</div>
			) : (
				<p>Loading cards...</p>
			)}
		</>
	);
}

export default Tinder_Card;
