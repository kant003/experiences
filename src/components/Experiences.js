import Experience from './Experience';

function Experiences({ experiences }) {
    return (
        experiences.map(experience =>
            <Experience key={experience.id} experience={experience} />
        )
    );
}
export default Experiences;
