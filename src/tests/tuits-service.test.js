import {
    createTuit, deleteTuit, findTuitById,
    findAllTuits, findUserByUsername,
    deleteTuitsByUser
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername, findAllUsers,
    findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const testCreate = {
        username: 'testCreate',
        password: 'testCreatePass',
        email: 'testCreate@gmail.com'
    };

    const testTuit = {
        "tuit": "testing a b c d 1 2 3 4"
    }

    beforeAll(async () => {
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testCreate.username === user.username);
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testCreate.username);
    })


    afterAll(async () => {
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testCreate.username === user.username);
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testCreate.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(testCreate);
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
    const testDelete = {
        username: 'testDelete',
        password: 'testDeletePass',
        email: 'testDelete@yahoo.com'
    };

    const testTuit = {
        "tuit": "test Delete 1 2 3 4 5"
    }

    afterAll(async () => {
        return deleteUsersByUsername(testDelete.username);
    })

    test('can delete tuit wtih REST API', async () => {
        const newUser = await createUser(testDelete);
        const newTuit = await createTuit(newUser._id, testTuit);
        const status = await deleteTuit(newTuit._id);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});


describe('can retrieve a tuit by their primary key with REST API', () => {
    const testRetrieve = {
        username: 'testRetrieve',
        password: 'testRetrievePass',
        email: 'testRetrieve@outlook.com'
    };

    const testTuit = {
        "tuit": "testRetrieve 1234"
    }

    beforeAll(async () => {
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testRetrieve.username === user.username);
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testRetrieve.username);
    })

    afterAll(async () => {
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testRetrieve.username === user.username);
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testRetrieve.username);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newUser = await createUser(testRetrieve);
        const newTuit = await createTuit(newUser._id, testTuit);
        expect(newTuit.tuit).toEqual(testTuit.tuit);
        const existingTuit = await findTuitById(newTuit._id);
        expect(newTuit._id).toEqual(existingTuit._id);
        expect(existingTuit.tuit).toEqual(testTuit.tuit);
    });

});


describe('can retrieve all tuits with REST API', () => {
    const usernames = [
        "RA1", "RA2", "RA3"
    ];

    const tuits = [
        "tuitRA1", "tuitRA2"
    ];

    beforeAll(async () => {
            for (const u of usernames) {
                const newU = await createUser(
                    {
                        username: u,
                        password: `${u}Pass`,
                        email: `${u}@aol.com`
                    }
                );
                for (const t of tuits) {
                    await createTuit(newU._id, {tuit: t});
                }
            }
        }
    );

    afterAll(async () => {
        const users = await findAllUsers();
        const usersWeInserted = users.filter(
            user => usernames.indexOf(user.username) >= 0);
        for (const u of usersWeInserted) {
            await deleteTuitsByUser(u._id);
            await deleteUsersByUsername(u.username);
        }
    })

    test('can retrieve all tuits with REST API', async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(usernames.length * tuits.length);
        const newUsers = await Promise.all(usernames.map(
            async name => await findUserByUsername(name)
        ))
        let count = 0;
        newUsers.forEach(u => {
                tuits.forEach( t =>
                    {
                        if (allTuits.find(
                            t1 => ((t1.postBy._id === u._id) && (t1.tuit === t))
                        )) count++;
                    }
                )
            }
        )
        expect(count).toBeGreaterThanOrEqual(usernames.length * tuits.length);
    })
});