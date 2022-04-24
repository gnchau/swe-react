/**
 * @file Renders the Likes screen in a User's profile, which displays all the
 * Tuits a user likes. Used the professor's A4 source code.
 */

import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findLiked = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findLiked, []);

    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findLiked}/>
        </div>
    );
};
export default MyLikes;