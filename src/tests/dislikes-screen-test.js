/**
 * @file To test the Dislikes screen
 */

/**
 * @jest-environment jsdom
 */


import React from "react";
import '@testing-library/jest-dom';

import { screen, render } from '@testing-library/react';
import { HashRouter } from "react-router-dom";
import Profile from "../components/profile/index";


describe('test that the dislikes tab exists on the profile page', () => {

    test("render my profile and find dislikes screen", async () => {
        render(
            <HashRouter>
                <Profile/>
            </HashRouter>);
 
        const linkElement = screen.getByText("Dislikes");
        expect(linkElement).toBeInTheDocument();
    });
});

describe('test that the likes tab exists on the profile page', () => {

    test("render my profile and find likes screen", async () => {
        render(
            <HashRouter>
                <Profile/>
            </HashRouter>);

        const linkElement = screen.getByText("Likes");
        expect(linkElement).toBeInTheDocument();
    });
});
