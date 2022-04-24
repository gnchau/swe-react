/**
 * @file Middle tier for dislikes resource.
 * Provides a service to communicate with the restful API of the server.
 */

import axios from "axios";

//const BASE_URL = 'https://software-engineering-a4.herokuapp.com';
const BASE_URL = 'http://localhost:4000';
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

/**
 * Finds all the tuits that were dislikes by a user
 * @param {string} userId the id of the user that disliked the tuit
 * @returns Tuit objects that were disliked by user
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

/**
 * Find all the users that disliked a given tuit
 * @param {string} tid the id of the disliked tuit
 * @returns User objects that disliked the tuit
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

/**
 * User dislikes a tuit
 * @param {string} uid id of the user that disliked the tuit.
 * @param {string} tid id of the tuit the user is disliking.
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);