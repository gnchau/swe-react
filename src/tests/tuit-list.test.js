import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {
  createTuit,
  deleteTuitsByUser,
  findAllTuits, findTuitByUser,
  findUserByUsername
} from "../services/tuits-service";
import axios from "axios";

import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import * as service from "../services/tuits-service";

const MOCKED_USERS = [
  'alice', 'bob', 'charlie'
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const MockedTuits = [
  {_id: "111", postBy: {username: "alice"}, tuit: "alice's tuit"},
  {_id: "222", postBy: {username: "bob"}, tuit: "bob's tuit"},
  {_id: "333", postBy: {username: "charlie"}, tuit: "charlie's tuit"}
]

const deleteTuit = (tid) => {}

describe('tuit list renders static tuit array',  () => {

  test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
          <Tuits tuits={MockedTuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    MOCKED_TUITS.forEach(t => {
      const e = screen.getByText(`${t}`);
      expect(e).toBeInTheDocument();
    })

    MOCKED_USERS.forEach(t => {
      const e = screen.getByText(`${t}@${t} -`);
      expect(e).toBeInTheDocument();
    })

  });
});


describe('tuit list renders async', () => {
  beforeAll(async () => {
    let ind = 0;
    for (const u of MOCKED_USERS) {
      const newU = await createUser(
          {
            username: u,
            password: `${u}Pass`,
            email: `${u}@gmail.com`
          }
      );
      await createTuit(newU._id, {tuit: MOCKED_TUITS[ind++]});
    }
  });

  afterAll(async () => {
    const users = await findAllUsers();
    const usersWeInserted = users.filter(
        user => MOCKED_USERS.indexOf(user.username) >= 0);
    for (const u of usersWeInserted) {
      await deleteTuitsByUser(u._id);
      await deleteUsersByUsername(u.username);
    }
  });

  test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
          <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    MOCKED_TUITS.forEach(t => {
      const e = screen.getByText(`${t}`);
      expect(e).toBeInTheDocument();
    })

    MOCKED_USERS.forEach(t => {
      const e = screen.getByText(`${t}@${t} -`);
      expect(e).toBeInTheDocument();
    })
  })

  test('tuit list renders async for alice', async () => {
    const user = await findUserByUsername('alice');
    const tuits = await findTuitByUser(user._id);
    render(
        <HashRouter>
          <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    const tuit = screen.getByText(`alice's tuit`);
    expect(tuit).toBeInTheDocument();
    const username = screen.getByText(`alice@alice -`);
    expect(username).toBeInTheDocument();

  })
});

//jest.mock('axios');
describe('tuit list renders mocked',  () => {
  test('tuit list renders mocked', async () => {
    axios.get = jest.fn();
    jest.mock('axios');
    axios.get.mockImplementationOnce(
        () => Promise
            .resolve({ data: {tuits: MockedTuits} }));

    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
          <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    MOCKED_TUITS.forEach(t => {
      const e = screen.getByText(`${t}`);
      expect(e).toBeInTheDocument();
    })

    MOCKED_USERS.forEach(t => {
      const e = screen.getByText(`${t}@${t} -`);
      expect(e).toBeInTheDocument();
    })
  });
});