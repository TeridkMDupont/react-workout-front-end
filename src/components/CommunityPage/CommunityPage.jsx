import { Link } from 'react-router';

const CommunityPage = (props) => {
    return (
        <main>
            {props.workouts.map((workout) => (
                <Link key={workout._id} to={`/workouts/${workout._id}`}>
                    <article>
                        <header>
                            <h2>{workout.name}</h2> 
                            <h3>Intensity Level:  {workout.rating}</h3>
                        </header>
                        <p>
                            {`${workout.author.username} posted on
                            ${new Date(workout.createdAt).toLocaleDateString()}`}
                        </p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default CommunityPage;