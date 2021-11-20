import { useState, useEffect } from 'react';
import { addCalification, getCalification } from "../services/firestore";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Stars({ id, uid }) {
    const [star, setStar] = useState(null)

    useEffect(() => {
        getCalification(id, uid).then(star => star.data() && setStar(star.data().value))
    }, [id, uid])

    const onCalificate = async (value) => {
        try {
            setStar(value)
            await addCalification(id, uid, value)
        } catch (error) {
            console.error('error:', error)
        }
    }

    return (
        <div>
            {
                [1, 2, 3, 4, 5].map(v =>
                    <span key={v} onClick={() => onCalificate(v)}>
                        {star === v ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarRegular} />}
                    </span>
                )
            }
        </div>
    );
}
export default Stars;