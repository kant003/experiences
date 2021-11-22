import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stars({ star, onSubmit }) {

    const onCalificate = async (e,value) => {
        e.preventDefault()
        onSubmit({value})
    }

    return (
        <div>
            {
                [1, 2, 3, 4, 5].map(v =>
                    <span key={v} onClick={e => onCalificate(e,v)}>
                        {star === v ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegular} />}
                    </span>
                )
            }
        </div>
    );
}
export default Stars;