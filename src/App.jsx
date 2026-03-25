import { useState } from 'react';

const initialRatings = [
    { id: 1, name: 'Neon Noodle House', score: 9 },
    { id: 2, name: 'Tiny Fork Bistro', score: 7 },
    { id: 3, name: 'Soup Crimes Cafe', score: 10 },
];

export default function App() {
    const [restaurantName, setRestaurantName] = useState('');
    const [score, setScore] = useState('8');
    const [ratings, setRatings] = useState(initialRatings);

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = restaurantName.trim();
        const parsedScore = Number(score);

        if (!trimmedName || Number.isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) {
            return;
        }

        setRatings((currentRatings) => [
            {
                id: Date.now(),
                name: trimmedName,
                score: parsedScore,
            },
            ...currentRatings,
        ]);

        setRestaurantName('');
        setScore('8');
    }

    return (
        <main className="page-shell">
            <section className="hero-card">
                <p className="eyebrow">Neighborhood Taste Tribunal</p>
                <h1>Restaurant Rater</h1>
                <p className="hero-copy">
                    Enter a restaurant name, give it a score out of 10, and immortalize your food opinions in card form.
                </p>
            </section>

            <section className="content-grid">
                <form className="entry-card" onSubmit={handleSubmit}>
                    <h2>Add a rating</h2>

                    <label htmlFor="restaurant-name">Restaurant name</label>
                    <input
                        id="restaurant-name"
                        name="restaurant-name"
                        type="text"
                        placeholder="Crispy Palace"
                        value={restaurantName}
                        onChange={(event) => setRestaurantName(event.target.value)}
                        required
                    />

                    <label htmlFor="restaurant-score">Score out of 10</label>
                    <input
                        id="restaurant-score"
                        name="restaurant-score"
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={score}
                        onChange={(event) => setScore(event.target.value)}
                        required
                    />

                    <button type="submit">Submit rating</button>
                </form>

                <section className="ratings-panel">
                    <div className="panel-heading">
                        <h2>Latest ratings</h2>
                        <span>{ratings.length} total</span>
                    </div>

                    <div className="rating-list">
                        {ratings.map((rating) => (
                            <article className="rating-card" key={rating.id}>
                                <div>
                                    <p className="card-label">Restaurant</p>
                                    <h3>{rating.name}</h3>
                                </div>
                                <div className="score-badge">
                                    <span>{rating.score}</span>
                                    <small>/10</small>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </section>
        </main>
    );
}
