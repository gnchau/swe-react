import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Profile from "../components/profile";
import {createUser} from "./services";

test('dislike button in profile', async () => {
    render(
        <HashRouter>
            <Profile />
        </HashRouter>);
    const dislikes = screen.getByText(`Dislikes`);
    expect(dislikes).toBeInTheDocument();
})

describe('disliked tuits are shown in the dislike-screen', () => {

    beforeAll(async () => {
        //create user
        // const newU = await createUser(
        //     {
        //         username: 'test',
        //         password: `test`,
        //         email: `test`
        //     }
        // );
        //create tuit
        //dislike tuit
    })
    afterAll(async () => {
        //delete tuit
        //delete user
    })

    test('disliked tuits are shown in the dislike-screen', async () => {})
})