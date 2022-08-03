import sequelize from "tests/database";

type UserData = {
    name: string;
    email: string;
    password: string;
    passwordHash: string;
    confirmPassword: string;
    organisation: string;
    dataOwner: string;
};

export const deleteUser = async (userData: UserData) => {
    await sequelize.query(
        `
    DELETE FROM meta_dataset_likes using users WHERE users.email ='${userData["email"]}' and users.id  = meta_dataset_likes.user_id;
    `
    );
    await sequelize.query(
        `
    DELETE FROM meta_dataset_favourites using users WHERE users.email ='${userData["email"]}' and users.id  = meta_dataset_favourites.user_id;
    `
    );
    await sequelize.query(
        `
    DELETE FROM users WHERE email='${userData["email"]}';
    `
    );
};

// Create a new user in db
export const createUser = async (userData: UserData) => {
    await sequelize.query(
        `
                INSERT INTO users (name, email, password, organisation, is_data_owner, role) 
                VALUES ('${userData["name"]}', '${userData["email"]}', '${userData["passwordHash"]}', '${userData["organisation"]}', FALSE, 'developer');
            `
    );
    console.log('done Create user');
    
};